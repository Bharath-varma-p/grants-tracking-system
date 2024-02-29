const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const convert = require("xml-js");
const { getPools } = require("./database");
const { sendEmail } = require("./send-mail");

// GETTING CFS DATA FROM FILE TO SERVER // testing
globalThis.logger.info("CFS PULL STARTED  ");
let isProcessingData = false;
const cfsFolder = process.env.cfs_folder || "/sftp/P9_CAD/incoming/";

const getCFSFolderName = () => path.join(globalThis.__basedir, "public", "blocked", "CFS");

function readValue(element) {
  const value = element.elements[0]?.text ?? element.elements[0]?.elements[0]?.text;

  if (typeof value !== "string") {
    throw new Error(`Invalid xml element: ${element.name}. Element value: ${value}`);
  }

  if (value.trim() === "") {
    return null;
  }

  const pattern = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/;

  if (value.match(pattern)) {
    const result = value.match(pattern);

    const day = result[2];
    const month = result[1];
    const year = result[3];
    const hour = result[4];
    const minute = result[5];
    const second = result[6];

    const SQLDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    return SQLDate;
  } else {
    return value;
  }
}
async function moveToCFSFolder(fileName) {
  const CFSFolderName = getCFSFolderName();

  await fsPromises.mkdir(CFSFolderName, { recursive: true });

  await fsPromises.copyFile(`${cfsFolder}${fileName}`, path.join(CFSFolderName, fileName));

  try {
    await fsPromises.unlink(`${cfsFolder}${fileName}`);
  } catch {
    /* empty */
  }
}

async function moveToFailFolder(fileName) {
  const failFolder = path.join(getCFSFolderName(), "failed");

  await fsPromises.mkdir(failFolder, { recursive: true });

  await fsPromises.rename(path.join(getCFSFolderName(), fileName), path.join(failFolder, fileName));
}

async function sleep(time) {
  await new Promise((res) => setTimeout(res, time * 1000));
}
class CFSRecord {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getXml() {
    let error;

    for (let counter = 0; counter < 6; counter++) {
      this.plainXml = await fsPromises.readFile(path.join(getCFSFolderName(), this.fileName), "utf-8");

      const xml = convert.xml2js(this.plainXml, { compact: false, spaces: 4 });

      if (!xml) {
        error = "XML file is invalid";
        await sleep(10);
        continue;
      }

      if (!xml.elements) {
        error = "XML file is invalid. It doesn't contain any elements";
        await sleep(10);
        continue;
      }
      return xml;
    }

    if (error) {
      throw new Error(error);
    }
  }
  parseIncident(incidentElement) {
    this.incidentFields = incidentElement.elements.map((item) => item.name);
    this.incidentValues = incidentElement.elements.map((item) => (item.elements ? readValue(item) : null));

    this.primaryOfficer = this.incidentValues[this.incidentFields.indexOf("PrimaryOfficer")];
    this.masterIncidentID = this.incidentValues[1];
  }

  parseComments(commentsElement) {
    this.comments = commentsElement.elements?.map((elem) => [elem.elements[0].text]);
  }

  parseUnits(unitsElement) {
    const units = [];

    for (const unit of unitsElement.elements || []) {
      const fields = unit.elements.map((elem) => elem.name);

      const values = unit.elements.map((elem) => (elem.elements ? readValue(elem) : null));

      values[fields.indexOf("Officers")] = this.primaryOfficer;

      fields.push("MasterIncidentID");
      values.push(this.masterIncidentID);

      units.push({
        fields,
        values,
      });
    }

    this.units = units;
  }

  parseCFS(xml) {
    const cfsElements = xml.elements[0].elements;

    let incidentDataFound = false;

    for (const item of cfsElements) {
      if (item.name === "IncidentData") {
        this.parseIncident(item);

        incidentDataFound = true;
      }

      if (item.name === "Units") {
        this.parseUnits(item);
      }

      if (item.name === "Comments") {
        this.parseComments(item);
      }
    }

    if (!incidentDataFound) {
      throw new Error("XML file is invalid. It doesn't contain IncidentData element");
    }
  }

  async save() {
    const { pool } = getPools("cfs");

    this.pool = pool;

    this.parseCFS(await this.getXml());

    await this.saveIncident();

    await this.saveComments();

    await this.saveUnits();

    await this.saveToDepartmentDatabase();
  }

  async saveIncident() {
    const { insertId } = await this.pool.query(`INSERT INTO incident_data (${this.incidentFields}) VALUES ?`, [
      [this.incidentValues],
    ]);

    this.incidentID = insertId;
  }

  async saveComments() {
    if (!this.comments) {
      return;
    }

    this.comments.forEach((comment) => {
      comment.push(this.incidentID);
      comment.push(this.masterIncidentID);
    });

    await this.pool.query(`INSERT INTO comments (Comment, IncidentID, MasterIncidentID) VALUES ?`, [this.comments]);
  }

  async saveUnits() {
    for (const { fields, values } of this.units) {
      fields.push("IncidentID");
      values.push(this.incidentID);

      await this.pool.query(`INSERT INTO units (${fields}) VALUES ?`, [[values]]);
    }
  }

  async saveToDepartmentDatabase() {
    const relatedDepartments = [];
    for (const { values } of this.units) {
      const cfsCode = values[1];
      const departments = globalThis.departments.filter((dept) => dept.cfs_name === cfsCode);

      relatedDepartments.push(...departments);
    }

    for (const dept of relatedDepartments) {
      await this.pool.query(`INSERT INTO ${dept.database_name}.incident_datap9 (${this.incidentFields}) VALUES ?`, [
        [this.incidentValues],
      ]);

      if (this.comments) {
        await this.pool.query(
          `INSERT INTO ${dept.database_name}.commentsp9 (Comment, IncidentID, MasterIncidentID) VALUES ?`,
          [this.comments]
        );
      }

      for (const { fields, values } of this.units) {
        await this.pool.query(`INSERT INTO ${dept.database_name}.unitsp9 (${fields}) VALUES ?`, [[values]]);
      }
    }
  }

  sendErrorViaEmail(error) {
    sendEmail({
      to: ["bselvan@gmail.com"],
      subject: "CFS failed",
      body: `
        <div>
          <strong>Error:</strong><span>&nbsp;${error.message}</span>
          <pre>
            ${error.stack}
          </pre>
        </div>

        <p>
          <strong>XML: ${this.fileName}</strong>
        </p>
        <textarea style="width:100%" rows="50">
          ${this.plainXml}
        </textarea>
    `,
    });
  }
}

async function processSingleFile(fileName) {
  const cfsRecord = new CFSRecord(fileName);
  let failed = false;
  try {
    const extension = path.extname(fileName);

    if (extension.toLowerCase() !== ".xml") {
      return;
    }

    await cfsRecord.save();
  } catch (error) {
    failed = true;
    globalThis.logger.error(error);

    cfsRecord.sendErrorViaEmail(error);
  } finally {
    if (failed) {
      moveToFailFolder(fileName);
    }
  }
}

module.exports = async function transferCFS() {
  if (isProcessingData === false) {
    isProcessingData = true;

    const files = await fsPromises.readdir(cfsFolder);

    const maxFileNumber = Math.min(10, files.length);

    const movedFiles = [];

    for (let i = 0; i < maxFileNumber; i++) {
      try {
        const stat = await fsPromises.stat(`${cfsFolder}${files[i]}`);
        if (Date.now() - stat.mtimeMs < 5 * 1000) {
          continue;
        }

        await moveToCFSFolder(files[i]);

        movedFiles.push(files[i]);
        // eslint-disable-next-line no-empty
      } catch (err) {
        globalThis.logger.error("Failed to move old CFS file to new public/blocked/CFS folder");
        globalThis.logger.error(err);
      }
    }

    await Promise.all(movedFiles.map(processSingleFile));

    isProcessingData = false;
  }
};
