const moment = require("moment");

module.exports.offenseNonCriminalAdvancedSearch = function (req) {
  const or_conditions = [];
  const and_conditions = [];
  const or_parameters = [];
  const and_parameters = [];
  const join_parameters = [];
  const joins = [];
  const searchFields = req.query.search_fields.split("|");
  const searchValues = req.query.search_values.split("|");

  const result = {
    where: "",
    join: "",
  };

  const crimeNameConditions = [];
  const crimeNameParameters = [];

  if (req.query.apply_search === "1") {
    let birthDateHandled = false;
    let ageHandled = false;
    let nameHandled = false;

    for (let i = 0; i < searchFields.length; i++) {
      const search_field = searchFields[i];
      const search_value = searchValues[i];

      if (search_value) {
        if (search_field === "search_input") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("date_time >= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "search_input2") {
          const tarih = moment(new Date(search_value)).format("YYYY-MM-DD");

          if (tarih.length === 10) {
            and_conditions.push("date_time <= ? ");
            and_parameters.push(tarih);
          }
        } else if (search_field === "incident_type") {
          crimeNameConditions.push("`orc_codes`.`Nonviolent` Like ? ");
          crimeNameParameters.push("%" + search_value + "%");
        } else if (search_field === "incident_type2") {
          crimeNameConditions.push("`orc_codes`.`Nonviolent` Like ? ");
          crimeNameParameters.push("%" + search_value + "%");
        } else if (search_field === "incident_type3") {
          crimeNameConditions.push("`orc_codes`.`Nonviolent` Like ? ");
          crimeNameParameters.push("%" + search_value + "%");
        } else if (search_field === "incident_non_criminal_name") {
          crimeNameConditions.push("incident.non_incident Like ? ");
          crimeNameParameters.push("%" + search_value + "%");
        } else if (search_field === "address") {
          and_conditions.push("Address2 Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "apt_no") {
          and_conditions.push("apt_no = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "user") {
          and_conditions.push("user Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "criminal_activity") {
          and_conditions.push("criminal_activity Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "weapon_type") {
          and_conditions.push("weapon_force_type = ? ");
          and_parameters.push(search_value);
        } else if (search_field === "method_of_operation") {
          and_conditions.push("operation_method Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "case_clearences") {
          and_conditions.push("case_clearences Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field == "force") {
          and_conditions.push("use_of_force Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "location_type") {
          and_conditions.push("location_type Like ? ");
          and_parameters.push("%" + search_value + "%");
        } else if (search_field === "nibrs") {
          if (search_value === "non_nibrs") {
            and_conditions.push("nibrs_submission_date is null");
          }
          if (search_value === "nibrs") {
            and_conditions.push("nibrs_submission_date is not null");
          }
        } else if (search_field === "confidential") {
          if (search_value === "Y") {
            and_conditions.push("confidential = 'Y' ");
          } else {
            and_conditions.push("(confidential IS NULL OR confidential <> 'Y') ");
          }
        } else if (search_field === "camera_recording") {
          if (search_value === "Y") {
            and_conditions.push("camera_recording = 'Y' ");
          } else {
            and_conditions.push("(camera_recording IS NULL OR camera_recording <> 'Y') ");
          }
        } else if (search_field === "linked_incident_no") {
          if (search_value === "Y") {
            and_conditions.push("linked_incident_no is not null ");
          } else {
            and_conditions.push("(linked_incident_no IS NULL) ");
          }
        } else if (search_field === "narrative_search") {
          const narrative_conditions = [];

          const narrativeSearch = "%" + search_value + "%";

          narrative_conditions.push("narrative LIKE ?");
          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM narrative T1 WHERE T1.incident_no = incident.incident_no AND T1.deleted IS NULL AND T1.confidential= 0 AND T1.narrative LIKE ? ) "
          );
          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM uof T1 WHERE T1.incident_no = incident.incident_no AND (T1.deleted is null OR (" +
              req.session.passport.user.show_sealed +
              " AND expungement='Yes')) AND T1.narrative LIKE ? ) "
          );
          narrative_conditions.push(
            "EXISTS ( SELECT 1 FROM arrest T1 WHERE T1.incident_no = incident.incident_no AND (T1.deleted is null OR (" +
              req.session.passport.user.show_sealed +
              " AND expungement='Yes')) AND T1.narrative LIKE ? ) "
          );

          or_conditions.push(narrative_conditions);
          or_parameters.push(narrativeSearch, narrativeSearch, narrativeSearch, narrativeSearch);
        } else if (search_field === "search_first_name" || search_field === "search_last_name") {
          if (nameHandled) {
            continue;
          }
          nameHandled = true;

          const firstNameIndex = searchFields.findIndex((p) => p === "search_first_name");
          const lastNameIndex = searchFields.findIndex((p) => p === "search_last_name");

          let first_name, last_name;

          if (firstNameIndex > -1) {
            first_name = searchValues[firstNameIndex];
          }

          if (lastNameIndex > -1) {
            last_name = searchValues[lastNameIndex];
          }

          if (first_name && last_name) {
            const firstNameSearch = `%${first_name}%`;
            const lastNameSearch = `%${last_name}%`;
            joins.push(`
                  JOIN 
                  (
                      (
                          SELECT T1.incident_id FROM arrest T1  WHERE  (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ? AND T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM suspect T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ? AND T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM victim T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ? AND T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM reportee T1 WHERE T1.deleted IS NULL AND
                              T1.reportee_first_name LIKE ? AND T1.reportee_last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM witness T1 WHERE T1.deleted IS NULL AND
                              T1.witness_first_name LIKE ? AND T1.witness_last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ? AND T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof_officer T1 WHERE T1.deleted IS NULL AND 
                              T1.first_name LIKE ? AND T1.last_name LIKE ?
                      )
                  ) AS NameTable ON NameTable.incident_id = incident.id
              `);
            join_parameters.push(
              firstNameSearch,
              lastNameSearch,
              firstNameSearch,
              lastNameSearch,
              firstNameSearch,
              lastNameSearch,
              firstNameSearch,
              lastNameSearch,
              firstNameSearch,
              lastNameSearch,
              firstNameSearch,
              lastNameSearch,
              firstNameSearch,
              lastNameSearch
            );
          } else if (first_name) {
            const firstNameSearch = `%${first_name}%`;
            joins.push(`
                  JOIN 
                  (
                      (
                          SELECT T1.incident_id FROM arrest T1  WHERE  (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM suspect T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM victim T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM reportee T1  WHERE T1.deleted IS NULL AND
                          T1.reportee_first_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM witness T1 WHERE T1.deleted IS NULL AND
                          T1.witness_first_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.first_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof_officer T1 WHERE T1.deleted IS NULL AND 
                              T1.first_name LIKE ?
                      )
                  ) AS FirstNameTable ON FirstNameTable.incident_id = incident.id
              `);
            join_parameters.push(
              firstNameSearch,
              firstNameSearch,
              firstNameSearch,
              firstNameSearch,
              firstNameSearch,
              firstNameSearch,
              firstNameSearch
            );
          } else if (last_name) {
            const lastNameSearch = `%${last_name}%`;
            joins.push(`
                  JOIN 
                  (
                      (
                          SELECT T1.incident_id FROM arrest T1  WHERE  (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM suspect T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM victim T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM reportee T1  WHERE T1.deleted IS NULL AND
                          T1.reportee_last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM witness T1 WHERE T1.deleted IS NULL AND
                          T1.witness_last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.last_name LIKE ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof_officer T1 WHERE T1.deleted IS NULL AND 
                              T1.last_name LIKE ?
                      )
                  ) AS LastNameTable ON LastNameTable.incident_id = incident.id
              `);
            join_parameters.push(
              lastNameSearch,
              lastNameSearch,
              lastNameSearch,
              lastNameSearch,
              lastNameSearch,
              lastNameSearch,
              lastNameSearch
            );
          }
        } else if (search_field === "age_min" || search_field === "age_max") {
          if (ageHandled) {
            continue;
          }

          ageHandled = true;

          const startIndex = searchFields.findIndex((p) => p === "age_min");
          const endIndex = searchFields.findIndex((p) => p === "age_max");

          let start = -1000;

          if (startIndex > -1) {
            start = searchValues[startIndex];
          }

          let end = 1000;

          if (endIndex > -1) {
            end = searchValues[endIndex];
          }

          joins.push(`
            JOIN 
            (
                (
                  SELECT T1.incident_id FROM arrest T1  
                  JOIN incident ON T1.incident_id = incident.id
                  WHERE  (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                  calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time)) BETWEEN ? AND ?
                )
                UNION
                (
                  SELECT T1.incident_id FROM suspect T1
                  JOIN incident ON T1.incident_id = incident.id
                  WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                    calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time)) BETWEEN ? AND ?
                )
                UNION
                (
                  SELECT T1.incident_id FROM victim T1 
                  JOIN incident ON T1.incident_id = incident.id
                  WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                  calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time)) BETWEEN ? AND ?
                )
                UNION
                (
                  SELECT T1.incident_id FROM reportee T1  
                  JOIN incident ON T1.incident_id = incident.id
                  WHERE T1.deleted IS NULL AND
                  calculateAge( T1.reportee_dob , IFNULL(incident.occurred_from, incident.date_time)) BETWEEN ? AND ?
                )
                UNION
                (
                  SELECT T1.incident_id FROM witness T1 
                  JOIN incident ON T1.incident_id = incident.id
                  WHERE T1.deleted IS NULL AND
                  calculateAge( T1.witness_dob , IFNULL(incident.occurred_from, incident.date_time)) BETWEEN ? AND ?
                )
                UNION
                (
                  SELECT T1.incident_id FROM uof T1 
                  JOIN incident ON T1.incident_id = incident.id
                  WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                  calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time)) BETWEEN ? AND ?
                )
            ) AS AgeTable ON AgeTable.incident_id = incident.id
          `);

          join_parameters.push(start, end, start, end, start, end, start, end, start, end, start, end);
        } else if (search_field === "birth_date_start" || search_field === "birth_date_end") {
          if (birthDateHandled) {
            continue;
          }

          birthDateHandled = true;

          const startIndex = searchFields.findIndex((p) => p === "birth_date_start");
          const endIndex = searchFields.findIndex((p) => p === "birth_date_end");

          let start = "1900-01-01";
          let validInput = false;

          if (startIndex > -1) {
            start = moment(new Date(searchValues[startIndex])).format("YYYY-MM-DD");
            if (start.length === 10) {
              validInput = true;
            }
          }

          let end = "3000-01-01";

          if (endIndex > -1) {
            end = moment(new Date(searchValues[endIndex])).format("YYYY-MM-DD");
            if (end.length === 10) {
              validInput = true;
            }
          }

          if (validInput) {
            joins.push(`
                  JOIN 
                  (
                      (
                          SELECT T1.incident_id FROM arrest T1  WHERE  (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                          T1.date_of_birth BETWEEN ? AND ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM suspect T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.date_of_birth BETWEEN ? AND ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM victim T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.date_of_birth BETWEEN ? AND ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM reportee T1  WHERE T1.deleted IS NULL AND
                          T1.reportee_dob BETWEEN ? AND ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM witness T1 WHERE T1.deleted IS NULL AND
                          T1.witness_dob BETWEEN ? AND ?
                      )
                      UNION
                      (
                          SELECT T1.incident_id FROM uof T1 WHERE (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND
                              T1.date_of_birth BETWEEN ? AND ?
                      )
                  ) AS BirthDateTable ON BirthDateTable.incident_id = incident.id
              `);
            join_parameters.push(start, end, start, end, start, end, start, end, start, end, start, end);
          }
        } else if (search_field === "business_name") {
          and_conditions.push(`
                  EXISTS ( 
                      SELECT 1 FROM victim T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND 
                      ( 
                          T1.business_name LIKE ?
                      )
                  )
              `);
          and_parameters.push(`%${search_value}%`);
        } else if (search_field === "vehicle_plate_number") {
          and_conditions.push(`
                  EXISTS ( 
                      SELECT 1 FROM incident_vehicle T1 WHERE T1.incident_no = incident.incident_no AND T1.deleted IS NULL AND 
                      ( 
                          T1.lp_plate_number LIKE ?
                      )
                  )
              `);
          and_parameters.push(`%${search_value}%`);
        } else if (search_field === "link_existence") {
          const isNot = search_value.includes("_not_") ? "NOT " : "";

          if (search_value === "arrest_exist" || search_value === "arrest_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                  SELECT 1 FROM arrest T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) 
                  )
              `);
          } else if (search_value === "suspect_exist" || search_value === "suspect_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM suspect T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) 
                  )
              `);
          } else if (search_value === "victim_exist" || search_value === "victim_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM victim T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes'))
                  )
              `);
          } else if (search_value === "reportee_exist" || search_value === "reportee_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM reportee T1 WHERE T1.incident_id = incident.id AND T1.deleted IS NULL
                  )
              `);
          } else if (search_value === "witness_exist" || search_value === "witness_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM witness T1 WHERE T1.incident_id = incident.id AND T1.deleted IS NULL
                  )
              `);
          } else if (search_value === "vehicle_exist" || search_value === "vehicle_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM incident_vehicle T1 WHERE T1.incident_no = incident.incident_no AND T1.deleted IS NULL
                  )
              `);
          } else if (search_value === "narrative_exist") {
            const narrative_existence_conditions = [];

            narrative_existence_conditions.push("narrative IS NOT NULL AND narrative <> '' ");
            narrative_existence_conditions.push(
              "EXISTS ( SELECT 1 FROM narrative T1 WHERE T1.incident_no = incident.incident_no AND T1.deleted IS NULL AND T1.confidential= 0 AND T1.narrative IS NOT NULL AND T1.narrative <> '' ) "
            );
            narrative_existence_conditions.push(
              "EXISTS ( SELECT 1 FROM uof T1 WHERE T1.incident_no = incident.incident_no AND (T1.deleted is null OR (" +
                req.session.passport.user.show_sealed +
                " AND expungement='Yes'))  AND T1.narrative IS NOT NULL AND T1.narrative <> '' ) "
            );
            narrative_existence_conditions.push(
              "EXISTS ( SELECT 1 FROM arrest T1 WHERE T1.incident_no = incident.incident_no AND (T1.deleted is null OR (" +
                req.session.passport.user.show_sealed +
                " AND expungement='Yes'))  AND T1.narrative IS NOT NULL AND T1.narrative <> '') "
            );

            or_conditions.push(narrative_existence_conditions);
          } else if (search_value === "narrative_not_exist") {
            and_conditions.push("(narrative IS NULL OR narrative = '') ");
            and_conditions.push(
              "NOT EXISTS ( SELECT 1 FROM narrative T1 WHERE T1.incident_no = incident.incident_no AND T1.deleted IS NULL AND T1.confidential= 0 AND T1.narrative IS NOT NULL AND T1.narrative <> '' ) "
            );
            and_conditions.push(
              "NOT EXISTS ( SELECT 1 FROM uof T1 WHERE T1.incident_no = incident.incident_no AND (T1.deleted is null OR (" +
                req.session.passport.user.show_sealed +
                " AND expungement='Yes')) AND T1.narrative IS NOT NULL AND T1.narrative <> '' ) "
            );
            and_conditions.push(
              "NOT EXISTS ( SELECT 1 FROM arrest T1 WHERE T1.incident_no = incident.incident_no AND (T1.deleted is null OR (" +
                req.session.passport.user.show_sealed +
                " AND expungement='Yes'))  AND T1.narrative IS NOT NULL AND T1.narrative <> '') "
            );
          } else if (search_value === "fir_exist" || search_value === "fir_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM fir T1 WHERE T1.linked_id = incident.id AND T1.deleted IS NULL AND T1.linked_source='Incident'
                  )
              `);
          } else if (search_value === "traffic_crash_exist" || search_value === "traffic_crash_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM traffic T1 WHERE T1.linked_incidentNo = incident.incident_no AND T1.linked_source='Offense-NonCriminal' AND T1.deleted is null
                  )
              `);
          } else if (search_value === "traffic_citation_exist" || search_value === "traffic_citation_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM traffic_citations T1 WHERE T1.linked_incident_no=incident.incident_no AND T1.linked_source='Offense-NonCriminal' AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) 
                  )
              `);
          } else if (
            search_value === "warrant_citation_arrest_exist" ||
            search_value === "warrant_citation_arrest_not_exist"
          ) {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM arrest_non T1 WHERE T1.linked_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND T1.linked_source='Incident'
                  )
              `);
          } else if (search_value === "property_exist" || search_value === "property_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM property T1 WHERE T1.incident_id = incident.id AND T1.deleted IS NULL
                  )
              `);
          } else if (search_value === "property_attachment_exist" || search_value === "property_attachment_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM property_attachments T1 WHERE T1.incident_no = incident.incident_no AND T1.confidential = 0 AND T1.deleted IS NULL
                  )
              `);
          } else if (search_value === "incident_attachment_exist" || search_value === "incident_attachment_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM incident_attachments T1 WHERE T1.incident_no = incident.incident_no AND T1.confidential = 0 AND T1.deleted IS NULL
                  )
              `);
          } else if (search_value === "arrest_attachment_exist" || search_value === "arrest_attachment_not_exist") {
            and_conditions.push(`
                  ${isNot} EXISTS ( 
                      SELECT 1 FROM arrest_attachments T1 WHERE T1.incident_no = incident.incident_no AND T1.confidential = 0 AND T1.deleted IS NULL
                  )
              `);
          }
        } else if (search_field === "juvenile") {
          if (search_value === "arrest_exist") {
            and_conditions.push(`
                  EXISTS ( SELECT 1 FROM arrest T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND 
                          ( 
                            calculateAge( T1.date_of_birth , T1.arrest_date ) < 18
                          )
                  ) 
              `);
          } else if (search_value === "suspect_exist") {
            and_conditions.push(`
                  EXISTS ( SELECT 1 FROM suspect T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND 
                          ( 
                            calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time) ) < 18
                          )
                          AND 
                          T1.last_name <> 'Unknown'
                  ) 
              `);
          } else if (search_value === "victim_exist") {
            and_conditions.push(`
                  EXISTS ( SELECT 1 FROM victim T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND 
                          ( 
                            calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time) ) < 18
                          )
                  ) 
              `);
          } else if (search_value === "reportee_exist") {
            and_conditions.push(`
                  EXISTS ( SELECT 1 FROM reportee T1 WHERE T1.incident_id = incident.id AND T1.deleted IS NULL AND 
                          ( 
                            calculateAge( T1.reportee_dob , IFNULL(incident_date,T1.edited_date) ) < 18
                          )
                  ) 
              `);
          } else if (search_value === "witness_exist") {
            and_conditions.push(`
                  EXISTS ( SELECT 1 FROM witness T1 WHERE T1.incident_id = incident.id AND T1.deleted IS NULL AND 
                          ( 
                            calculateAge( T1.witness_dob , IFNULL(incident_date,T1.edited_date) ) < 18
                          )
                  ) 
              `);
          } else if (search_value === "uof_exist") {
            and_conditions.push(`
                  EXISTS ( SELECT 1 FROM uof T1 WHERE T1.incident_id = incident.id AND (T1.deleted is null OR (${req.session.passport.user.show_sealed} AND expungement='Yes')) AND 
                          ( 
                            calculateAge( T1.date_of_birth , IFNULL(incident.occurred_from, incident.date_time) ) < 18
                          )
                  ) 
              `);
          }
        } else if (search_field === "larceny_type_search") {
          const larceny_types = search_value.split(",");
          and_conditions.push("larceny_type IN ( ? ) ");
          and_parameters.push(larceny_types);
        } else if (search_field === "sealed_case") {
          if (search_value === "Yes") {
            and_conditions.push(`
                (
                  EXISTS ( SELECT 1 FROM victim T1 WHERE T1.incident_id = incident.id AND expungement='Yes')
                  OR
                  EXISTS ( SELECT 1 FROM suspect T1 WHERE T1.incident_id = incident.id AND expungement='Yes')
                  OR
                  EXISTS ( SELECT 1 FROM arrest T1 WHERE T1.incident_id = incident.id AND expungement='Yes')
                  OR
                  EXISTS ( SELECT 1 FROM uof T1 WHERE T1.incident_id = incident.id AND expungement='Yes')
                )
            `);
          } else if (search_value === "No") {
            and_conditions.push(`
                NOT EXISTS ( 
                  SELECT 1 FROM victim T1 WHERE T1.incident_id = incident.id AND expungement='Yes'
                ) 
            `);

            and_conditions.push(`
                NOT EXISTS ( 
                  SELECT 1 FROM suspect T1 WHERE T1.incident_id = incident.id AND expungement='Yes'
                ) 
            `);

            and_conditions.push(`
                NOT EXISTS ( 
                  SELECT 1 FROM arrest T1 WHERE T1.incident_id = incident.id AND expungement='Yes'
                ) 
            `);

            and_conditions.push(`
                NOT EXISTS ( 
                  SELECT 1 FROM uof T1 WHERE T1.incident_id = incident.id AND expungement='Yes'
                ) 
            `);
          }
        } else if (search_field === "incident_genre") {
          if (search_value === "offense") {
            and_conditions.push("LENGTH(orc_no) >= 2");
          } else {
            and_conditions.push("(LENGTH(orc_no) < 2 OR ISNULL(orc_no))");
          }
        }
      }
    }

    if (crimeNameConditions.length > 0) {
      or_conditions.push(crimeNameConditions);
      or_parameters.push(...crimeNameParameters);
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
