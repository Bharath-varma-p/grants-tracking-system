const moment = require("moment");
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

module.exports.auditLogsAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];
  const and_parameters = [];
  const or_parameters = [];

  const joins = [];

  const search_fields = req.query.search_fields.split("|");
  const search_values = req.query.search_values.split("|");

  const result = {
    where: "",
    join: "",
    parameters: [],
  };

  if (req.query.apply_search === "1") {
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
    and_conditions.push("date >= ? ");
    and_parameters.push(start_date);
    and_conditions.push("date <= ? ");
    and_parameters.push(end_date);

    and_conditions.push("(? is NULL OR audit_logs.department IN (?))");
    if (req.department.name === "Peel9" || req.department.name === "Demo") {
      if (req.query.active_user) {
        const active_user_departments = req.query.active_user.split(",");
        and_parameters.push(0);
        and_parameters.push(active_user_departments);
      } else {
        and_parameters.push(null);
        and_parameters.push(null);
      }
    } else {
      and_parameters.push(0);
      and_parameters.push(req.department.name);
    }

    and_conditions.push("(? is NULL OR pageName IN (?))");
    if (req.query.pageName) {
      const page_names = req.query.pageName.split(",");
      and_parameters.push(0);
      and_parameters.push(page_names);
    } else {
      and_parameters.push(null);
      and_parameters.push(null);
    }
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      if (search_value) {
        if (search_field === "username") {
          and_conditions.push("audit_logs.userName IN (?) ");
          and_parameters.push(search_value.split(","));
        }
        if (search_field === "user_role") {
          and_conditions.push("userRole IN (?) ");
          and_parameters.push(search_value.split(","));
        }
        if (search_field === "page_name") {
          and_conditions.push("pageName IN (?) ");
          and_parameters.push(search_value.split(","));
        }
        if (search_field === "case_no") {
          and_conditions.push("audit_logs.id = ? ");
          and_parameters.push(search_value);
        }
        if (search_field === "action") {
          and_conditions.push("action IN (?) ");
          and_parameters.push(search_value.split(","));
        }
        if (search_field === "keyword_search") {
          and_conditions.push("details LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        }
        if (search_field === "ip_address") {
          and_conditions.push("ip = ? ");
          and_parameters.push(search_value);
        }
        if (search_field === "location") {
          and_conditions.push("location LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        }
        if (search_field === "department") {
          and_conditions.push("audit_logs.department IN (?)");
          and_parameters.push(search_value.split(","));
        }
      }
    }

    if (or_conditions.length > 0 || and_conditions.length > 0) {
      if (or_conditions.length > 0) {
        for (const conditions of or_conditions) {
          result.where += " AND " + `(${conditions.join(" OR ")})`;
        }
      }

      if (and_conditions.length > 0) {
        result.where += " AND " + and_conditions.join(" AND ");
      }
    }

    if (joins.length > 0) {
      result.join += joins.join(" ");
    }

    result.parameters = [...or_parameters, ...and_parameters];
  }

  return result;
};
