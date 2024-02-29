import { readdir } from "fs/promises";
import { readFileSync } from "fs";
import { migrateToDatabase } from "./migrate-to-database.js";
import { getPools } from "./database.js";

async function getInitialMigrations() {
  const dir = "app/database-changes/initial-migrations/shared";
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

export async function runInitialMigration() {
  let db;

  try {
    const { pool } = getPools("sys");
    db = await pool.getConnection();

    const result = await db.query(
      `
      SELECT SCHEMA_NAME
      FROM INFORMATION_SCHEMA.SCHEMATA
      WHERE SCHEMA_NAME ='sna'
      `
    );

    if (result.length > 0) {
      return;
    }

    const initialMigrations = await getInitialMigrations();

    globalThis.logger.info("Running initial migration");

    for (const { sql } of initialMigrations) {
      await db.query(sql);
    }

    globalThis.logger.info("Initial migration done");

    globalThis.logger.info("Applying migrations");
    const migrationResult = await migrateToDatabase({});
    if (!migrationResult.status) {
      throw migrationResult.error;
    }
    globalThis.logger.info("Applied migrations");
  } catch (err) {
    globalThis.logger.error(err);

    throw err;
  } finally {
    if (db) {
      db.release();
    }
  }
}
