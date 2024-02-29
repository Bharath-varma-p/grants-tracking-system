const fsPromise = require("fs/promises");
const fs = require("fs");
const path = require("path");
const FtpClient = require("ssh2-sftp-client");
const { getPools } = require("./database");

const saveFolder = process.env.department_custom_data_push_folder || "temp";

if (!fs.existsSync(saveFolder)) {
  fs.mkdirSync(saveFolder);
}

const getJSONFilePath = (department, fileName) =>
  path.join(process.cwd(), saveFolder, `${department.path}_${fileName}`);

async function prepareTrafficPeopleFile(db, department) {
  const trafficPeople = await db.query(`
    SELECT
      *
    FROM
      ${department.database_name}.traffic_person
    ORDER BY
      id DESC
    LIMIT
      30
  `);

  await fsPromise.writeFile(getJSONFilePath(department, "crash_person.json"), JSON.stringify(trafficPeople), "utf-8");
}

async function prepareTrafficUnitFile(db, department) {
  const trafficUnits = await db.query(`
    SELECT
      *
    FROM
      ${department.database_name}.traffic_unit
    ORDER BY
      id DESC
    LIMIT
      30
  `);

  await fsPromise.writeFile(getJSONFilePath(department, "crash_unit.json"), JSON.stringify(trafficUnits), "utf-8");
}

async function prepareTrafficCrashFile(db, department) {
  const trafficCrashes = await db.query(`
    SELECT
      *
    FROM
      ${department.database_name}.traffic
    ORDER BY
      id DESC
    LIMIT
      30
  `);

  await fsPromise.writeFile(getJSONFilePath(department, "crash.json"), JSON.stringify(trafficCrashes), "utf-8");
}

async function prepareIncidentFile(db, department) {
  const incidents = await db.query(`
    SELECT
      *
    FROM
      ${department.database_name}.incident
    ORDER BY
      id DESC
    LIMIT
      30
  `);

  await fsPromise.writeFile(getJSONFilePath(department, "incident.json"), JSON.stringify(incidents), "utf-8");
}

module.exports.sendJsonFilesToDepartmentFtp = async (department) => {
  if (!department) {
    return;
  }

  if (process.env.mode !== "production") {
    return;
  }

  if (
    !department.custom_data_push_enabled ||
    !department.custom_data_push_host_name ||
    !department.custom_data_push_port ||
    !department.custom_data_push_username ||
    !department.custom_data_push_password ||
    process.env.department_custom_data_push_enabled !== "yes"
  ) {
    return;
  }

  const { pool } = getPools("sna");

  let db, sftpClient;

  try {
    db = await pool.getConnection();

    globalThis.logger.info(`Started to prepare JSON files to send to deparment's ftp. Department: ${department.name}`);

    await prepareTrafficPeopleFile(db, department);
    await prepareTrafficUnitFile(db, department);
    await prepareTrafficCrashFile(db, department);
    await prepareIncidentFile(db, department);

    const incidentFile = getJSONFilePath(department, "incident.json");
    const crashFile = getJSONFilePath(department, "crash.json");
    const crashPeopleFile = getJSONFilePath(department, "crash_person.json");
    const crashUnitFile = getJSONFilePath(department, "crash_unit.json");

    sftpClient = new FtpClient();

    await sftpClient.connect({
      host: department.custom_data_push_host_name,
      port: department.custom_data_push_port,
      username: department.custom_data_push_username,
      password: department.custom_data_push_password,
    });

    await sftpClient.put(incidentFile, `/incident.json`);

    await sftpClient.put(crashFile, `/crash.json`);

    await sftpClient.put(crashPeopleFile, `/crash_person.json`);

    await sftpClient.put(crashUnitFile, `/crash_unit.json`);

    fsPromise.unlink(incidentFile);
    fsPromise.unlink(crashFile);
    fsPromise.unlink(crashPeopleFile);
    fsPromise.unlink(crashUnitFile);

    globalThis.logger.info(`Finished sending JSON files to deparment's ftp. Department: ${department.name}`);
  } catch (error) {
    globalThis.logger.error(`Sending JSON files failed. Department: ${department.name}. Error: ${error.message}`);
  } finally {
    if (db) {
      db.release();
    }

    if (sftpClient) {
      sftpClient.end();
    }
  }
};
