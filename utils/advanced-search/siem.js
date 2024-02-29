const moment = require("moment");
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

module.exports.siemAdvancedSearch = function (req) {
  const parameters = [];

  const now = new Date();
  let start_date = moment(now).add(-100, "years").format("YYYY-MM-DD");
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

  if (req.query.country) {
    const countries = req.query.country.split(",");
    parameters.push(0);
    parameters.push(countries);
  } else {
    parameters.push(null);
    parameters.push(null);
  }

  if (req.query.page_name) {
    const siem_pages = req.query.page_name.split(",");
    parameters.push(0);
    parameters.push(siem_pages);
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
