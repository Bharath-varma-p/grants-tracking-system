const moment = require("moment");

module.exports.dailyActivityAdvancedSearch = function (req) {
  const result = {
    where: "",
    join: "",
  };

  const or_conditions = [];
  const and_conditions = [];
  const personOrConditions = [];
  const personAndConditions = [];

  const or_parameters = [];
  const and_parameters = [];
  const personOrParameters = [];
  const personAndParameters = [];

  const parameters = [];

  const joins = [];

  let search_fields = [];
  let search_values = [];
  let searchCategories = [];
  if (req.query.search_fields) {
    search_fields = req.query.search_fields.split("|");
  }

  if (req.query.search_values) {
    search_values = req.query.search_values.split("|");
  }

  if (req.query.search_categories) {
    searchCategories = req.query.search_categories.split("|");
  }

  if (req.query.apply_search === "1") {
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const category = searchCategories[i];

      if (category === "person") {
        continue;
      }

      if (search_value) {
        if (search_field === "daily_activity_start_date") {
          const date1 = moment(new Date(search_value)).format("YYYY-MM-DD");
          and_conditions.push("created_date >= ? ");
          and_parameters.push(date1);
        } else if (search_field === "daily_activity_end_date") {
          const date2 = moment(new Date(search_value)).format("YYYY-MM-DD");
          and_conditions.push("created_date <= ? ");
          and_parameters.push(date2);
        } else if (search_field === "event_type") {
          and_conditions.push("event_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "daily_log_description") {
          and_conditions.push("description Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "daily_log_address") {
          and_conditions.push("address Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "apt_no") {
          and_conditions.push("apt_no = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "priority") {
          and_conditions.push("priority = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "division") {
          and_conditions.push("division = ?");
          and_parameters.push(search_value);
        } else if (search_field === "event_action") {
          and_conditions.push("event_action = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "frequency") {
          and_conditions.push("frequency = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "weekday") {
          and_conditions.push("weekday = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "event_start_date_begin") {
          const date_temp = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          and_conditions.push("start_time >= ? ");
          and_parameters.push(date_temp);
        } else if (search_field === "event_start_date_end") {
          const date_temp = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          and_conditions.push("start_time <= ? ");
          and_parameters.push(date_temp);
        } else if (search_field === "event_end_date_begin") {
          const date_temp = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          and_conditions.push("end_time >= ? ");
          and_parameters.push(date_temp);
        } else if (search_field === "event_end_date_end") {
          const date_temp = moment(new Date(search_value)).format("YYYY-MM-DD HH:mm:ss");

          and_conditions.push("end_time <= ? ");
          and_parameters.push(date_temp);
        } else if (search_field === "business_name") {
          and_conditions.push(
            `
              EXISTS ( 
                SELECT 1 FROM daily_logs_business T1 
                WHERE 
                  T1.incident_no = daily_logs.id 
                  AND 
                  T1.deleted IS NULL 
                  AND 
                  business_name LIKE ?
              )
            `
          );
          and_parameters.push(`%${search_value}%`);
        } else if (search_field === "vehicle_plate") {
          and_conditions.push(
            `
              EXISTS ( 
                SELECT 1 FROM daily_logs_vehicle T1 
                WHERE 
                  T1.incident_no = daily_logs.id 
                  AND 
                  T1.deleted IS NULL 
                  AND 
                  lp_plate_number LIKE ?
              )
            `
          );
          and_parameters.push(`%${search_value}%`);
        } else if (search_field === "narrative_search") {
          const narrative_conditions = [];

          narrative_conditions.push("narrative LIKE ?");
          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM daily_logs_narrative T1 WHERE T1.incident_no = daily_logs.id AND T1.deleted IS NULL AND T1.narrative LIKE ? )"
          );

          or_conditions.push(narrative_conditions);
          or_parameters.push("%" + search_value + "%", "%" + search_value + "%");
        } else if (search_field === "user") {
          and_conditions.push("user Like ? ");
          and_parameters.push("%" + search_value + "%");
        }
      }
    }

    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const category = searchCategories[i];

      if (category !== "person") {
        continue;
      }

      if (search_value) {
        if (search_field === "involved_person") {
          const search_name = search_value.replace(/\W/gi, "");

          if (search_name) {
            personAndConditions.push(`
            (
              CONCAT_WS('',first_name,middle_name, last_name) LIKE ?
              OR
              CONCAT_WS('',first_name, last_name) LIKE ?
              OR
              CONCAT_WS('',last_name, first_name, middle_name) LIKE ?
              OR
              CONCAT_WS('',last_name, first_name) LIKE ?
            )
            `);

            const searchName = "%" + search_name + "%";
            personAndParameters.push(searchName, searchName, searchName, searchName);
          }
        } else if (search_field === "age_min") {
          personAndConditions.push("calculateAge(dob, created_date) >= ?");
          personAndParameters.push(search_value);
        } else if (search_field === "age_max") {
          personAndConditions.push("calculateAge(dob, created_date) <= ?");
          personAndParameters.push(search_value);
        }
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
         SELECT incident_no
         FROM daily_logs_person
         WHERE daily_logs_person.deleted is null ${personWhere}
      ) AS dailyLogsPersonQuery ON dailyLogsPersonQuery.incident_no = daily_logs.id 
      `);
  }

  if (or_conditions.length > 0 || and_conditions.length > 0) {
    if (or_conditions.length > 0) {
      for (const conditions of or_conditions) {
        result.where += " AND " + `(${conditions.join(" OR ")})`;
      }
      parameters.push(...or_parameters);
    }

    if (and_conditions.length > 0) {
      result.where += " AND " + and_conditions.join(" AND ");
      parameters.push(...and_parameters);
    }
  }

  if (joins.length > 0) {
    result.join += joins.join(" ");
  }

  result.parameters = parameters;

  return result;
};
