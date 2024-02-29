const { SuccessResult, ErrorResult } = require("./result");
const path = require("path");
const fs = require("fs");

module.exports.markCasesAsSubmitted = async function ({ pool, department }) {
  let db;
  try {
    const oibrsFilePath = path.join(__dirname, "..", "public", "blocked", `${department.database_name}_Final.txt`);

    const oibrsFileExist = fs.existsSync(oibrsFilePath);

    if (!oibrsFileExist) {
      throw new Error("Oibrs file not found! Please generate final file before");
    }

    const oibrsFileContent = fs.readFileSync(oibrsFilePath, "utf8");

    if (!oibrsFileContent) {
      throw new Error("Oibrs file is empty!");
    }

    const oibrsFileLines = oibrsFileContent.split("\n");

    const toBeMarkedIncidents = oibrsFileLines
      .filter((line) => line.startsWith("2 OH"))
      .map((line) => ({
        incidentNo: line.substring(11, 23),
        orcNo: line.substring(23, 29),
      }));

    db = await pool.getConnection();

    for (const { incidentNo, orcNo } of toBeMarkedIncidents) {
      db.query(
        `
        UPDATE incident
        SET
          nibrs_submission_date = ?,
          resubmit_oibrs = NULL
        WHERE 
          incident_no = ?
          AND
          LEFT(orc_no,3) = LEFT(?,3)
        `,
        [new Date(), incidentNo, orcNo]
      );
    }

    return new SuccessResult();
  } catch (error) {
    globalThis.logger.error(error);
    return new ErrorResult(error.message, error);
  } finally {
    if (db) {
      db.release();
    }
  }
};
