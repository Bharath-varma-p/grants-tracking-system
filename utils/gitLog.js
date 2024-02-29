//const path = require("path");
const fs = require("fs-extra");
const connectionParameters = require("../config/connection");
const mysql2 = require("promise-mysql");
const sqlHelper = require("../utils/sql");
const { logger } = require("./create-logger");

const pool = mysql2.createPool({
  host: connectionParameters[0].host,
  user: connectionParameters[0].user,
  password: connectionParameters[0].password,
  database: "sna",
  connectionLimit: 1000,
  connect_timeout: 10,
});

const commitResult = [];
let packageChangeResult = [];
const unicodeTransformation = process.env.unicodeTransformation || "utf8";

function readjson(data) {
  return new Promise(function (resolve) {
    const filePath = "./commits.csv";
    if (fs.existsSync(filePath)) {
      resolve(fs.readFileSync(data, unicodeTransformation).toString().replace(/~/g, '"').replace(/��/g, ""));
    } else {
      logger.info("no gitLog Data");
    }
  });
}

function splitJson(dataSplit) {
  return new Promise(function (resolve) {
    const line = dataSplit.split(/\r?\n/);

    for (let i = 0; i < line.length; i++) {
      const splittedPart = line[i].toString().split("|");
      if (splittedPart[0] != "" && splittedPart[0] != undefined) {
        commitResult.push({
          id: splittedPart[0],
          committer: splittedPart[1],
          date: splittedPart[2],
          subject: splittedPart[3],
        });
      }
    }
    commitResult.reverse();
    resolve(commitResult);
  });
}

function splitJsonPackages(dataSplit) {
  return new Promise(function (resolve) {
    const line = dataSplit.split(/\r?\n/);

    for (let i = 0; i < line.length; i++) {
      const splittedPart = line[i].toString().split("|");
      if (splittedPart[0] != "" && splittedPart[0] != undefined) {
        packageChangeResult.push({
          id: splittedPart[0],
        });
      }
    }
    resolve(packageChangeResult);
  });
}

async function updateGlobalRestartValue(queryReturningResult) {
  if (queryReturningResult.data.affectedRows >= 1) {
    globalThis.restartServerforCommits = 1;
  } else {
    globalThis.restartServerforCommits = 0;
  }
}

async function addToDatabase() {
  const valueData = [];
  const packageChange = [];
  for (let i = 0; i < commitResult.length; i++) {
    valueData.push([commitResult[i].id, commitResult[i].committer, commitResult[i].date, commitResult[i].subject]);
  }
  for (let i = 0; i < packageChangeResult.length; i++) {
    packageChange.push([packageChangeResult[i].id, 1]);
  }
  await sqlHelper.runSql(pool, "truncate sna.commits_temp");
  await sqlHelper.runSql(pool, "insert into sna.commits_temp (commitID, committer, commit_date, subject) values ?", [
    valueData,
  ]);

  await sqlHelper.runSql(pool, "insert into sna.commits_temp (commitID, packageChange) values ?", [packageChange]);
  const duplicateCommits = await sqlHelper.runSql(
    pool,
    `insert into sna.commits (commitID, committer, commit_date, subject, nonMatched)
      select A.commitID, A.committer, A.commit_date, A.subject, B.commitID as mainCID
      from sna.commits_temp A
      left join sna.commits B on B.commitID = A.commitID
      where B.commitID is null And A.subject is not null group by A.commitID
      `
  );

  await sqlHelper.runSql(
    pool,
    `update sna.commits 
      inner join sna.commits_temp on sna.commits.commitID = sna.commits_temp.commitID
      set sna.commits.packageChange=1
      where sna.commits_temp.packageChange=1
      `
  );

  await updateGlobalRestartValue(duplicateCommits);
  const filePath = "./commits.csv";
  if (fs.existsSync(filePath)) {
    fs.unlink(`commits.csv`);
    logger.info("commits.csv successfully unlinked");
  } else {
    logger.info("commits.csv does not exist");
  }
}

async function saveCommitsToDatabase() {
  const datam = await readjson("./commits.csv");
  const packages = await readjson("./packageChanges.csv");
  if (fs.existsSync("./commits.csv")) {
    await splitJson(datam);
    await splitJsonPackages(packages);
    await addToDatabase();
    packageChangeResult = [];
  }

  if (fs.existsSync("./packageChanges.csv")) {
    fs.unlink(`packageChanges.csv`);
    logger.info("packageChanges.csv successfully unlinked");
  } else {
    logger.info("commits.csv or packageChanges.csv not found");
  }
}

module.exports.saveCommitsToDatabase = saveCommitsToDatabase;
