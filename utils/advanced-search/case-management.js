const moment = require("moment");
const { ROLE_DETECTIVE, ROLE_POWER_ADMIN, ROLE_SUPERVISOR } = require("../auth-constants");
const authHelper = require("../auth-helper");
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

module.exports.caseManagementAdvancedSearch = function (req) {
  const parameters = [];
  const now = new Date();
  now.setTime(req.query.now);

  let start_date = "1900-01-01";

  let end_date = moment(now).format(DATE_FORMAT);

  if (req.query.interval === "24hrs") {
    start_date = moment(now).add(-1, "days").format(DATE_FORMAT);
  } else if (req.query.interval === "3days") {
    start_date = moment(now).add(-3, "days").format(DATE_FORMAT);
  } else if (req.query.interval === "1week") {
    start_date = moment(now).add(-7, "days").format(DATE_FORMAT);
  } else if (req.query.interval === "1month") {
    start_date = moment(now).add(-1, "months").format(DATE_FORMAT);
  } else if (req.query.interval === "3months") {
    start_date = moment(now).add(-3, "months").format(DATE_FORMAT);
  } else if (req.query.interval === "6months") {
    start_date = moment(now).add(-6, "months").format(DATE_FORMAT);
  } else if (req.query.interval === "1year") {
    start_date = moment(now).add(-1, "years").format(DATE_FORMAT);
  } else if (req.query.interval === "range") {
    if (req.query.start_date) {
      start_date = req.query.start_date;
    }
    if (req.query.end_date) {
      end_date = req.query.end_date;
    }
  }

  parameters.push(...[req.session.passport.user.id, req.session.passport.user.id]);

  parameters.push(...[start_date, end_date]);

  if (req.query.investigator) {
    const investigators = req.query.investigator.split("|");

    if (investigators.length > 0) {
      parameters.push(0);
      parameters.push(investigators);
    } else {
      parameters.push(...[null, null]);
    }
  } else {
    parameters.push(...[null, null]);
  }

  if (req.query.assigned_case) {
    const assigned_cases = req.query.assigned_case.split("|");

    if (assigned_cases.length > 0) {
      parameters.push(0);
      parameters.push(assigned_cases);
    } else {
      parameters.push(...[null, null]);
    }
  } else {
    parameters.push(...[null, null]);
  }

  if (req.query.completed_case) {
    const completed_cases = req.query.completed_case.split("|");

    if (completed_cases.length > 0) {
      parameters.push(0);
      parameters.push(completed_cases);
    } else {
      parameters.push(...[null, null]);
    }
  } else {
    parameters.push(...[null, null]);
  }

  if (req.query.case_status) {
    parameters.push(req.query.case_status);
    parameters.push(req.query.case_status);
    parameters.push(req.query.case_status);
  } else {
    parameters.push("All");
    parameters.push(null);
    parameters.push(null);
  }

  if (req.query.investigator_status) {
    parameters.push(req.query.investigator_status);
    parameters.push(req.query.investigator_status);
    parameters.push(req.query.investigator_status);
    parameters.push(req.query.investigator_status);
  } else {
    parameters.push("All");
    parameters.push(null);
    parameters.push(null);
    parameters.push(null);
  }

  if (req.query.task_status) {
    parameters.push(req.query.task_status);
    parameters.push(req.query.task_status);
    parameters.push(req.query.task_status);
    parameters.push(req.query.task_status);
    parameters.push(req.query.task_status);
  } else {
    parameters.push("All");
    parameters.push(null);
    parameters.push(null);
    parameters.push(null);
    parameters.push(null);
  }

  if (req.query.crime_category) {
    parameters.push(req.query.crime_category);
    parameters.push(req.query.crime_category);
    parameters.push(req.query.crime_category);
  } else {
    parameters.push("All");
    parameters.push(null);
    parameters.push(null);
  }

  if (
    authHelper.hasRole(req, ROLE_SUPERVISOR) ||
    authHelper.hasRole(req, ROLE_POWER_ADMIN) ||
    authHelper.hasRole(req, ROLE_DETECTIVE)
  ) {
    parameters.push("All");
  } else {
    parameters.push(null);
  }

  return {
    where: "",
    join: "",
    parameters,
    table: "",
  };
};
