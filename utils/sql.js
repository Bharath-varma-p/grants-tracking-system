const { SuccessResult, ErrorResult } = require("./result");

class SqlHelper {
  static async runSql(pool, query, params) {
    let db;
    try {
      db = await pool.getConnection();

      const result = await db.query(query, params);

      return new SuccessResult(result);
    } catch (error) {
      return new ErrorResult(error.sqlMessage || error.message, error);
    } finally {
      if (db) {
        db.release();
      }
    }
  }
}

module.exports = SqlHelper;
