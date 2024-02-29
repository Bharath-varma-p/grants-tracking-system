const moment = require("moment");

module.exports.trafficCitationAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];
  const and_parameters = [],
    or_parameters = [],
    join_parameters = [];

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

      if (search_category !== "citation") {
        continue;
      }

      if (search_value) {
        if (search_field === "citation_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("citation_date >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "citation_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("citation_date <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "citation_warning_void") {
          and_conditions.push("citation_warning = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "orc") {
          const local_code = search_values[search_fields.findIndex((item) => item === "local_code")];
          const orc = search_value;

          and_conditions.push(`
              (
                (orc_code1 = ? AND local_code1 = ?)
                OR
                (orc_code2 = ? AND local_code2 = ?)
                OR
                (orc_code3 = ? AND local_code3 = ?)                
                OR
                (orc_code4 = ? AND local_code4 = ?)
                OR
                (orc_code5 = ? AND local_code5 = ?)
                OR
                (orc_code6 = ? AND local_code6 = ?)
              )
            `);

          and_parameters.push(...[orc, local_code]);
          and_parameters.push(...[orc, local_code]);
          and_parameters.push(...[orc, local_code]);
          and_parameters.push(...[orc, local_code]);
          and_parameters.push(...[orc, local_code]);
          and_parameters.push(...[orc, local_code]);
        } else if (search_field === "is_local_code") {
          if (search_value === "N") {
            and_conditions.push(`
                (
                  ( 
                    (local_code1 IS NULL OR local_code1 ='' OR local_code1 = 'NONE' OR local_code1 = 'N/A')
                    AND
                    (orc_code1 IS NOT NULL AND orc_code1 <> '' AND orc_code1 <> 'NONE' AND orc_code1 <> 'N/A')
                  ) 
                  OR
                  ( 
                    (local_code2 IS NULL OR local_code2 ='' OR local_code2 = 'NONE' OR local_code2 = 'N/A')
                    AND
                    (orc_code2 IS NOT NULL AND orc_code2 <> '' AND orc_code2 <> 'NONE' AND orc_code2 <> 'N/A')
                  )
                  OR
                  ( 
                    (local_code3 IS NULL OR local_code3 ='' OR local_code3 = 'NONE' OR local_code3 = 'N/A')
                    AND
                    (orc_code3 IS NOT NULL AND orc_code3 <> '' AND orc_code3 <> 'NONE' AND orc_code3 <> 'N/A')
                  )               
                  OR
                  ( 
                    (local_code4 IS NULL OR local_code4 ='' OR local_code4 = 'NONE' OR local_code4 = 'N/A')
                    AND
                    (orc_code4 IS NOT NULL AND orc_code4 <> '' AND orc_code4 <> 'NONE' AND orc_code4 <> 'N/A')
                  ) 
                  OR
                  ( 
                    (local_code5 IS NULL OR local_code5 ='' OR local_code5 = 'NONE' OR local_code5 = 'N/A')
                    AND
                    (orc_code5 IS NOT NULL AND orc_code5 <> '' AND orc_code5 <> 'NONE' AND orc_code5 <> 'N/A')
                  )  
                  OR
                  ( 
                    (local_code6 IS NULL OR local_code6 ='' OR local_code6 = 'NONE' OR local_code6 = 'N/A')
                    AND
                    (orc_code6 IS NOT NULL AND orc_code6 <> '' AND orc_code6 <> 'NONE' AND orc_code6 <> 'N/A')
                  ) 
                )
              `);
          } else if (search_value === "Y") {
            and_conditions.push(`
                (
                  ( local_code1 IS NOT NULL AND local_code1 <> '' AND local_code1 <> 'NONE' AND local_code1 <> 'N/A') 
                  OR
                  ( local_code2 IS NOT NULL AND local_code2 <> '' AND local_code2 <> 'NONE' AND local_code2 <> 'N/A') 
                  OR
                  ( local_code3 IS NOT NULL AND local_code3 <> '' AND local_code3 <> 'NONE' AND local_code3 <> 'N/A')               
                  OR
                  ( local_code4 IS NOT NULL AND local_code4 <> '' AND local_code4 <> 'NONE' AND local_code4 <> 'N/A') 
                  OR
                  ( local_code5 IS NOT NULL AND local_code5 <> '' AND local_code5 <> 'NONE' AND local_code5 <> 'N/A')  
                  OR
                  ( local_code6 IS NOT NULL AND local_code6 <> '' AND local_code6 <> 'NONE' AND local_code6 <> 'N/A') 
                )
              `);
          }
        } else if (search_field === "ticket") {
          and_conditions.push("ticket_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "case_no") {
          and_conditions.push("citation_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "citation_type") {
          and_conditions.push("ovi_task = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "first_name") {
          and_conditions.push("traffic_citations.first_name LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "last_name") {
          and_conditions.push("traffic_citations.last_name LIKE  ? ");
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
          and_conditions.push("calculateAge(date_of_birth, citation_date) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "age_max") {
          and_conditions.push("calculateAge(date_of_birth, citation_date) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "is_juvenile") {
          if (search_value === "Y") {
            and_conditions.push("( calculateAge(date_of_birth,citation_date) < 18  OR juvenile = 'Y' )");
          } else if (search_value === "N") {
            and_conditions.push("( calculateAge(date_of_birth,citation_date) > 18  OR juvenile = 'N' )");
          }
        } else if (search_field === "citation_address") {
          and_conditions.push("Address2 LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "licence_plate") {
          and_conditions.push("license_plate_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "driver_license") {
          and_conditions.push("dl_no LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "speed_mph_in_min") {
          and_conditions.push(
            " speed_mph_in IS NOT NULL AND speed_mph_in <> '' AND CAST(speed_mph_in AS UNSIGNED) >= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "speed_mph_in_max") {
          and_conditions.push(
            " speed_mph_in IS NOT NULL AND speed_mph_in <> '' AND CAST(speed_mph_in AS UNSIGNED) <= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "speed_mph_zone_min") {
          and_conditions.push(" speed_zone IS NOT NULL AND speed_zone <> '' AND CAST(speed_zone AS UNSIGNED) >= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "speed_mph_zone_max") {
          and_conditions.push(" speed_zone IS NOT NULL AND speed_zone <> '' AND CAST(speed_zone AS UNSIGNED) <= ? ");
          and_parameters.push(search_value);
        } else if (search_field === "alcohol_drug_suspected") {
          and_conditions.push("alcohol_drug_suspected = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "alcohol_test_result_min") {
          and_conditions.push(
            " alcohol_test_value IS NOT NULL AND alcohol_test_value <> '' AND CAST(alcohol_test_value AS decimal(12,2)) >= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "alcohol_test_result_max") {
          and_conditions.push(
            " alcohol_test_value IS NOT NULL AND alcohol_test_value <> '' AND CAST(alcohol_test_value AS decimal(12,2)) <= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "driver_license_status") {
          and_conditions.push("license_status = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "safety_belt_failure_to_wear") {
          and_conditions.push("safety_belt = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "area") {
          and_conditions.push("area1 = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "crash") {
          and_conditions.push("crash = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "traffic_crash_no") {
          and_conditions.push("traffic_crash_number LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "court_name") {
          and_conditions.push("court_name = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "court_date_start") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("court_date2 >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "court_date_end") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("court_date2 <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "officer_action") {
          and_conditions.push("officer_action = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "charging_officer") {
          and_conditions.push("charging_officer LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "issuing_officer") {
          and_conditions.push("issuing_officer LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "vehicle_make") {
          and_conditions.push("vehicle_make LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "vehicle_model") {
          and_conditions.push("vehicle_model LIKE  ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "vehicle_year_min") {
          and_conditions.push(
            " vehicle_year IS NOT NULL AND vehicle_year <> '' AND CAST(vehicle_year AS UNSIGNED) >= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "vehicle_year_max") {
          and_conditions.push(
            " vehicle_year IS NOT NULL AND vehicle_year <> '' AND CAST(vehicle_year AS UNSIGNED) <= ? "
          );
          and_parameters.push(search_value);
        } else if (search_field === "narrative") {
          const narrative_conditions = [];

          narrative_conditions.push("narrative LIKE ? ");

          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM traffic_citation_narrative T1 WHERE T1.incident_no = traffic_citations.citation_no AND T1.deleted IS NULL AND T1.narrative LIKE ? ) "
          );

          or_conditions.push(narrative_conditions);

          or_parameters.push("%" + search_value + "%");
          or_parameters.push("%" + search_value + "%");
        } else if (search_field === "sealed_case") {
          if (search_value === "Yes") {
            and_conditions.push("expungement = 'Yes'");
          } else if (search_value === "No") {
            and_conditions.push("expungement IS NULL");
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

    result.parameters = [...join_parameters, ...or_parameters, ...and_parameters];
  }

  return result;
};
