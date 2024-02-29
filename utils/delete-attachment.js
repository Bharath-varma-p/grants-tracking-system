const { addAuditLogs } = require("./add-audit-logs");
const {
  TRAFFIC_CRASH_PAGE,
  DAILY_LOG_DATABASE_PAGE,
  ATTACHMENT_DELETE,
  OFFENSE_NON_CRIMINAL_PAGE,
  TRAFFIC_CITATION_PAGE,
  WARRANT_CITATION_PAGE,
  FIR_PAGE,
  CASE_MANAGEMENT_PAGE,
  MASTER_NAME_PAGE,
  MASTER_BUSINESS_PAGE,
  COURT_MANAGEMENT_PAGE,
  PERMIT_PAGE,
  VEHICLE_MAINTENANCE_PAGE,
  TOW_MANAGEMENT_PAGE,
  TRAININGS_PAGE,
  EVIDENCE_PROPERTY_PAGE,
  VACATION_WATCH,
} = require("./audit-constants");
const { SuccessResult, ErrorResult } = require("./result");
const SnaNetwork = require("./sna-network");

module.exports.deleteAttachment = async function ({
  pool,
  department,
  req,
  database,
  fileName,
  deletedTime = new Date(),
  options = { isCaseDelete: false },
}) {
  let db;
  try {
    db = await pool.getConnection();

    if (database === "traffic_attachmentsCrash") {
      database = "traffic_attachments";
    }
    const [attachment] = await db.query(`SELECT id FROM ${database} WHERE file_name = ? AND deleted IS NULL`, [
      fileName,
    ]);

    if (!attachment) {
      throw new Error("Attachment not found");
    }

    let pageName = null;
    const auditLogParams = {};
    if (database === "traffic_attachments") {
      pageName = TRAFFIC_CRASH_PAGE;
      const [crashAttachment] = await db.query(
        `SELECT crash_no FROM ${database} WHERE file_name = ? AND deleted IS NULL`,
        [fileName]
      );

      const crashNo = crashAttachment?.crash_no;

      if (crashNo) {
        await db.query(
          `
            UPDATE traffic A 
            SET diagram_count = (SELECT COUNT(*) FROM traffic_attachments T WHERE A.crash_no = T.crash_no AND is_diagram = 1 AND T.deleted IS NULL ) 
            WHERE A.deleted IS NULL AND A.crash_no = ?`,
          [crashNo]
        );
      }
    }

    if (
      database === "incident_attachments" ||
      database === "property_attachments" ||
      database === "arrest_attachments"
    ) {
      pageName = OFFENSE_NON_CRIMINAL_PAGE;
      if (database === "incident_attachments") {
        auditLogParams["attachmentType"] = "Incident Attachment";
      }

      if (database === "property_attachments") {
        auditLogParams["attachmentType"] = "Property Attachment";
      }
      if (database === "arrest_attachments") {
        auditLogParams["attachmentType"] = "Arrest Attachment";
      }
    }

    pageName = database === "daily_logs_attachments" ? DAILY_LOG_DATABASE_PAGE : pageName;

    pageName = database === "traffic_attachments" ? TRAFFIC_CRASH_PAGE : pageName;

    pageName = database === "traffic_citation_attachments" ? TRAFFIC_CITATION_PAGE : pageName;

    pageName = database === "arrest_non_attachments" ? WARRANT_CITATION_PAGE : pageName;

    pageName = database === "fir_attachments" ? FIR_PAGE : pageName;

    pageName = database === "business_attachments" ? MASTER_BUSINESS_PAGE : pageName;

    pageName = database === "permit_attachments" ? PERMIT_PAGE : pageName;

    pageName = database === "maintenance_attachments" ? VEHICLE_MAINTENANCE_PAGE : pageName;

    pageName = database === "tow_attachments" ? TOW_MANAGEMENT_PAGE : pageName;

    pageName = database === "trainings_attachments" ? TRAININGS_PAGE : pageName;
    pageName = database === "vacation_watch_attachments" ? VACATION_WATCH : pageName;
    pageName = database === "evidence_attachments" ? EVIDENCE_PROPERTY_PAGE : pageName;
    pageName = database === "traffic_attachmentsCrash" ? TRAFFIC_CRASH_PAGE : pageName;
    await db.query(
      `UPDATE
        ${database}
      SET
        deleted = 1,
        deleted_time = ?,
        deleted_by = ?
      WHERE
        file_name = ?
      `,
      [deletedTime, req.session.passport.user.name, fileName]
    );

    if (database === "mastername_attachments") {
      pageName = MASTER_NAME_PAGE;
      const snaNetwork = new SnaNetwork(department);
      snaNetwork.deleteMasterNameAttachment(attachment.id);
    }

    if (req.query.source_page && req.query.source_page !== "") {
      auditLogParams["caseSource"] = pageName;

      if (req.query.source_page == "case_management") {
        pageName = CASE_MANAGEMENT_PAGE;
      }

      if (req.query.source_page == "court_management") {
        pageName = COURT_MANAGEMENT_PAGE;
      }
    }

    if (pageName && options.isCaseDelete == false) {
      addAuditLogs(req, ATTACHMENT_DELETE, pageName, {
        ...auditLogParams,
        ...{ id: attachment.id, caseNo: req.params.id },
      });
    }

    const user_activity = [[req.session.passport.user.id, `${database} delete ${fileName}`, deletedTime]];

    db.query("INSERT INTO sna.user_activity (userid, page_name, date_visited) VALUES ?", [user_activity]);

    return new SuccessResult();
  } catch (err) {
    globalThis.logger.error(err);

    return new ErrorResult("Deleting attachment failed", err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
