const moment = require("moment");

module.exports.warrantCitationArrestAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];
  const or_parameters = [];
  const and_parameters = [];
  const join_parameters = [];
  const joins = [];
  const search_fields = req.query.search_fields.split("|");
  const search_values = req.query.search_values.split("|");

  const result = {
    where: "",
    join: "",
  };

  if (req.query.apply_search === "1") {
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];

      if (search_value) {
        if (search_field === "arrest_start_date") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("arrest_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "arrest_end_date") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("arrest_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "first_name") {
          and_conditions.push("arrest_non.first_name Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "last_name") {
          and_conditions.push("arrest_non.last_name Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "dob_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("arrest_non.date_of_birth >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "dob_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("arrest_non.date_of_birth <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "age_min") {
          and_conditions.push("calculateAge(date_of_birth, arrest_date) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "age_max") {
          and_conditions.push("calculateAge(date_of_birth, arrest_date) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "arrest_no") {
          and_conditions.push("incident_no Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "arrestee_type") {
          and_conditions.push("arrestee_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "arrest_type") {
          and_conditions.push("arrest_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "recite") {
          and_conditions.push("recite = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "armed_with") {
          and_conditions.push("armed_with = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "orc_no") {
          and_conditions.push("concat(',',orc_no,',') LIKE ? ");
          and_parameters.push("%," + search_value + "%");
        } else if (search_field === "offense_name") {
          and_conditions.push("concat(',',transformToLongOffenseName(orc_no),',') LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "nta") {
          and_conditions.push("nta Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "reason_for_stop") {
          and_conditions.push("stop_reason = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "arrest_address") {
          and_conditions.push("Address2 Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "licence_plate") {
          and_conditions.push("lp_plate_number Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "ssn") {
          const ssn = search_value.replace(/\W/gi, "");
          and_conditions.push(
            `CAST(AES_DECRYPT(arrest_non.ssn,UNHEX(SHA2('${process.env.ssn_password}',512))) AS CHAR) LIKE ? `
          );
          and_parameters.push("%" + ssn + "%");
        } else if (search_field === "fbi") {
          and_conditions.push("fbi_no Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "control") {
          and_conditions.push("control_no Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "gang") {
          and_conditions.push("gang_affiliation Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "agency_name") {
          and_conditions.push("agency_name Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "warrant_number") {
          and_conditions.push("warrant Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "user") {
          and_conditions.push("user Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "narrative_search") {
          const narrative_conditions = [];

          const narrativeSearch = "%" + search_value + "%";

          narrative_conditions.push("narrative LIKE ?");
          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM warrant_citation_arrest_narrative T1 WHERE T1.incident_no = arrest_non.incident_no AND T1.deleted IS NULL AND T1.narrative LIKE ? ) "
          );

          or_conditions.push(narrative_conditions);
          or_parameters.push(narrativeSearch, narrativeSearch);
        } else if (search_field === "sealed_case") {
          if (search_value === "Yes") {
            and_conditions.push("expungement = 'Yes' ");
          } else {
            and_conditions.push("expungement IS NULL ");
          }
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
  }

  result.parameters = [...join_parameters, ...or_parameters, ...and_parameters];

  return result;
};
