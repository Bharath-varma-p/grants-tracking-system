const moment = require("moment");
module.exports.vacationWatchAdvancedSearch = function (req) {
  const orConditions = [];
  const andConditions = [];

  const personOrConditions = [];
  const personAndConditions = [];

  const checkLogOrConditions = [];
  const checkLogAndConditions = [];

  const joins = [];

  const parameters = [];

  const orParameters = [],
    andParameters = [],
    personOrParameters = [],
    personAndParameters = [],
    checkLogOrParameters = [],
    checkLogAndParameters = [];

  const searchFields = req.query.search_fields.split("|");
  const searchValues = req.query.search_values.split("|");
  const searchCategories = req.query.search_categories.split("|");

  const result = {
    where: "",
    join: "",
  };

  if (req.query.apply_search === "1") {
    for (let i = 0; i < searchFields.length; i++) {
      const searchField = searchFields[i];
      const searchValue = searchValues[i];
      const searchCategory = searchCategories[i];

      if (searchCategory !== "vacation") {
        continue;
      }

      if (searchValue) {
        if (searchField === "start_date_from") {
          const tarih = moment(new Date(searchValue)).format("YYYY-MM-DD HH:mm");

          andConditions.push("start_date >= ? ");
          andParameters.push(tarih);
        } else if (searchField === "start_date_to") {
          const tarih = moment(new Date(searchValue)).format("YYYY-MM-DD HH:mm");

          andConditions.push("start_date <= ? ");
          andParameters.push(tarih);
        } else if (searchField === "end_date_from") {
          const tarih = moment(new Date(searchValue)).format("YYYY-MM-DD HH:mm");

          andConditions.push("end_date >= ? ");
          andParameters.push(tarih);
        } else if (searchField === "end_date_to") {
          const tarih = moment(new Date(searchValue)).format("YYYY-MM-DD HH:mm");

          andConditions.push("end_date <= ? ");
          andParameters.push(tarih);
        } else if (searchField === "address") {
          andConditions.push("watch_location_summary LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "beat") {
          andConditions.push("beat = ? ");
          andParameters.push(searchValue);
        } else if (searchField === "zone") {
          andConditions.push("zone = ? ");
          andParameters.push(searchValue);
        } else if (searchField === "alarm_system") {
          andConditions.push("alarm_system = ? ");
          andParameters.push(searchValue);
        } else if (searchField === "pet_on_premise") {
          andConditions.push("pet_on_premise = ? ");
          andParameters.push(searchValue);
        } else if (searchField === "emergency_contact_holder_name") {
          andConditions.push("emergency_contact_holder_name LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "emergency_contact_holder_phone") {
          andConditions.push("emergency_contact_holder_phone LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "key_holder_name") {
          andConditions.push("key_holder_name LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "key_holder_phone") {
          andConditions.push("key_holder_phone LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "alarm_code_holder_name") {
          andConditions.push("alarm_code_holder_name LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "alarm_code_holder_phone") {
          andConditions.push("alarm_code_holder_phone LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        } else if (searchField === "lights_on_timer") {
          if (searchValue === "Yes") {
            andConditions.push("lights_on_timer = 'Yes' ");
          } else {
            andConditions.push("lights_on_timer <> 'Yes' ");
          }
        } else if (searchField === "delivery_stopped") {
          if (searchValue === "Yes") {
            andConditions.push("delivery_stopped = 'Yes' ");
          } else {
            andConditions.push("delivery_stopped <> 'Yes' ");
          }
        } else if (searchField === "narrative") {
          andConditions.push("narrative LIKE ? ");
          andParameters.push("%" + searchValue + "%");
        }
      }
    }

    for (let i = 0; i < searchFields.length; i++) {
      const searchField = searchFields[i];
      const searchValue = searchValues[i];
      const searchCategory = searchCategories[i];

      if (searchCategory !== "person") {
        continue;
      }

      if (searchValue) {
        if (searchField === "person_type") {
          personAndConditions.push(`person_type = ? `);
          personAndParameters.push(searchValue);
        } else if (searchField === "search_first_name") {
          personAndConditions.push(`first_name LIKE ? `);
          personAndParameters.push("%" + searchValue + "%");
        } else if (searchField === "search_last_name") {
          personAndConditions.push(`last_name LIKE ? `);
          personAndParameters.push("%" + searchValue + "%");
        } else if (searchField === "phone") {
          personAndConditions.push(`phone LIKE ? `);
          personAndParameters.push("%" + searchValue + "%");
        } else if (searchField === "email") {
          personAndConditions.push(`email LIKE ? `);
          personAndParameters.push("%" + searchValue + "%");
        }
      }
    }

    for (let i = 0; i < searchFields.length; i++) {
      const searchField = searchFields[i];
      const searchValue = searchValues[i];
      const searchCategory = searchCategories[i];

      if (searchCategory !== "check_log") {
        continue;
      }

      if (searchValue) {
        if (searchField === "check_log_start_date") {
          const tarih = moment(new Date(searchValue)).format("YYYY-MM-DD HH:mm");

          checkLogAndConditions.push("check_date >= ? ");
          checkLogAndParameters.push(tarih);
        } else if (searchField === "check_log_end_date") {
          const tarih = moment(new Date(searchValue)).format("YYYY-MM-DD HH:mm");

          checkLogAndConditions.push("check_date <= ? ");
          checkLogAndParameters.push(tarih);
        } else if (searchField === "checking_officer") {
          checkLogAndConditions.push(`officer_name LIKE ? `);
          checkLogAndParameters.push("%" + searchValue + "%");
        } else if (searchField === "disposition") {
          checkLogAndConditions.push(`type = ?`);
          checkLogAndParameters.push(searchValue);
        } else if (searchField === "check_log_narrative") {
          checkLogAndConditions.push(`narrative LIKE ? `);
          checkLogAndParameters.push("%" + searchValue + "%");
        }
      }
    }

    if (personOrConditions.length > 0 || personAndConditions.length > 0) {
      let personWhere = "";

      if (personOrConditions.length > 0) {
        for (const conditions of personOrConditions) {
          personWhere += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...personOrParameters);
      }

      if (personAndConditions.length > 0) {
        personWhere += " AND " + personAndConditions.join(" AND ");
        parameters.push(...personAndParameters);
      }

      joins.push(`
        JOIN 
        (
           SELECT watch_no
           FROM vacation_watch_person
           WHERE vacation_watch_person.deleted is null ${personWhere}
        ) AS vacationWatchPersonQuery ON vacationWatchPersonQuery.watch_no = vacation_watch.watch_no 
      `);
    }

    if (checkLogOrConditions.length > 0 || checkLogAndConditions.length > 0) {
      let checkLogWhere = "";

      if (checkLogOrConditions.length > 0) {
        for (const conditions of checkLogOrConditions) {
          checkLogWhere += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...checkLogOrParameters);
      }

      if (checkLogAndConditions.length > 0) {
        checkLogWhere += " AND " + checkLogAndConditions.join(" AND ");
        parameters.push(...checkLogAndParameters);
      }

      joins.push(`
        JOIN 
        (
           SELECT watch_no
           FROM vacation_watch_check_logs
           WHERE vacation_watch_check_logs.deleted is null ${checkLogWhere}
        ) AS checkLogQuery ON checkLogQuery.watch_no = vacation_watch.watch_no 
      `);
    }

    if (orConditions.length > 0 || andConditions.length > 0) {
      if (orConditions.length > 0) {
        for (const conditions of orConditions) {
          result.where += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...orParameters);
      }

      if (andConditions.length > 0) {
        result.where += " AND " + andConditions.join(" AND ");
        parameters.push(...andParameters);
      }
    }

    if (joins.length > 0) {
      result.join += joins.join(" ");
    }
  }

  result.parameters = parameters;

  return result;
};
