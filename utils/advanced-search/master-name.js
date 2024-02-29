const moment = require("moment");

module.exports.masterNameAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];
  const and_parameters = [];
  const or_parameters = [];

  const joins = [];

  const search_fields = req.query.search_fields.split("|");
  const search_values = req.query.search_values.split("|");
  const search_categories = req.query.search_categories.split("|");

  const useSoundex = req.query.useSoundex === "true";

  const result = {
    where: "",
    join: "",
    parameters: [],
    soundexSearch: "",
  };

  const soundexSearchValues = [];

  if (req.query.apply_search === "1") {
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const search_category = search_categories[i];

      if (search_category !== "master_name") {
        continue;
      }

      if (search_value) {
        if (search_field === "created_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("created_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "created_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("created_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "first_name") {
          if (useSoundex) {
            soundexSearchValues.push(search_value);
          } else {
            and_conditions.push("first_name LIKE ? ");
            and_parameters.push("%" + search_value + "%");
          }
        } else if (search_field === "middle_name") {
          if (useSoundex) {
            soundexSearchValues.push(search_value);
          } else {
            and_conditions.push("middle_name LIKE  ? ");
            and_parameters.push("%" + search_value + "%");
          }
        } else if (search_field === "last_name") {
          if (useSoundex) {
            soundexSearchValues.push(search_value);
          } else {
            and_conditions.push("last_name LIKE  ? ");
            and_parameters.push("%" + search_value + "%");
          }
        } else if (search_field === "suffix") {
          and_conditions.push("suffix LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "alias1") {
          and_conditions.push("alias1 LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "alias2") {
          and_conditions.push("alias2 LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "alias3") {
          and_conditions.push("alias3 LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "dob_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("date_of_birth >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "dob_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("date_of_birth <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "age_min") {
          and_conditions.push("calculateAge(date_of_birth, now()) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "age_max") {
          and_conditions.push("calculateAge(date_of_birth, now()) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "sex") {
          and_conditions.push("sex = ?");
          and_parameters.push(search_value);
        } else if (search_field === "race") {
          and_conditions.push("race = ?");
          and_parameters.push(search_value);
        } else if (search_field === "marital_status") {
          and_conditions.push("marital_status = ?");
          and_parameters.push(search_value);
        } else if (search_field === "place_of_birth") {
          and_conditions.push("birth_place LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "state_of_birth") {
          and_conditions.push("birth_state = ?");
          and_parameters.push(search_value);
        } else if (search_field === "ssn") {
          const searchValCleaned = search_value.replace(/\W/gi, "");
          const ssn = searchValCleaned.replace(/(\d{3})-?(\d{2})-?(\d{4})/, "$1-$2-$3");

          and_conditions.push(
            "( CAST(AES_DECRYPT(ssn,UNHEX(SHA2('" +
              process.env.ssn_password +
              "',512))) AS CHAR) LIKE ? OR CAST(AES_DECRYPT(ssn,UNHEX(SHA2('" +
              process.env.ssn_password +
              "',512))) AS CHAR) LIKE ? ) "
          );
          and_parameters.push("%" + searchValCleaned + "%");
          and_parameters.push("%" + ssn + "%");
        } else if (search_field === "fbi") {
          and_conditions.push("fbi_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "bci") {
          and_conditions.push("bci LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "control") {
          and_conditions.push("control_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "jacket") {
          and_conditions.push("jacket LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "gang_affiliation") {
          and_conditions.push("gang_affiliation LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "driver_license_no") {
          and_conditions.push("driving_lic_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "driver_license_state") {
          and_conditions.push("issue_state = ?");
          and_parameters.push(search_value);
        } else if (search_field === "driver_license_class") {
          and_conditions.push("driver_license_class = ?");
          and_parameters.push(search_value);
        } else if (search_field === "dl_issued_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("issued_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "dl_issued_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("issued_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "dl_expiration_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("expiration_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "dl_expiration_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("expiration_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "address") {
          and_conditions.push("Address LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "neighborhood") {
          and_conditions.push("Neighborhood LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "city") {
          and_conditions.push("City LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "county") {
          and_conditions.push("County LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "state") {
          and_conditions.push("State = ?");
          and_parameters.push(search_value);
        } else if (search_field === "zip_code") {
          and_conditions.push("zip_code LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "apt_no") {
          and_conditions.push("apt_no = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "resident_status") {
          and_conditions.push("resident_status = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "hair_color") {
          and_conditions.push("hair_color = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "eye_color") {
          and_conditions.push("eye_color = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "height_min") {
          and_conditions.push(
            " height IS NOT NULL AND height <> '' AND (CAST(SUBSTRING(height,1,1) AS UNSIGNED) * 12 + CAST(SUBSTRING(height,2,2) AS UNSIGNED)) >= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "height_max") {
          and_conditions.push(
            " height IS NOT NULL AND height <> '' AND (CAST(SUBSTRING(height,1,1) AS UNSIGNED) * 12 + CAST(SUBSTRING(height,2,2) AS UNSIGNED)) <= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "weight_min") {
          and_conditions.push(" weight IS NOT NULL AND weight <> '' AND CAST(weight AS UNSIGNED) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "weight_max") {
          and_conditions.push(" weight IS NOT NULL AND weight <> '' AND CAST(weight AS UNSIGNED) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "scars") {
          and_conditions.push("scars_marks LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "employer") {
          and_conditions.push("employer LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "employer_phone") {
          const searchValCleaned = search_value.replace(/\W/gi, "");
          and_conditions.push(`REGEXP_REPLACE(employer_phone, "[^0-9]",'') LIKE  ? `);
          and_parameters.push("%" + searchValCleaned + "%");
        } else if (search_field === "employer_address") {
          and_conditions.push("employer_address LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "occupation") {
          and_conditions.push("occupation_school LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "work_tel") {
          const searchValCleaned = search_value.replace(/\W/gi, "");
          and_conditions.push(`REGEXP_REPLACE(work_tel, "[^0-9]",'') LIKE  ? `);
          and_parameters.push("%" + searchValCleaned + "%");
        } else if (search_field === "cell_phone") {
          const searchValCleaned = search_value.replace(/\W/gi, "");
          and_conditions.push("REGEXP_REPLACE(cell_phone,'[^0-9]','') LIKE  ? ");
          and_parameters.push("%" + searchValCleaned + "%");
        } else if (search_field === "other_tel") {
          const searchValCleaned = search_value.replace(/\W/gi, "");
          and_conditions.push("REGEXP_REPLACE(other_tell, '[^0-9]','') LIKE  ? ");
          and_parameters.push("%" + searchValCleaned + "%");
        } else if (search_field === "email") {
          and_conditions.push("email LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "additional_info") {
          and_conditions.push("additional_descriptives LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "note") {
          and_conditions.push("narrative LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "violent_crime") {
          if (search_value === "Y") {
            and_conditions.push("violent_crime = 'yes' ");
          } else if (search_value === "N") {
            and_conditions.push("violent_crime <> 'yes' ");
          }
        } else if (search_field === "cautious") {
          if (search_value === "Y") {
            and_conditions.push("cautious = 'yes' ");
          } else if (search_value === "N") {
            and_conditions.push("cautious <> 'yes' ");
          }
        } else if (search_field === "cautious_note") {
          and_conditions.push("cautious_notes LIKE ? ");
          and_parameters.push("%" + search_value + "%");
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

    result.soundexSearch = useSoundex ? soundexSearchValues.join(" ") : "";

    result.parameters = [...or_parameters, ...and_parameters];
  }

  return result;
};
