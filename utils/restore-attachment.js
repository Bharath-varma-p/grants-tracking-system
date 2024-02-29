const { SuccessResult, ErrorResult } = require("./result");
const SnaNetwork = require("./sna-network");

module.exports.restoreAttachment = async function ({ pool, department, req, database, fileName }) {
  let db;

  try {
    db = await pool.getConnection();

    const [attachment] = await db.query(`SELECT id FROM ${database} WHERE file_name = ? AND deleted = 1`, [fileName]);

    if (!attachment) {
      throw new Error("Attachment not found");
    }

    if (database === "traffic_attachments") {
      const [crashAttachment] = await db.query(`SELECT crash_no FROM ${database} WHERE file_name = ? AND deleted = 1`, [
        fileName,
      ]);

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

    await db.query(
      `UPDATE
        ${database}
      SET
        deleted = NULL,
        deleted_time = NULL,
        deleted_by = NULL
      WHERE
        file_name = ?
      `,
      [fileName]
    );

    if (database === "mastername_attachments") {
      const snaNetwork = new SnaNetwork(department);
      snaNetwork.insertMasterNameAttachment(attachment.id);
    }

    const user_activity = [[req.session.passport.user.id, `${database} restore ${fileName}`, new Date()]];

    db.query("INSERT INTO sna.user_activity (userid, page_name, date_visited) VALUES ?", [user_activity]);

    return new SuccessResult();
  } catch (err) {
    globalThis.logger.error(err);

    return new ErrorResult("Restoring attachment failed", err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
