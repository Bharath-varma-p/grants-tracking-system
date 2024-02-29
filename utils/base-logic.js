const { getPools } = require("./database");

class BaseLogic {
  constructor(department, pool) {
    this.department = department;

    this.pool = pool || getPools(department?.path || "sna").pool;
  }
}

module.exports = BaseLogic;
