const { getPools } = require("./database");

module.exports.setDatabaseGlobals = async () => {
  const { pool } = getPools("sna");

  let db;
  try {
    db = await pool.getConnection();

    await db.query("flush hosts");

    await db.query("set global max_connections=500");

    await db.query("SET sql_mode = 'NO_ENGINE_SUBSTITUTION,ALLOW_INVALID_DATES' ");

    await db.query("set @@GLOBAL.sql_mode ='NO_ENGINE_SUBSTITUTION,ALLOW_INVALID_DATES'");

    await db.query("set global wait_timeout=3");

    await db.query("set global interactive_timeout=3");

    if (process.env.mode === "production") {
      await db.query("SET GLOBAL time_zone = 'UTC'");
      // db.query("SET time_zone = '-4:00'", function (err) {
      //   if (err) throw err;
      // });
    }
  } catch (error) {
    globalThis.logger.error("An error occured while setting database globals");
    globalThis.logger.error(error);
  } finally {
    if (db) {
      db.release();
    }
  }
};
