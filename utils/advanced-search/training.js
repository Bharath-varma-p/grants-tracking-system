const moment = require("moment");

module.exports.trainingAdvancedSearch = function (req) {
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
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];

      if (search_value) {
        if (search_field === "start_date") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("start_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "end_date") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("start_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "course_title") {
          and_conditions.push("course_title LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "training_type") {
          and_conditions.push("training_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "category") {
          and_conditions.push("category = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "frequency") {
          and_conditions.push("frequency = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "hours_of_training_max") {
          and_conditions.push(
            " hours_of_training IS NOT NULL AND hours_of_training <> '' AND CAST(hours_of_training AS UNSIGNED) <= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "hours_of_training_min") {
          and_conditions.push(
            " hours_of_training IS NOT NULL AND hours_of_training <> '' AND CAST(hours_of_training AS UNSIGNED) >= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "instructor_name") {
          and_conditions.push("instructor_name LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "training_conducted_by") {
          and_conditions.push("training_conducted_by = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "completed") {
          if (search_value === "Y") {
            and_conditions.push("completed = 1");
          } else if (search_value === "N") {
            and_conditions.push("completed = 0");
          }
        } else if (search_field === "certification") {
          if (search_value === "Y") {
            and_conditions.push("certification = 1");
          } else if (search_value === "N") {
            and_conditions.push("certification = 0");
          }
        } else if (search_field === "certificate_issued") {
          if (search_value === "Y") {
            and_conditions.push("certificate_issued = 1");
          } else if (search_value === "N") {
            and_conditions.push("certificate_issued = 0");
          }
        } else if (search_field === "mandatory") {
          if (search_value === "Y") {
            and_conditions.push("mandatory = 1");
          } else if (search_value === "N") {
            and_conditions.push("mandatory = 0");
          }
        } else if (search_field === "minimum_training_requirement") {
          if (search_value === "Y") {
            and_conditions.push("minimum_training_requirement = 1");
          } else if (search_value === "N") {
            and_conditions.push("minimum_training_requirement = 0");
          }
        } else if (search_field === "cost_per_office_max") {
          and_conditions.push(" cost IS NOT NULL AND cost <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "cost_per_office_min") {
          and_conditions.push(" cost IS NOT NULL AND cost >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "calea") {
          if (search_value === "Y") {
            and_conditions.push("calea = 1");
          } else if (search_value === "N") {
            and_conditions.push("calea = 0");
          }
        } else if (search_field === "lexipol") {
          if (search_value === "Y") {
            and_conditions.push("lexipol = 1");
          } else if (search_value === "N") {
            and_conditions.push("lexipol = 0");
          }
        } else if (search_field === "opota") {
          if (search_value === "Y") {
            and_conditions.push("opota = 1");
          } else if (search_value === "N") {
            and_conditions.push("opota = 0");
          }
        } else if (search_field === "police_one") {
          if (search_value === "Y") {
            and_conditions.push("police_one = 1");
          } else if (search_value === "N") {
            and_conditions.push("police_one = 0");
          }
        } else if (search_field === "officer") {
          and_conditions.push("officer_id = ?");
          and_parameters.push(search_value);
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
