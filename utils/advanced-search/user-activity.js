const moment = require("moment");
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

module.exports.userActivityAdvancedSearch = function (req, department_department) {
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

  parameters.push(start_date);
  parameters.push(end_date);

  if (req.session.passport.user.department === "Peel9" || req.session.passport.user.department === "Demo") {
    if (req.query.active_user) {
      const active_user_departments = req.query.active_user.split(",");
      parameters.push(0);
      parameters.push(active_user_departments);
    } else {
      parameters.push(null);
      parameters.push(null);
    }
  } else {
    parameters.push(0);
    parameters.push(department_department);
  }

  if (req.query.pageName) {
    const page_names = req.query.pageName.split(",");
    parameters.push(0);
    parameters.push(page_names);
  } else {
    parameters.push(null);
    parameters.push(null);
  }

  return {
    where: "",
    join: "",
    parameters,
    table: "",
  };
};
