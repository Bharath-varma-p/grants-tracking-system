const { getPools } = require("./database");

module.exports.getDbInstallationTime = async (databaseName) => {
  const { pool } = getPools("sys");
  try {
    const [{ creationTime }] = await pool.query(
      `
      SELECT
      table_schema AS Database_Name, MIN(create_time) AS creationTime
      FROM information_schema.tables
      WHERE table_schema = ?
      Group by table_schema;
    `,
      [databaseName]
    );

    return creationTime || new Date();
  } catch (err) {
    globalThis.logger.error(err);
  }
  return new Date();
};
