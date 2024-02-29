const moment = require("moment");
const { createHideMasterCondition } = require("../create-hide-master-condition");
const { createFulltextSearchParams } = require("../helper");

module.exports.masterVehicleAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];

  const owner_or_conditions = [];
  const owner_and_conditions = [];

  const and_parameters = [];
  const or_parameters = [];

  const parameters = [];
  const owner_or_parameters = [];
  const owner_and_parameters = [];

  const joins = [];

  const search_fields = req.query.search_fields.split("|");
  const search_values = req.query.search_values.split("|");
  const search_categories = req.query.search_categories.split("|");

  const result = {
    where: "",
    join: "",
    parameters: [],
  };

  if (req.query.apply_search === "1") {
    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const search_category = search_categories[i];

      if (search_category !== "master_vehicle") {
        continue;
      }

      if (search_value) {
        if (search_field === "license_plate") {
          and_conditions.push("lp_plate_number LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "vin") {
          and_conditions.push("lp_VIN LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "vehicle_make") {
          and_conditions.push("vehicle_make LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "vehicle_model") {
          and_conditions.push("vehicle_model LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "vehicle_year_min") {
          and_conditions.push("vehicle_year >= ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "vehicle_year_max") {
          and_conditions.push("vehicle_year <= ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "registration_year_min") {
          and_conditions.push("register_year >= ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "registration_year_max") {
          and_conditions.push("register_year <= ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "vehicle_color") {
          and_conditions.push("vehicle_color = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "lp_state") {
          and_conditions.push("lp_state = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "lp_type") {
          and_conditions.push("lp_type = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "insurance_verified") {
          and_conditions.push("insurance_verified = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "insurance_company") {
          and_conditions.push("insurance_company LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "insurance_policy_no") {
          and_conditions.push("insurance_policy_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "type_use") {
          and_conditions.push("type_of_use = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "us_dot_no") {
          and_conditions.push("us_dot_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "vehicle_weight") {
          and_conditions.push("vehicle_weight = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "towed_by") {
          and_conditions.push("towed_by LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "towed_address") {
          and_conditions.push("towed_address LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "interlock_equipped_device") {
          and_conditions.push("interlock_equipped_device = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "hazardous_material") {
          and_conditions.push("hazadous_material = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "class_no") {
          and_conditions.push("class_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "placard_id") {
          and_conditions.push("placard_id LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "special_function_level") {
          and_conditions.push("special_function_level = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "cargo_body_type") {
          and_conditions.push("cargo_body_type = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "vehicle_defects") {
          and_conditions.push("vehicle_defects = ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "note") {
          and_conditions.push("narrative LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "cautious") {
          if (search_value === "Y") {
            and_conditions.push("cautious = 'yes' ");
          } else if (search_value === "N") {
            and_conditions.push("cautious <> 'yes' ");
          }
        }

        if (search_field === "cautious_note") {
          and_conditions.push("cautious_notes LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_first_name") {
          and_conditions.push("owner_first_name LIKE ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_middle_name") {
          and_conditions.push("owner_middle_name LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_last_name") {
          and_conditions.push("owner_last_name LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_suffix") {
          and_conditions.push("suffix LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_dob_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("owner_dob >= ? ");
            and_parameters.push(tarih);
          }
        }

        if (search_field === "owner_dob_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("owner_dob <= ? ");
            and_parameters.push(tarih);
          }
        }
        if (search_field === "age_min") {
          and_conditions.push("calculateAge(owner_dob, now()) >= ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "age_max") {
          and_conditions.push("calculateAge(owner_dob, now()) <= ? ");
          and_parameters.push(search_value);
        }

        if (search_field === "owner_sex") {
          and_conditions.push("owner_sex = ?");
          and_parameters.push(search_value);
        }

        if (search_field === "owner_race") {
          and_conditions.push("owner_race = ?");
          and_parameters.push(search_value);
        }

        if (search_field === "owner_address") {
          and_conditions.push("owner_address LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_neighborhood") {
          and_conditions.push("owner_neighborhood LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_city") {
          and_conditions.push("owner_city LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_county") {
          and_conditions.push("owner_county LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_state") {
          and_conditions.push("owner_state = ?");
          and_parameters.push(search_value);
        }

        if (search_field === "owner_zip_code") {
          and_conditions.push("owner_zip_code LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        }

        if (search_field === "owner_apt_no") {
          and_conditions.push("apt_no = ? ");
          and_parameters.push(search_value);
        }
      }
    }

    for (let i = 0; i < search_fields.length; i++) {
      const search_field = search_fields[i];
      const search_value = search_values[i];
      const search_category = search_categories[i];

      if (search_category !== "owner") {
        continue;
      }

      const { searchFilter } = createFulltextSearchParams(search_value);

      if (search_value) {
        if (search_field === "owner_ssn") {
          const searchValCleaned = search_value.replace(/\W/gi, "");
          const ssn = searchValCleaned.replace(/(\d{3})-?(\d{2})-?(\d{4})/, "$1-$2-$3");

          owner_and_conditions.push(`
            (
              ssn = AES_ENCRYPT(?, UNHEX(SHA2('${process.env.ssn_password}',512)))
              OR
              ssn = AES_ENCRYPT(?, UNHEX(SHA2('${process.env.ssn_password}',512)))
            )
          `);

          owner_and_parameters.push(searchValCleaned);
          owner_and_parameters.push(ssn);
        }

        if (search_field === "owner_control_no") {
          owner_and_conditions.push("MATCH(master_search) AGAINST(? IN BOOLEAN MODE)");
          owner_and_parameters.push(searchFilter);
        }

        if (search_field === "driver_license_no") {
          owner_and_conditions.push("MATCH(master_search) AGAINST(? IN BOOLEAN MODE)");
          owner_and_parameters.push(searchFilter);
        }

        if (search_field === "cell_phone") {
          owner_and_conditions.push("MATCH(master_search) AGAINST(? IN BOOLEAN MODE)");
          owner_and_parameters.push(searchFilter);
        }
      }
    }

    if (owner_or_conditions.length > 0 || owner_and_conditions.length > 0) {
      let ownerWhere = createHideMasterCondition(req.department, "person");

      if (owner_or_conditions.length > 0) {
        for (const conditions of owner_or_conditions) {
          ownerWhere += " AND " + `(${conditions.join(" OR ")})`;
        }
        parameters.push(...owner_or_parameters);
      }

      if (owner_and_conditions.length > 0) {
        ownerWhere += " AND " + owner_and_conditions.join(" AND ");
        parameters.push(...owner_and_parameters);
      }

      joins.push(`
        JOIN 
        (
           SELECT master_name_id
           FROM sna.master_name
           WHERE (sna.master_name.deleted is null AND sna.master_name.active IS NULL) ${ownerWhere}
        ) AS ownerQuery ON ownerQuery.master_name_id = sna.vehicle.master_name_id 
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
  }

  return result;
};
