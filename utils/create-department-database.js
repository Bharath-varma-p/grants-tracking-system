const { readdir } = require("fs/promises");
const { readFileSync } = require("fs");
const { migrateToDatabase } = require("./migrate-to-database.js");
const { ErrorResult, SuccessResult } = require("./result.js");
const { getPools } = require("./database.js");

async function getInitialMigrations() {
  const dir = "app/database-changes/initial-migrations/department";
  const files = await readdir(dir);
  const initialMigrations = files.map((file) => {
    const fileNameWithoutExt = file.split(".")[0];
    const values = fileNameWithoutExt.split("-");
    const sql = readFileSync(dir + "/" + file, "utf8");

    return {
      version: +values[0],
      sql,
    };
  });

  initialMigrations.sort((a, b) => a.version - b.version);

  return initialMigrations;
}

module.exports.createDepartmentDatabase = async function (databaseName) {
  let db;

  try {
    const { pool } = getPools("sys");
    db = await pool.getConnection();

    const result = await db.query(
      `
      SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME = ?
      `,
      [databaseName]
    );

    if (result.length > 0) {
      return new SuccessResult();
    }

    const initialMigrations = await getInitialMigrations();

    globalThis.logger.info("Creating department database: " + databaseName);

    for (const { sql } of initialMigrations) {
      await db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
      await db.query(`ALTER DATABASE ${databaseName} CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci`);
      await db.query(`USE ${databaseName}`);
      await db.query(sql);
    }

    globalThis.logger.info("Created department database: " + databaseName);

    globalThis.logger.info("Migrating to : " + databaseName);

    const migrationResult = await migrateToDatabase({
      databases: databaseName,
      mode: "migration",
    });

    if (migrationResult.status) {
      globalThis.logger.info("Migrated succesfully to : " + databaseName);
    } else {
      globalThis.logger.error(`Migration to ${databaseName} failed. Error: ${migrationResult.error.message}`);

      throw new Error(`Migration to ${databaseName} failed. Error: ${migrationResult.error.message}`);
    }

    return new SuccessResult();
  } catch (err) {
    globalThis.logger.error(err);

    return new ErrorResult(`Created department database failed: ${databaseName}`, err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
