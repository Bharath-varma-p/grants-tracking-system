const moment = require("moment");
const SqlHelper = require("./sql");
const { getPools } = require("./database");
const {
  FAIL_LOGIN,
  SUCCESS_LOGIN,
  SUCCESS_OTP,
  FAIL_OTP,
  LOGOUT,
  LOGIN_PAGE,
  OTP_PAGE,
  USER_CREATE,
  USER_DELETE,
  USER_INACTIVATE,
  USER_ACTIVATE,
  USER_QR_RESET,
  ADD_TRAINING,
  PRIVILEGE_CONFIGURE,
  USER_EDIT,
  USER_RESTORE,
  USER_EMAIL_RESET_REQ,
  USER_PASSWORD_RESET_REQ_FAIL,
  USER_PASSWORD_RESET_REQ,
  EMPLOYEES_PAGE,
  USER_ACTIVITY_PAGE,
  STORAGE_USAGE_PAGE,
  TRAININGS_PAGE,
  APPROVAL_CONFIGURATION_PAGE,
  MUNICIPALLY_CODES_PAGE,
  LOCAL_TRAFFIC_CODES_PAGE,
  PRIVILEGE_SETTINGS_PAGE,
  PAGE_VISIT,
  AUDIT_LOGS_PAGE,
  ROLES_PAGE,
  USERS_PAGE,
  ADMIN_TASKS_PAGE,
  DEPARTMENTS_PAGE,
  MIGRATIONS_PAGE,
  CASE_CREATION,
  DAILY_LOG_DATABASE_PAGE,
  CALL_MANAGEMENT_PAGE,
  OFFENSE_NON_CRIMINAL_PAGE,
  TRAFFIC_CRASH_PAGE,
  TRAFFIC_CITATION_PAGE,
  WARRANT_CITATION_PAGE,
  FIR_PAGE,
  MASTER_NAME_PAGE,
  MASTER_BUSINESS_PAGE,
  MASTER_VEHICLE_PAGE,
  EVIDENCE_PROPERTY_PAGE,
  PERMIT_PAGE,
  VEHICLE_MAINTENANCE_PAGE,
  TOW_MANAGEMENT_PAGE,
  CASE_DELETE,
  COURT_MANAGEMENT_PAGE,
  PERMIT_DELETE,
  VEHICLE_MAINTENANCE_DELETE,
  TRAINING_DELETE,
  PERSON_DELETE,
  VEHICLE_DELETE,
  BUSINESS_DELETE,
  PERSON_CREATE,
  VEHICLE_CREATE,
  BUSINESS_CREATE,
  BUSINESS_UPDATE,
  PERSON_UPDATE,
  VEHICLE_UPDATE,
  CASE_UPDATE,
  OTHER_DEPT_RECORD_VIEW,
  LOCATOR_DATABASE_PAGE,
  HELP_DESK_PAGE,
  DASHBOARD_PAGE,
  SEND_DAILY_NOTES,
  CREATE_CALENDAR_EVENT,
  DELETE_CALENDAR_EVENT,
  UPDATE_CALENDAR_EVENT,
  STATS_INTERVAL_CHANGE,
  UPDATE_DAILY_NOTES,
  SAME_DEPT_RECORD_VIEW,
  COMPLETE_ASSIGNED_CASE,
  USER_SUMMARY_COMPONENT,
  ARROW_BUTTON,
  EDIT_BUTTON,
  ATTACHMENT_DELETE,
  NEW_ATTACHMENT,
  VACATION_WATCH,
  NEW_STATUS,
  STATUS_UPDATE,
  STATUS_DELETE,
  ADD_PERSON,
  DELETE_PERSON,
  UPDATE_PERSON,
  CASE_RESTORE,
  NEW_PERMIT,
  PERSON_RESTORE,
  VEHICLE_RESTORE,
  BUSINESS_RESTORE,
  ADD_VEHICLE,
  UPDATE_VEHICLE,
  UPDATE_BUSINESS,
  APPROVE_REQUEST,
  DISAPPROVED,
  APPROVED_BEFORE_USER_REQUEST,
  SUPERVISOR_APPROVED,
  APPROVE_REQUEST_CANCELED,
  CASE_UNLOCK,
} = require("./audit-constants");
const { ROLE_POWER_ADMIN, ROLE_SUPERVISOR, ROLE_USER, ROLE_PROSECUTOR } = require("./auth-constants");

async function checkLogs(columnNames, values, type, startDate, endDate, order) {
  const { pool } = getPools("sna");

  let whereClause = "";
  let index;
  for (index in columnNames) {
    whereClause = whereClause + columnNames[index] + " = ? AND ";
  }

  const result = await SqlHelper.runSql(
    pool,
    `
      SELECT 
        ${type == "count" ? "COUNT(*) as count" : "*"} 
      from 
      audit_logs.audit_logs 
      WHERE ${whereClause}
      ${!startDate || "date >= '" + startDate + "'"}
      AND 
      ${!endDate || "date <= '" + endDate + "'"}
      ${order ? order : "AND " + true}
      `,
    values
  );

  return result.status ? result.data : null;
}

function getIp(req) {
  let ip = req.ipInfo.ip;
  if (ip) {
    ip = ip.replace(/ /g, "");
    const ip_parca = ip.split(",");
    ip = ip_parca[0];
  }
  return ip;
}

async function createDetails(req, username, action, pageName, userRole, params) {
  const { pool } = getPools("sna");

  let details = null;
  let important = "false";
  const ip = getIp(req);
  username = username ? username : req.body.username;
  let caseNo = null;
  const refComponents = [USER_SUMMARY_COMPONENT, ARROW_BUTTON, EDIT_BUTTON];

  if (action == SUCCESS_LOGIN) {
    ///LOGGED IN WITH DIFFERENT IP NEVER SEEN BEFORE
    const checkIp = await checkLogs(
      ["ip", "pageName", "userName"],
      [ip, LOGIN_PAGE, username],
      "count",
      null,
      null,
      null
    );
    if (checkIp && checkIp[0].count == 0) {
      details = "User logged in from a new IP address";
      important = "true";
    }
  }
  if (action == FAIL_LOGIN) {
    ///Username fail count for 1 hour
    const failCount = await checkLogs(
      ["userName", "pageName"],
      [username, LOGIN_PAGE],
      "count",
      moment(new Date()).subtract("1", "hours").format("YYYY-MM-DD HH:mm"),
      moment(new Date()).format("YYYY-MM-DD HH:mm"),
      null
    );
    if (failCount && failCount[0].count > 4) {
      details = "User failed " + (failCount[0].count + 1) + " times within 1 hour \n";
      important = "true";
    }
    ///
    details = (details ? details : "") + "Typed username: " + username;
  }
  if (action == SUCCESS_OTP) {
    ///
  }
  if (action == FAIL_OTP) {
    ///OTP fail count for 1 hour
    const failCount = await checkLogs(
      ["userName", "pageName"],
      [username, OTP_PAGE],
      "count",
      moment(new Date()).subtract("1", "hours").format("YYYY-MM-DD HH:mm"),
      moment(new Date()).format("YYYY-MM-DD HH:mm"),
      null
    );

    if (failCount && failCount[0].count > 4) {
      details = "User failed " + (failCount[0].count + 1) + " times in OTP Page within 1 hour \n";
      important = "true";
    }
    ///
    details = (details ? details : "") + "Typed username: " + username;
  }
  if (action == LOGOUT) {
    /// Last Duration Calculate
    const lastOTP = await checkLogs(
      ["userName", "pageName"],
      [username, OTP_PAGE],
      "",
      null,
      null,
      "ORDER BY ID DESC LIMIT 1"
    );
    const now = moment();
    let lastLogin = null;
    if (lastOTP && lastOTP.length > 0) {
      lastLogin = moment(lastOTP[0].date);

      let minutesDiff = moment(now.diff(lastLogin, "minutes"));
      const hoursDiff = moment(now.diff(lastLogin, "hours"));
      if (minutesDiff > 59) {
        minutesDiff = minutesDiff - hoursDiff * 60;
      }
      details = "Last duration period: " + (hoursDiff == 0 ? "" : hoursDiff + " hour ") + minutesDiff + " minutes";
    }
    ///
  }
  if (action == USER_CREATE) {
    const newUser = req.body.first_name + " " + req.body.last_name;
    const newUsername = req.body.username;
    caseNo = params.insertId;
    details = "Created user: " + newUser + " | Username: " + newUsername;
    ///
  }
  if (action == USER_DELETE) {
    details = "Deleted user: " + req.body.employee_name;
    caseNo = req.params.id;
    ///
  }
  if (action == USER_RESTORE) {
    details = "Restored user: " + req.body.employee_name;
    caseNo = req.params.id;
    ///
  }
  if (action == USER_INACTIVATE) {
    details = "Inactivated user: " + req.body.employee_name;
    caseNo = req.params.id;
  }
  if (action == USER_ACTIVATE) {
    details = "Reactivated user: " + req.body.employee_name;
    caseNo = req.params.id;
  }
  if (action == USER_QR_RESET) {
    details = "QR code reset for user: " + req.body.employee_name;
    caseNo = req.params.id;
  }
  if (action == ADD_TRAINING) {
    details = "Training: " + req.body.course_title;
    caseNo = params;
  }
  if (action == USER_EDIT) {
    details = "Edited Employee: " + req.body.user + (params ? " | Edited with user role" : "");
    caseNo = req.body.idim;
  }
  if (action == PRIVILEGE_CONFIGURE) {
    details = "Edited Employee: " + req.body.employeeName;
    caseNo = req.body.employeeId;
  }
  if (action == USER_EMAIL_RESET_REQ) {
    details = "New Email: " + req.body.email;
    caseNo = req.user.id;
  }
  if (action == USER_PASSWORD_RESET_REQ) {
    details = "Typed Email: " + req.body.email;
    caseNo = params;
  }
  if (action == USER_PASSWORD_RESET_REQ_FAIL) {
    details = "Typed Email: " + req.body.email;
  }
  if (
    action == PAGE_VISIT &&
    (pageName == EMPLOYEES_PAGE ||
      pageName == USER_ACTIVITY_PAGE ||
      pageName == STORAGE_USAGE_PAGE ||
      pageName == TRAININGS_PAGE ||
      pageName == APPROVAL_CONFIGURATION_PAGE ||
      pageName == MUNICIPALLY_CODES_PAGE ||
      pageName == LOCAL_TRAFFIC_CODES_PAGE ||
      pageName == PRIVILEGE_SETTINGS_PAGE ||
      pageName == AUDIT_LOGS_PAGE)
  ) {
    //check if user is admin
    if (userRole == "User") {
      details = '"User" visited an Admin Page';
      important = "true";
    }
  }
  if (action == PAGE_VISIT && pageName == TRAFFIC_CRASH_PAGE) {
    const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
    if (isReferred) {
      details =
        "Ref: " +
        req.query.ref +
        (req.query.button ? "(" + req.query.button + ") " : "") +
        (details ? " | " + details : "");
    }
  }
  if (action == PAGE_VISIT && pageName == TRAFFIC_CITATION_PAGE) {
    const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
    if (isReferred) {
      details =
        "Ref: " +
        req.query.ref +
        (req.query.button ? "(" + req.query.button + ") " : "") +
        (details ? " | " + details : "");
    }
  }
  if (action == PAGE_VISIT && pageName == FIR_PAGE) {
    const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
    if (isReferred) {
      details =
        "Ref: " +
        req.query.ref +
        (req.query.button ? "(" + req.query.button + ") " : "") +
        (details ? " | " + details : "");
    }
  }
  if (action == PAGE_VISIT && pageName == WARRANT_CITATION_PAGE) {
    const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
    if (isReferred) {
      details =
        "Ref: " +
        req.query.ref +
        (req.query.button ? "(" + req.query.button + ") " : "") +
        (details ? " | " + details : "");
    }
  }
  if (action == PAGE_VISIT && pageName == DAILY_LOG_DATABASE_PAGE) {
    const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
    if (isReferred) {
      details =
        "Ref: " +
        req.query.ref +
        (req.query.button ? "(" + req.query.button + ") " : "") +
        (details ? " | " + details : "");
    }
  }
  if (action == PAGE_VISIT && pageName == OFFENSE_NON_CRIMINAL_PAGE) {
    const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
    if (isReferred) {
      details =
        "Ref: " +
        req.query.ref +
        (req.query.button ? "(" + req.query.button + ") " : "") +
        (details ? " | " + details : "");
    }
  }
  if (
    action == PAGE_VISIT &&
    (pageName == ROLES_PAGE ||
      pageName == USERS_PAGE ||
      pageName == ADMIN_TASKS_PAGE ||
      pageName == DEPARTMENTS_PAGE ||
      pageName == MIGRATIONS_PAGE)
  ) {
    if (!(userRole == ROLE_POWER_ADMIN)) {
      details = '"User" visited an Admin Page';
      important = "true";
    }
  }
  if (action == PAGE_VISIT && pageName == "Dark Mode Page") {
    details = "Dark Mode " + (params ? "Activated" : "Deactivated");
  }
  if (action == CASE_CREATION) {
    if (pageName == DAILY_LOG_DATABASE_PAGE) {
      details = (details ? details + " | " : "") + "Case No: " + params + " | Case Type: " + req.body.event_type;
      caseNo = params;
    }
    if (pageName == CALL_MANAGEMENT_PAGE) {
      details = (details ? details + " | " : "") + "CFS No: " + params.cfsNo;

      caseNo = params.id;
    }
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      let report_type = null;
      if (req.body.report_type == "NC") {
        report_type = "Non-Criminal";
      }
      if (req.body.report_type == "O") {
        report_type = "Offense";
      }
      if (req.body.report_type == "S") {
        report_type = "Supplement";
      }
      details =
        (details ? details + " | " : "") +
        "Incident No: " +
        params.incident_no +
        " | Incident Type: " +
        (req.body.orc_no.length < 2 || req.body.orc_no == null ? req.body.non_incident : req.body.orc_no) +
        " -- " +
        report_type;
      caseNo = params.id;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = (details ? details + " | " : "") + "Crash No: " + params;
      caseNo = params;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = (details ? details + " | " : "") + "Citation No: " + req.body.incident_no;
      caseNo = req.body.incident_no;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = (details ? details + " | " : "") + "Arrest No: " + req.body.incident_no;
      caseNo = params;
    }
    if (pageName == FIR_PAGE) {
      details = (details ? details + " | " : "") + "Interview No: " + params.interviewNo;
      caseNo = params.id;
    }
    if (pageName == EVIDENCE_PROPERTY_PAGE) {
      details = (details ? details + " | " : "") + "Incident No: " + params;
      caseNo = params;
    }
    if (pageName == PERMIT_PAGE) {
      details = (details ? details + " | " : "") + "Permit No: " + params;
      caseNo = params;
    }
    if (pageName == VEHICLE_MAINTENANCE_PAGE) {
      details = (details ? details + " | " : "") + "Equipment No: " + params[0];
      caseNo = params[1];
    }
    if (pageName == TOW_MANAGEMENT_PAGE) {
      details = (details ? details + " | " : "") + "Tow No: " + req.body.incident_no;
      caseNo = params;
    }
    if (pageName == MUNICIPALLY_CODES_PAGE) {
      details = (details ? details + " | " : "") + "OHIO REVISED CODE: " + req.body.orc_code;
      caseNo = params;
    }
    if (pageName == LOCAL_TRAFFIC_CODES_PAGE) {
      details = (details ? details + " | " : "") + "OHIO REVISED CODE: " + req.body.orc_code;
      caseNo = params;
    }
    if (pageName == LOCATOR_DATABASE_PAGE) {
      details = (details ? details + " | " : "") + "Point of Interest Name: " + req.body.FullName;
      caseNo = params;
    }
    if (pageName == HELP_DESK_PAGE) {
      details =
        (details ? details + " | " : "") +
        "Subject: " +
        req.body.subject +
        (req.body.private === "on" ? " (Private)" : "");
      caseNo = params;
    }
    if (pageName == VACATION_WATCH) {
      details = (details ? details + " | " : "") + "Watch No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }

  if (action == CASE_DELETE) {
    if (pageName == DAILY_LOG_DATABASE_PAGE) {
      details = "Daily Log No: " + params;
      caseNo = params;
    }
    if (pageName == CALL_MANAGEMENT_PAGE) {
      details = "CFS No: " + req.params.id;
      caseNo = params;
    }
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.incident_no;
      caseNo = params.incidentId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.id;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.citationNo;
      caseNo = params.citationId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Interview No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == EVIDENCE_PROPERTY_PAGE) {
      details = "Evidence No: " + params["evidence_no"];
      caseNo = params.id;
    }
    if (pageName == COURT_MANAGEMENT_PAGE) {
      details = params.case_type + " | Related Case No: " + params.relatedCaseNo;
      caseNo = params.id;
    }
    if (pageName == TOW_MANAGEMENT_PAGE) {
      details = "Tow No: " + req.params.id;
      caseNo = params;
    }
    if (pageName == LOCATOR_DATABASE_PAGE) {
      details = (details ? details + " | " : "") + "Locator ID: " + params;
      caseNo = params;
    }
  }
  if (action == CASE_UPDATE) {
    if (pageName == DAILY_LOG_DATABASE_PAGE) {
      const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
      if (isReferred) {
        params["referrer"] =
          req.query.ref + (req.query.button ? " (" + req.query.button + ") " : "") + (details ? " | " + details : "");
      }
      details = JSON.stringify(params);
      caseNo = params["static"]["id"];
    }
    if (pageName == CALL_MANAGEMENT_PAGE) {
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      let report_type = null;
      if (params.details["static"]["report_type"] == "NC") {
        report_type = "Non-Criminal";
      }
      if (params.details["static"]["report_type"] == "O") {
        report_type = "Offense";
      }
      if (params.details["static"]["report_type"] == "S") {
        report_type = "Supplement";
      }
      params.details["static"]["report_type"] = report_type;
      const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
      if (isReferred) {
        params.details["referrer"] =
          req.query.ref + (req.query.button ? " (" + req.query.button + ") " : "") + (details ? " | " + details : "");
      }
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
      if (isReferred) {
        params.details["referrer"] =
          req.query.ref + (req.query.button ? " (" + req.query.button + ") " : "") + (details ? " | " + details : "");
      }
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
      if (isReferred) {
        params.details["referrer"] =
          req.query.ref + (req.query.button ? " (" + req.query.button + ") " : "") + (details ? " | " + details : "");
      }
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
      if (isReferred) {
        params.details["referrer"] =
          req.query.ref + (req.query.button ? " (" + req.query.button + ") " : "") + (details ? " | " + details : "");
      }
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == FIR_PAGE) {
      const isReferred = req.query.ref ? refComponents.includes(req.query.ref) : false;
      if (isReferred) {
        params.details["referrer"] =
          req.query.ref + (req.query.button ? " (" + req.query.button + ") " : "") + (details ? " | " + details : "");
      }
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == EVIDENCE_PROPERTY_PAGE) {
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == PERMIT_PAGE) {
      details = JSON.stringify(params);
      caseNo = params["static"]["id"];
    }
    if (pageName == VEHICLE_MAINTENANCE_PAGE) {
      details = JSON.stringify(params);
      caseNo = params["static"]["id"];
    }
    if (pageName == TOW_MANAGEMENT_PAGE) {
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == COURT_MANAGEMENT_PAGE) {
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == TRAININGS_PAGE) {
      details = JSON.stringify(params);
      caseNo = params["static"]["id"];
    }
    if (pageName == APPROVAL_CONFIGURATION_PAGE) {
      details = JSON.stringify(params);
      caseNo = params["static"]["id"];
    }
    if (pageName == MUNICIPALLY_CODES_PAGE) {
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == LOCAL_TRAFFIC_CODES_PAGE) {
      details = JSON.stringify(params.details);
      caseNo = params["id"];
    }
    if (pageName == PRIVILEGE_SETTINGS_PAGE) {
      details = JSON.stringify(params);
    }
    if (pageName == LOCATOR_DATABASE_PAGE) {
      details = JSON.stringify(params);
      caseNo = params["static"]["id"];
    }
    if (pageName == HELP_DESK_PAGE) {
      details = JSON.stringify(params);
      caseNo = req.body.uniqid;
    }
    if (pageName == VACATION_WATCH) {
      details = JSON.stringify(params.updatedData);
      caseNo = params["caseId"];
    }
  }
  if (pageName == PERMIT_PAGE && action == NEW_PERMIT) {
    details = (details ? details + " | " : "") + "Permit No: " + params;
    caseNo = params;
  }
  if (action == PERSON_CREATE && pageName == MASTER_NAME_PAGE) {
    details =
      "Full Name: " +
      (params[0] ? params[0] + " " : "") +
      (params[1] ? params[1] + " " : "") +
      (params[2] ? params[2] + " " : "") +
      (" | DOB: " + params[3]);
    caseNo = params[4];
  }
  if (action == BUSINESS_CREATE && pageName == MASTER_BUSINESS_PAGE) {
    details = "Business: " + req.body.business_name;
    caseNo = params;
  }
  if (action == VEHICLE_CREATE && pageName == MASTER_VEHICLE_PAGE) {
    details = "Plate: " + req.body.lp_no;
    caseNo = params;
  }
  if (action == PERSON_DELETE && pageName == MASTER_NAME_PAGE) {
    let result = await SqlHelper.runSql(pool, "SELECT * FROM sna.master_name WHERE id = ?", [req.params.id]);
    result = result.data[0];
    details =
      "Full Name: " +
      (result.first_name ? result.first_name + " " : "") +
      (result.middle_name ? result.middle_name + " " : "") +
      (result.last_name ? result.last_name : "") +
      (result.date_of_birth ? " | DOB: " + moment(result.date_of_birth).format("MM/DD/YYYY") : "-");
    caseNo = result.id;
  }
  if (action == VEHICLE_DELETE && pageName == MASTER_VEHICLE_PAGE) {
    let result = await SqlHelper.runSql(pool, "SELECT * FROM sna.vehicle WHERE id = ?", [req.params.id]);
    result = result.data[0];
    details = "Plate: " + result.lp_plate_number;
    caseNo = result.id;
  }
  if (action == BUSINESS_DELETE && pageName == MASTER_BUSINESS_PAGE) {
    let result = await SqlHelper.runSql(pool, "SELECT * FROM sna.master_business WHERE id = ?", [req.params.id]);
    result = result.data[0];
    details = "Business: " + result.business_name;
    caseNo = result.ID;
  }
  if (pageName == PERMIT_PAGE && action == PERMIT_DELETE) {
    details = "Permit No: " + params;
    caseNo = params;
  }
  if (pageName == VEHICLE_MAINTENANCE_PAGE && action == VEHICLE_MAINTENANCE_DELETE) {
    details = "Equipment No: " + params.asset_no;
    caseNo = params.id;
  }
  if (pageName == TRAININGS_PAGE && action == TRAINING_DELETE) {
    details = "Course Title: " + params.course_title;
    caseNo = params.id;
  }
  if (pageName == MASTER_BUSINESS_PAGE && action == BUSINESS_UPDATE) {
    details = JSON.stringify(params.details);
    caseNo = params["id"];
  }
  if (pageName == MASTER_NAME_PAGE && action == PERSON_UPDATE) {
    details = JSON.stringify(params.details);
    caseNo = params["id"];
  }
  if (pageName == MASTER_VEHICLE_PAGE && action == VEHICLE_UPDATE) {
    details = JSON.stringify(params.details);
    caseNo = params["id"];
  }
  if (pageName == MASTER_NAME_PAGE && action == OTHER_DEPT_RECORD_VIEW) {
    details = params[2] + " - " + params[1] + " - " + params[0];
    caseNo = params[0];
  }
  if (pageName == MASTER_NAME_PAGE && action == SAME_DEPT_RECORD_VIEW) {
    details = params[1] + " - " + params[0];
    caseNo = params[0];
  }
  if (pageName == DASHBOARD_PAGE && action == SEND_DAILY_NOTES) {
    details = req.body.department_wide == "on" ? "Department wide daily note" : "";
  }
  if (pageName == DASHBOARD_PAGE && action == UPDATE_DAILY_NOTES) {
    details = JSON.stringify(params);
  }
  if (pageName == DASHBOARD_PAGE && action == CREATE_CALENDAR_EVENT) {
    details = "Title" + req.body.title;
  }
  if (pageName == DASHBOARD_PAGE && action == DELETE_CALENDAR_EVENT) {
    details = "Title:" + req.body.title;
  }
  if (pageName == DASHBOARD_PAGE && action == UPDATE_CALENDAR_EVENT) {
    details = JSON.stringify(params);
  }
  if (pageName == DASHBOARD_PAGE && action == STATS_INTERVAL_CHANGE) {
    details = "Stats Interval: " + params + " days";
  }
  if (pageName == DASHBOARD_PAGE && action == UPDATE_DAILY_NOTES) {
    details = "Stats Interval: " + params + " days";
  }
  if (pageName == DASHBOARD_PAGE && action == COMPLETE_ASSIGNED_CASE) {
    details = "Case Type: " + req.body.caseType;
    caseNo = params;
  }
  if (action == ATTACHMENT_DELETE || action == NEW_ATTACHMENT) {
    details = params["attachmentType"] ? "Attachment Type: " + params["attachmentType"] : details ? details : "";

    details = details ? details + " | Attachment ID: " + params["id"] : "Attachment ID: " + params["id"];

    details = params["caseSource"]
      ? "Source Page: " + params["caseSource"] + (details ? " | " + details : "")
      : details;

    caseNo = params["caseNo"];
  }
  if (action == NEW_STATUS) {
    if (pageName == VACATION_WATCH) {
      details =
        "Watch No: " + params.caseNo + (params.isProblemObserved == "problem" ? " | Problem Observed" : " | Clear");
    }
  }
  if (action == STATUS_UPDATE) {
    if (pageName == VACATION_WATCH) {
      details = JSON.stringify(params.updates);
      caseNo = params.updates["static"]["watch_no"];
    }
  }
  if (action == STATUS_DELETE) {
    if (pageName == VACATION_WATCH) {
      details = "Watch No: " + params.caseNo;
      caseNo = params.caseNo;
    }
  }
  if (action == ADD_PERSON) {
    if (pageName == VACATION_WATCH) {
      details = "Watch No: " + params;
      caseNo = params;
    }
  }
  if (action == DELETE_PERSON) {
    if (pageName == VACATION_WATCH) {
      details = "Person Name: " + params.person_name + "Watch No: " + params.watch_no;
      caseNo = params.watch_no;
    }
  }
  if (action == UPDATE_PERSON) {
    if (pageName == VACATION_WATCH) {
      details = JSON.stringify(params.updatedData);
      caseNo = params.updatedData["static"]["watch_no"];
    }
  }
  if (action == ADD_VEHICLE) {
    if (pageName == VACATION_WATCH) {
      details = "Watch No: " + params;
      caseNo = params;
    }
  }
  if (action == UPDATE_VEHICLE) {
    if (pageName == VACATION_WATCH) {
      details = JSON.stringify(params.updatedData);
      caseNo = params.updatedData["static"]["watch_no"];
    }
  }
  if (action == UPDATE_BUSINESS) {
    if (pageName == VACATION_WATCH) {
      details = JSON.stringify(params.updatedData);
      caseNo = params.updatedData["static"]["incident_no"];
    }
  }
  if (action == APPROVE_REQUEST) {
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Fir No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }
  if (action == DISAPPROVED) {
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Fir No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }
  if (action == APPROVED_BEFORE_USER_REQUEST) {
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Fir No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }
  if (action == SUPERVISOR_APPROVED) {
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Fir No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }
  if (action == APPROVE_REQUEST_CANCELED) {
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Fir No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }
  if (action == CASE_UNLOCK) {
    if (pageName == OFFENSE_NON_CRIMINAL_PAGE) {
      details = "Incident No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CITATION_PAGE) {
      details = "Citation No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == TRAFFIC_CRASH_PAGE) {
      details = "Crash No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == WARRANT_CITATION_PAGE) {
      details = "Arrest No: " + params.caseNo;
      caseNo = params.caseId;
    }
    if (pageName == FIR_PAGE) {
      details = "Fir No: " + params.caseNo;
      caseNo = params.caseId;
    }
  }
  if ([CASE_RESTORE, PERSON_RESTORE, VEHICLE_RESTORE, BUSINESS_RESTORE].includes(action)) {
    if (pageName == CALL_MANAGEMENT_PAGE) {
      details = details ? details + " | CFS No: " + req.body.id : "CFS No: " + req.body.id;
    }
    if (pageName == AUDIT_LOGS_PAGE && params.sourcePage) {
      switch (params.sourcePage) {
        case CALL_MANAGEMENT_PAGE:
          details = "Source: " + CALL_MANAGEMENT_PAGE + " | CFS No: " + params.caseNo;
          break;
        case DAILY_LOG_DATABASE_PAGE:
          details = "Source: " + DAILY_LOG_DATABASE_PAGE + " | Case No: " + params.caseNo;
          break;
        case OFFENSE_NON_CRIMINAL_PAGE:
          details = "Source: " + OFFENSE_NON_CRIMINAL_PAGE + " | Incident No: " + params.caseNo;
          break;
        case TRAFFIC_CRASH_PAGE:
          details = "Source: " + TRAFFIC_CRASH_PAGE + " | Crash No: " + params.caseNo;
          break;
        case TRAFFIC_CITATION_PAGE:
          details = "Source: " + TRAFFIC_CITATION_PAGE + " | Citation No: " + params.caseNo;
          break;
        case WARRANT_CITATION_PAGE:
          details = "Source: " + WARRANT_CITATION_PAGE + " | Arrest No: " + params.caseNo;
          break;
        case FIR_PAGE:
          details = "Source: " + FIR_PAGE + " | Interview No: " + params.caseNo;
          break;
        case MASTER_NAME_PAGE:
          details = "Source: " + MASTER_NAME_PAGE + " | Master Person No: " + params.caseNo;
          break;
        case MASTER_VEHICLE_PAGE:
          details = "Source: " + MASTER_VEHICLE_PAGE + " | Master Vehicle No: " + params.caseNo;
          break;
        case COURT_MANAGEMENT_PAGE:
          details = "Source: " + COURT_MANAGEMENT_PAGE + " | Related Case No: " + params.caseNo;
          break;
        default:
          details = "Source: " + params.sourcePage + " | Case No: " + params.caseNo;
          break;
      }
      caseNo = params.caseId;
    }
  }

  if (action == "") {
    details = null;
  }

  return { details, important, caseNo };
}

/**
 * @param req Complete information about the request.
 * @param action The name of the action.
 * @param pageName The name of the page that the action happened.
 * @param params Params that wanted to be handled on createDetails function, usually for specific conditions.
 */
module.exports.addAuditLogs = async function (req, action, pageName, params) {
  const { pool } = getPools("sna");
  const ip = getIp(req);

  const department = req.session.passport ? req.session.passport.user.department : null;

  const username = req.session.passport ? req.session.passport.user.username : null;

  const userId = req.session.passport ? req.session.passport.user.id : null;

  const userRoles = req.session.passport
    ? Object.values(
        JSON.parse(JSON.stringify(req.session.passport.user.roles.length > 0 ? req.session.passport.user.roles : []))
      )
    : null;
  let userRole = null;
  let index = 0;
  for (index in userRoles) {
    if (userRoles[index].role_name == ROLE_POWER_ADMIN) {
      userRole = ROLE_POWER_ADMIN;
      break;
    }
    if (userRoles[index].role_name == ROLE_SUPERVISOR && userRole !== ROLE_POWER_ADMIN) {
      userRole = ROLE_SUPERVISOR;
    }
    if (userRoles[index].role_name == ROLE_USER && !(userRole == ROLE_POWER_ADMIN || userRole == ROLE_SUPERVISOR)) {
      userRole = ROLE_USER;
    }
    if (userRoles[index].role_name == ROLE_PROSECUTOR && userRole == null) {
      userRole = ROLE_PROSECUTOR;
    }
  }

  const details = await createDetails(req, username, action, pageName, userRole, params);

  const auditLogParams = [
    [
      new Date(),
      department,
      username ? username : req.body.username,
      userId,
      userRole,
      action,
      pageName,
      details.details,
      ip,
      req.ipInfo.city == null || req.ipInfo.city.trim() == ""
        ? req.ipInfo.country
        : req.ipInfo.city + "," + req.ipInfo.country,
      details.important,
      details.caseNo,
      req.department ? req.department.database_name : null,
    ],
  ];
  SqlHelper.runSql(
    pool,
    `Insert into audit_logs.audit_logs (date, department, userName, userId, userRole, action, pageName, details, ip, location, important, caseNo, actionRelatedDatabase) values ?`,
    [auditLogParams]
  );
  SqlHelper.runSql(pool, `UPDATE audit_logs.table_counts SET rowTotal = rowTotal + 1 WHERE table_name = 'audit_logs'`);
};
