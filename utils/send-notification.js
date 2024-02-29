const { SuccessResult, ErrorResult } = require("./result");

module.exports.sendNotification = async function ({ pool, req, fromId, toWhomId, note, isDepartmentWide, customData }) {
  let db;

  try {
    db = await pool.getConnection();

    const toWhomUser = (
      await db.query(
        "select  if(length(middle_name)<3 or middle_name is null, concat(last_name, ', ', first_name),concat(last_name, ', ', first_name, ', ', middle_name)) as fullname from sna.users where id = ? AND deleted_time IS NULL",
        [toWhomId]
      )
    )[0];

    if (!note) {
      throw new Error("The note can not be empty");
    }

    if (!toWhomUser) {
      throw new Error("The recipient user not found");
    }

    let senderId, senderName;

    if (req) {
      senderId = req.session.passport.user.id;
      senderName = req.session.passport.user.name;
    }

    if (fromId) {
      senderId = fromId;

      const sender = (
        await db.query(
          "select if(length(middle_name)<3 or middle_name is null, concat(last_name, ', ', first_name),concat(last_name, ', ', first_name, ', ', middle_name)) as fullname from sna.users where id = ? AND deleted_time IS NULL",
          [fromId]
        )
      )[0];

      if (!sender) {
        throw new Error("The sender user not found");
      }

      senderName = sender.fullname;
    }

    const params = [
      [
        senderName,
        senderId,
        new Date(),
        toWhomId,
        toWhomUser.fullname,
        note,
        isDepartmentWide ? "on" : null,
        customData,
      ],
    ];

    await db.query(
      "insert into daily_notes(user, user_employee_id, created_date, to_whom_id, to_whom_user, note, department_wide, custom_data) values ?",
      [params]
    );

    return new SuccessResult();
  } catch (err) {
    globalThis.logger.error(err);

    return new ErrorResult(err.message, err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
