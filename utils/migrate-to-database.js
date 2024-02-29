const { readdir } = require(`fs/promises`);
const { readFileSync, existsSync, mkdirSync } = require(`fs`);
const mysql2 = require(`promise-mysql`);
const connectionParameters = require(`../config/connection`);
const { SuccessResult, ErrorResult } = require(`./result`);
const { getDbInstallationTime } = require(`./get-db-installation-time`);

const sharedDatabases = [ `sna`, `rafvue`];

const pool = mysql2.createPool({
  ...connectionParameters,
  connectionLimit: 50,
  multipleStatements: true,
});

async function getSqlChanges(mode) {
  const dir = mode === `migration` ? `app/database-changes/migrations` : `app/database-changes/database-manipulations`;
  const files = await readdir(dir);

  const sqlChanges = files.map((file) => {
    const [ date, other ] = file.split(`--`);
    const [ minorVersion, database ] = other.split(`-`);
    const sql = readFileSync(`${ dir }/${ file }`, `utf8`);

    return {
      date: new Date(date),
      database,
      minorVersion: Number(minorVersion),
      sql,
      file,
    };
  });

  sqlChanges.sort((a, b) => {
    if (a.date === b.date) {
      return a.minorVersion - b.minorVersion;
    }

    return a.date - b.date;

  });

  return sqlChanges;
}

function writeToRes(res, message) {
  if (!res) {
    return;
  }

  res.write(message);
}

function killConnection(connection) {
  try {
    connection.release();
    // eslint-disable-next-line no-empty
  } catch {}
}

module.exports.migrateToDatabase = async ({
  databases,
  res,
  mode = `migration`,
  userName = `system`,
  force = false,
}) => {
  if (globalThis.isMigrating) {
    return new SuccessResult();
  }

  if (mode !== `migration` && process.env.NODE_ENV !== `production` && !force) {
    const msg =
      `No need to manipulate local database in development. 
      If you want to apply manipulations, please use send force option with true. 
      /migrate_to_database?force=true`;
    writeToRes(res, msg);

    return new SuccessResult(null, msg);
  }

  if (!existsSync(`app/database-changes/database-manipulations`)) {
    mkdirSync(`app/database-changes/database-manipulations`);
  }

  if (!existsSync(`app/database-changes/migrations`)) {
    mkdirSync(`app/database-changes/migrations`);
  }

  const processedDatabases =
    databases?.split(`,`).map((p) => p.trim()) ||
    (globalThis.departments?.map((p) => p.database_name) || []).concat(sharedDatabases);

  const result = [];

  globalThis.isMigrating = true;

  const isMigration = mode === `migration`;

  const tableName = isMigration ? `migrations` : `database_manipulations`;

  try {
    // Getting all database migration sql files
    const allSqlChanges = await getSqlChanges(mode);

    if (allSqlChanges.length === 0) {
      // There is no update
      const folder = isMigration ? `migrations` : `database-manipulations`;

      writeToRes(res, `${ folder } directory is empty`);

      return new SuccessResult(result, `${ folder } directory is empty`);
    }

    for (let i = 0; i < processedDatabases.length; i += 1) {
      let db;

      try {
        db = await pool.getConnection();

        const databaseName = processedDatabases[i];

        const dbInstallationTime = await getDbInstallationTime(databaseName);

        // Detecting table already exists
        const migrationTables = [ `migrations`, `database_manipulations` ];

        for (const migrationtTable of migrationTables) {
          const rows = await db.query(
            `
            SELECT COUNT(*) AS totalCount
            FROM information_schema.tables
            WHERE 
                table_schema = ?
                AND table_name = ?
            LIMIT 1
        `,
            [ databaseName, migrationtTable ],
          );

          if (rows[0].totalCount === 0) {
            // table doesn't exist. We must create.
            const createTableSql = `
              CREATE TABLE ${ databaseName }.${ migrationtTable } (
                  id int NOT NULL AUTO_INCREMENT,
                  database_name varchar(100) NOT NULL,
                  migration_file varchar(500) NOT NULL,
                  migrated_by VARCHAR(255),
                  migration_time DATETIME,
                  last_try_by VARCHAR(255),
                  last_try_time DATETIME,
                  last_try_error TEXT,
                  PRIMARY KEY (id),
                  UNIQUE KEY id_UNIQUE (id)
              )
          `;

            try {
              await db.query(createTableSql);
            } catch (err) {
              res.write(
                `${ databaseName }.${ migrationtTable } table couldn't be 
                  created because of error. <br><br>Error: ${ err }`,
              );

              throw new ErrorResult(
                `${ databaseName }.${ migrationtTable } table couldn't be
                 created because of error. <br><br>Error: ${ err.message }`,
              );
            }
          }
        }

        const [ department ] = await db.query(
          `SELECT * FROM sna.departments WHERE database_name = ? AND deleted_time IS NULL`,
          [ databaseName ],
        );

        const previousMigrations = await db.query(
          `SELECT * FROM ${ databaseName }.${ tableName }
        WHERE database_name = ?
        AND
        migration_time IS NOT NULL
        `,
          [ databaseName ],
        );

        const sqlChanges = allSqlChanges.filter(
          (sqlFile) =>
            (sqlFile.database === databaseName || sqlFile.database === `all` && department) &&
            (mode === `migration` || sqlFile.date >= dbInstallationTime) &&
            !previousMigrations.some((prevMigration) => prevMigration.migration_file === sqlFile.file),
        );

        if (sqlChanges.length === 0) {
          // There isn't any update for database since last update.

          writeToRes(
            res,
            `${ department?.name || databaseName } - <strong style="color:gray">No ${
              isMigration ? `Migration` : `Manipulation`
            } Found</strong><br><br>`,
          );

          result.push({
            database: department?.name || databaseName,
            message: `No ${ isMigration ? `Migration` : `Manipulation` } Found`,
          });

          continue; // No need to go on. There is no change for the database
        }

        try {
          // Looping for every updates
          for (const sqlChange of sqlChanges) {
            globalThis.logger.info(
              `Applying migration: ${ sqlChange.file } Database: ${ databaseName } ....................`,
            );

            let connection;
            try {
              connection = await pool.getConnection();
              const sql = `USE ${ databaseName };${ sqlChange.sql }`;

              // We are using transaction to prevent duplication and ensure data integrity
              // Unfortunately DDL statements like CREATE TABLE, DROP TABLE,
              // ALTER TABLE etc can not be rollback. This is mysql limitation
              // But DML satements like INSERT,UPDATE, DELETE  can be rollback.
              // If query give error in the middle of execution, we must rollback newly records.
              // Otherwise after retrying, there would be duplicate records.
              // Exp. INSERT 1; INSERT 2; INSERT 3; IF insert 3 gives error, we must rollback previous inserts.
              await connection.beginTransaction();

              await connection.query(sql);

              await connection.query(
                `
                    USE ${ databaseName };    
                    INSERT INTO ${ tableName } 
                    (
                      database_name,
                      migration_file,
                      migrated_by,
                      migration_time
                    ) 
                    VALUES(?)
              `,
                [[ databaseName, sqlChange.file, userName, new Date() ]],
              );

              await connection.commit(); // transaction is trying to save to database.

              globalThis.logger.info(`Applied migration: ${ sqlChange.file } Database: ${ databaseName }`);

              // table has been succesfully updated at this point
            } catch (err) {
              // If error message contains duplicate word, it means there is no need to break update
              // progress for this error. We should continue bypassing this sql statement
              if (/includes|already exist|duplicate/i.test(err.message || err.sqlMessage)) {
                let connectionError;
                try {
                  connectionError = await pool.getConnection();
                  await connectionError.query(
                    `
                        USE ${ databaseName };
                        INSERT INTO ${ tableName } 
                        (
                          database_name,
                          migration_file,
                          migrated_by,
                          migration_time
                        ) 
                        VALUES(?)
                  `,
                    [[ databaseName, sqlChange.file, userName, new Date() ]],
                  );
                  // eslint-disable-next-line no-useless-catch
                } catch (error) {
                  throw error;
                } finally {
                  killConnection(connectionError);
                }
                continue;
              }

              // There is error. We must rollback changes. DDL statements can not be rollback.
              await connection.rollback();

              // We are writing filename we are trying to run to error object to show wrong query to the user.
              err.file = sqlChange.file;

              globalThis.logger.error(`Failed applying migration: ${ sqlChange.file } Database: ${ databaseName }`);

              // If any error, we dont continue breaking the loop throwing error.
              throw err;
            } finally {
              killConnection(connection);
            }
          }

          writeToRes(
            res,
            `${ department?.name || databaseName } - <strong style="color:green">${
              isMigration ? `Migrated` : `Manipulated`
            } succesfully</strong><br><br>`,
          );

          result.push({
            database: department?.name || databaseName,
            message: `${ isMigration ? `Migrated` : `Manipulated` } succesfully`,
          });
        } catch (err) {
          writeToRes(
            res,
            `${ department?.name || databaseName } - <strong style="color:red">${
              isMigration ? `Migration` : `Manipulation`
            } failed</strong><br><br> File: ${ err.file }<br>${ err } <br><br>`,
          );

          if (err.file) {
            let connection;
            try {
              connection = await pool.getConnection();
              await connection.query(
                `
                  USE ${ databaseName };
                  INSERT INTO ${ tableName } 
                  (
                    database_name,
                    migration_file,
                    last_try_by,
                    last_try_time,
                    last_try_error
                  ) 
                  VALUES(?)
              `,
                [[ databaseName, err.file, userName, new Date(), err.sqlMessage || err.message ]],
              );
              // eslint-disable-next-line no-useless-catch
            } catch (insertError) {
              throw insertError;
            } finally {
              killConnection(connection);
            }
          }

          result.push({
            database: department?.name || databaseName,
            error: `${ isMigration ? `Migration` : `Manipulated` } failed. File: ${ err.file }. Error: ${
              err.sqlMessage || err.message
            }`,
          });

          throw err;
        }
        // eslint-disable-next-line no-useless-catch
      } catch (err2) {
        throw err2;
      } finally {
        killConnection(db);
      }
    }

    return new SuccessResult(result);
  } catch (err) {
    globalThis.logger.error(err);
    writeToRes(res, err.message);

    return new ErrorResult(`${ isMigration ? `Migration` : `Manipulation` } failed`, err);
  } finally {
    globalThis.isMigrating = false;
  }
};

module.exports.sharedDatabases = sharedDatabases;
