const connectionParameters = require("../config/connection");
const mysql = require("mysql");
const mysql2 = require("promise-mysql");
const { sendEmail } = require("./send-mail");

function createPools() {
  globalThis.pools ??= new Map();

  const mysqlPool = mysql.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user,
    password: connectionParameters[0].password,
    database: "sna",
    connectionLimit: 990,
  });

  const pool = mysql2.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user,
    password: connectionParameters[0].password,
    database: "sna",
    connectionLimit: 990,
    connect_timeout: 10,
  });

  globalThis.pools.set("sna", {
    mysqlPool,
    pool,
  });

  [mysqlPool, pool].forEach((snaPool) => {
    let emailSent = false;
    snaPool.on("enqueue", function () {
      if (!emailSent) {
        emailSent = true;
        sendEmail({
          to: "bselvan@gmail.com",
          subject: "Pool is full for sna",
          body: "Pool is full for sna",
        });
      }
    });
  });

  const poolCfs = mysql2.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user,
    password: connectionParameters[0].password,
    database: "cfs",
    connectionLimit: 990,
  });

  globalThis.pools.set("cfs", {
    pool: poolCfs,
  });

  const poolSys = mysql2.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user,
    password: connectionParameters[0].password,
    database: "sys",
    multipleStatements: true,
  });

  globalThis.pools.set("sys", {
    pool: poolSys,
  });
}

function createDepartmentPool(departmentPathOrDatabaseName) {
  const department = globalThis.departments.find(
    (dept) => dept.path === departmentPathOrDatabaseName || dept.database_name === departmentPathOrDatabaseName
  );

  if (!department) {
    return;
  }

  const pool = mysql2.createPool({
    host: connectionParameters[0].host,
    user: connectionParameters[0].user,
    password: connectionParameters[0].password,
    database: department.database_name,
    connectionLimit: 1000,
    connect_timeout: 10,
    multipleStatements: true,
  });

  let emailSent = false;
  pool.on("enqueue", function () {
    if (!emailSent) {
      emailSent = true;
      sendEmail({
        to: "bselvan@gmail.com",
        subject: "Pool is full for " + department.database_name,
        body: "Pool is full for " + department.database_name,
      });
    }
  });

  const pools = {
    pool,
  };

  globalThis.pools.set(department.path, pools);

  globalThis.pools.set(department.database_name, pools);

  return pools;
}

module.exports.createPools = createPools;

module.exports.getPools = (departmentPathOrDatabaseName) => {
  return globalThis.pools.get(departmentPathOrDatabaseName) || createDepartmentPool(departmentPathOrDatabaseName);
};