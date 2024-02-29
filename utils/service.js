const { getPools } = require("./database");

class Service {
  constructor(department, user) {
    this.department = department;
    this.pools = getPools(department?.path || "sna");
    this.user = user;
    this.user.canViewSealedCase = () => this.user.show_sealed || false;
  }
}

module.exports = Service;
