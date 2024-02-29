const BaseLogic = require("./base-logic");
const { transformDriverLicenseClass } = require("./helper");

const updatableMasterNameFields = [
  "date_of_birth",
  "first_name",
  "last_name",
  "middle_name",
  "sex",
  "race",
  "ethnicity",
  "Address2",
  "Address",
  "Neighborhood",
  "City",
  "County",
  "PointX",
  "PointY",
  "State",
  "zip_code",
  "Country",
  "apt_no",
  "cell_phone",
  "ssn",
  "fbi_no",
  "control_no",
  "employer_address",
  "employer_phone",
  "suffix",
  "employer",
  "alias1",
  "alias2",
  "alias3",
  "hair_color",
  "eye_color",
  "scars_marks",
  "height",
  "weight",
  "gang_affiliation",
  "resident_status",
  "marital_status",
  "birth_place",
  "birth_state",
  "occupation_school",
  "additional_descriptives",
  "other_tell",
  "email",
  "driving_lic_no",
  "issued_date",
  "issue_state",
  "driver_license_class",
  "expiration_date",
];

const updatableMasterVehicleFields = [
  "lp_state",
  "lp_plate_number",
  "lp_VIN",
  "vehicle_year",
  "vehicle_make",
  "vehicle_color",
  "vehicle_model",
  "insurance_verified",
  "insurance_company",
  "insurance_policy_no",
  "vehicle_defects",
  "towed_by",
  "towed_address",
  "US_DOT_no",
  "vehicle_weight",
  "owner_first_name",
  "owner_middle_name",
  "owner_last_name",
  "suffix",
  "owner_dob",
  "owner_sex",
  "owner_race",
  "owner_address",
  "owner_address_short",
  "owner_neighborhood",
  "owner_city",
  "owner_county",
  "owner_state",
  "owner_zip_code",
  "owner_country",
  "owner_lat",
  "owner_lng",
  "apt_no",
  "owner_phone",
  "type_of_use",
  "interlock_equipped_device",
  "hazadous_material",
  "class_no",
  "placard_id",
  "unit_type",
  "number_of_trailing_units",
  "autonomous_level",
  "special_function_level",
  "cargo_body_type",
  "register_year",
  "master_name_id",
];

class UpdateMaster extends BaseLogic {
  async update(page, req, extra = {}) {
    let db;
    const errors = [];

    try {
      const { master_name_id, vehicle_id } = req.body;
      const { violent = false } = extra;
      const user = req.session ? req.session.passport.user.name : "RCIC";
      const editedBy = req.body.rcic_unit || req.session.passport.user.name;
      const departmentName = this.department ? this.department.name : "RCIC";

      if (master_name_id) {
        const newMaster = this.parseMasterNameFields(page, req);

        if (newMaster) {
          for (const key in newMaster) {
            newMaster[key] = newMaster[key] || null;
          }

          if (!newMaster.date_of_birth || newMaster.date_of_birth != "Unknown") {
            db = await this.pool.getConnection();

            if (violent) {
              await db.query(
                "UPDATE sna.master_name SET violent_crime='yes' WHERE active IS NULL AND master_name_id=?",
                [master_name_id]
              );
            }

            const selectFields = updatableMasterNameFields
              .map((field) => {
                if (field === "ssn") {
                  return "CAST(AES_DECRYPT(ssn,UNHEX(SHA2('" + process.env.ssn_password + "',512))) AS CHAR) as ssn";
                } else if (field === "date_of_birth") {
                  return "date_format(date_of_birth, '%Y-%m-%d') as date_of_birth";
                }

                return field;
              })
              .join(",");

            const masterRecords = await db.query(
              `SELECT ${selectFields} FROM sna.master_name WHERE active IS NULL And master_name_id=?`,
              [master_name_id]
            );

            const masterRecord = masterRecords[0];

            if (masterRecord) {
              if (newMaster.ssn) {
                newMaster.ssn = newMaster.ssn.replace(/-/g, "").replace(/' '/g, "");
              }

              if (newMaster.race === "H") {
                newMaster.race = masterRecord.race;
                newMaster.ethnicity = "H";
              }

              if (
                (!("first_name" in newMaster) || masterRecord.first_name == newMaster.first_name) &&
                (!("last_name" in newMaster) || masterRecord.last_name == newMaster.last_name) &&
                (!("middle_name" in newMaster) || masterRecord.middle_name == newMaster.middle_name) &&
                (!("Address2" in newMaster) || masterRecord.Address2 == newMaster.Address2) &&
                (!("cell_phone" in newMaster) || masterRecord.cell_phone == newMaster.cell_phone) &&
                (!("ssn" in newMaster) || masterRecord.ssn == newMaster.ssn) &&
                (!("fbi_no" in newMaster) || masterRecord.fbi_no == newMaster.fbi_no) &&
                (!("control_no" in newMaster) || masterRecord.control_no == newMaster.control_no) &&
                (!("date_of_birth" in newMaster) || masterRecord.date_of_birth == newMaster.date_of_birth)
              ) {
                let isUpdated = false;
                for (const master_field of updatableMasterNameFields) {
                  if (master_field in newMaster) {
                    if (masterRecord[master_field] != newMaster[master_field]) {
                      await db.query(
                        `UPDATE sna.master_name SET ${master_field} =? WHERE active IS NULL AND master_name_id=?`,
                        [newMaster[master_field], master_name_id]
                      );
                      isUpdated = true;
                    }
                  }
                }
                if (isUpdated) {
                  await db.query(
                    `UPDATE sna.master_name SET edited_date=?, edited_by = ? WHERE active IS NULL AND master_name_id=?`,
                    [new Date(), editedBy, master_name_id]
                  );
                }
              } else {
                const oldRecord = (
                  await db.query(`SELECT * FROM sna.master_name WHERE active IS NULL And master_name_id=?`, [
                    master_name_id,
                  ])
                )[0];

                await db.query("UPDATE sna.master_name SET active=0 WHERE active is null AND master_name_id=?", [
                  master_name_id,
                ]);

                const fields = [];
                const values = [];

                for (const key in oldRecord) {
                  if (key === "id") {
                    continue;
                  }

                  if (key === "formatted_dob") {
                    continue;
                  }

                  if (key === "formatted_cell") {
                    continue;
                  }

                  if (key === "master_search") {
                    continue;
                  }

                  fields.push(key);

                  if (key in newMaster) {
                    values.push(newMaster[key]);
                  } else {
                    if (key == "created_date") {
                      values.push(new Date());
                    } else if (key == "edited_date") {
                      values.push(new Date());
                    } else if (key == "record_seq_no") {
                      values.push(1);
                    } else if (key == "user") {
                      values.push(user);
                    } else if (key == "edited_by") {
                      values.push(editedBy);
                    } else if (key == "department") {
                      values.push(departmentName);
                    } else {
                      values.push(oldRecord[key]);
                    }
                  }
                }

                const parameters = [];

                const addedFields = fields.join(",");
                const valueFields = fields
                  .map((field, i) => {
                    if (field == "ssn" && field in newMaster) {
                      return `AES_ENCRYPT(${db.escape(values[i])}, UNHEX(SHA2('${process.env.ssn_password}',512)))`;
                    } else {
                      parameters.push(values[i]);
                      return "?";
                    }
                  })
                  .join(",");

                const insertQuery = `INSERT INTO sna.master_name (${addedFields}) VALUES (${valueFields})`;

                await db.query(insertQuery, parameters);
              }
            }
          }
        }
      }

      if (vehicle_id) {
        const newMaster = this.parseMasterVehicleFields(page, req);

        if (newMaster) {
          for (const key in newMaster) {
            newMaster[key] = newMaster[key] || null;
          }

          if (newMaster.lp_plate_number && newMaster.lp_plate_number != "Unknown") {
            db = await this.pool.getConnection();

            const selectFields = updatableMasterVehicleFields.join(",");

            const masterRecords = await db.query(
              `SELECT ${selectFields} FROM sna.vehicle WHERE current_status IS NULL And vehicle_id=?`,
              [vehicle_id]
            );

            const masterRecord = masterRecords[0];

            if (masterRecord) {
              if (
                (!("lp_state" in newMaster) || masterRecord.lp_state == newMaster.lp_state) &&
                (!("lp_plate_number" in newMaster) || masterRecord.lp_plate_number == newMaster.lp_plate_number) &&
                (!("lp_VIN" in newMaster) || masterRecord.lp_VIN == newMaster.lp_VIN) &&
                (!("vehicle_year" in newMaster) || masterRecord.vehicle_year == newMaster.vehicle_year) &&
                (!("vehicle_make" in newMaster) || masterRecord.vehicle_make == newMaster.vehicle_make) &&
                (!("vehicle_color" in newMaster) || masterRecord.vehicle_color == newMaster.vehicle_color) &&
                (!("vehicle_model" in newMaster) || masterRecord.vehicle_model == newMaster.vehicle_model) &&
                (!("towed_address" in newMaster) || masterRecord.towed_address == newMaster.towed_address) &&
                (!("towed_by" in newMaster) || masterRecord.towed_by == newMaster.towed_by)
              ) {
                let isUpdated = false;
                for (const master_field of updatableMasterVehicleFields) {
                  if (master_field in newMaster) {
                    if (masterRecord[master_field] != newMaster[master_field]) {
                      await db.query(
                        `UPDATE sna.vehicle SET ${master_field} =? WHERE current_status IS NULL AND vehicle_id=?`,
                        [newMaster[master_field], vehicle_id]
                      );
                      isUpdated = true;
                    }
                  }
                }

                if (isUpdated) {
                  await db.query(
                    `UPDATE sna.vehicle SET edited_date=?, edited_by = ? WHERE current_status IS NULL AND vehicle_id=?`,
                    [new Date(), editedBy, vehicle_id]
                  );
                }
              } else {
                const oldRecord = (
                  await db.query(`SELECT * FROM sna.vehicle WHERE current_status IS NULL And vehicle_id=?`, [
                    vehicle_id,
                  ])
                )[0];

                await db.query(
                  "UPDATE sna.vehicle SET current_status=0 WHERE current_status IS NULL AND vehicle_id=?",
                  [vehicle_id]
                );

                const fields = [];
                const values = [];

                for (const key in oldRecord) {
                  if (key == "id") {
                    continue;
                  }

                  if (key === "master_search") {
                    continue;
                  }

                  fields.push(key);

                  if (key in newMaster) {
                    values.push(newMaster[key]);
                  } else {
                    if (key == "created_date") {
                      values.push(new Date());
                    } else if (key == "edited_date") {
                      values.push(new Date());
                    } else if (key == "user") {
                      values.push(user);
                    } else if (key == "edited_by") {
                      values.push(editedBy);
                    } else if (key == "department") {
                      values.push(departmentName);
                    } else {
                      values.push(oldRecord[key]);
                    }
                  }
                }

                const parameters = [];

                const addedFields = fields.join(",");
                const valueFields = fields
                  .map((field, i) => {
                    parameters.push(values[i]);
                    return "?";
                  })
                  .join(",");

                const insertQuery = `INSERT INTO sna.vehicle (${addedFields}) VALUES (${valueFields})`;

                await db.query(insertQuery, parameters);
              }
            }
          }
        }
      }
    } catch (err) {
      globalThis.logger.error(err);
      if (err.sqlMessage) {
        errors.push("Master card update failed: " + err.sqlMessage + "--" + err.sql);
      } else {
        errors.push("Master card update failed: " + err.message);
      }
    } finally {
      if (db) {
        db.release();
      }
    }

    return errors;
  }

  parseMasterNameFields(page, req) {
    const result = {};
    if (page == "arrest" || page == "arrest_non" || page == "fir" || page == "suspect") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;
        if (field == "date_of_birth") {
          mappedField = "dob";
        } else if (field == "Address2") {
          mappedField = "interviewed_adress";
        } else if (field == "cell_phone") {
          mappedField = "cell";
        } else if (field == "fbi_no") {
          mappedField = "fbi";
        } else if (field == "control_no") {
          mappedField = "control";
        } else if (field == "hair_color") {
          mappedField = "hair";
        } else if (field == "eye_color") {
          mappedField = "eye";
        } else if (field == "scars_marks") {
          mappedField = "scars";
        } else if (field == "resident_status") {
          mappedField = "resident";
        } else if (field == "additional_descriptives") {
          mappedField = "additional_descriptions1";
        } else if (field == "other_tell") {
          mappedField = "other_tel";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "PointX") {
          mappedField = "lng2";
        } else if (field == "PointY") {
          mappedField = "lat2";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }

      return result;
    } else if (page == "traffic_citation") {
      for (const field of updatableMasterNameFields) {
        let mappedField;

        if (field == "date_of_birth") {
          mappedField = "dob";
        } else if (field == "first_name") {
          mappedField = "first_name";
        } else if (field == "last_name") {
          mappedField = "last_name";
        } else if (field == "middle_name") {
          mappedField = "middle_name";
        } else if (field == "sex") {
          mappedField = "sex";
        } else if (field == "race") {
          mappedField = "race";
        } else if (field == "cell_phone") {
          mappedField = "owner_phone";
        } else if (field == "suffix") {
          mappedField = "suffix";
        } else if (field == "driving_lic_no") {
          mappedField = "driving_license_no";
        } else if (field == "issued_date") {
          mappedField = "issue_date";
        } else if (field == "issue_state") {
          mappedField = "issue_state";
        } else if (field == "driver_license_class") {
          mappedField = "class1";
        } else if (field == "expiration_date") {
          mappedField = "expire";
        } else if (field == "control_no") {
          mappedField = "control_no";
        } else if (field == "ssn") {
          mappedField = "ssn";
        }

        if (mappedField) {
          if (mappedField in req.body) {
            result[field] = req.body[mappedField];
          }
        }
      }

      return result;
    } else if (page == "traffic_citation_witness") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "witness_dob";
        } else if (field == "first_name") {
          mappedField = "witness_first_name";
        } else if (field == "last_name") {
          mappedField = "witness_last_name";
        } else if (field == "middle_name") {
          mappedField = "witness_middle_name";
        } else if (field == "sex") {
          mappedField = "witness_sex";
        } else if (field == "race") {
          mappedField = "witness_race";
        } else if (field == "cell_phone") {
          mappedField = "witness_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "witness_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "witness_employer_phone";
        } else if (field == "employer") {
          mappedField = "witness_employer";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "traffic_unit") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "dob";
        } else if (field == "Address2") {
          mappedField = "owner_address";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "PointX") {
          mappedField = "owner_lng";
        } else if (field == "PointY") {
          mappedField = "owner_lat";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "cell_phone") {
          mappedField = "owner_phone";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "traffic_person") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "dob";
        } else if (field == "Address2") {
          mappedField = "owner_address";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "PointX") {
          mappedField = "owner_lng";
        } else if (field == "PointY") {
          mappedField = "owner_lat";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd2";
        } else if (field == "cell_phone") {
          mappedField = "person_phone";
        } else if (field == "driving_lic_no") {
          mappedField = "driving_no";
        } else if (field == "issue_state") {
          mappedField = "lp_state";
        } else if (field == "driver_license_class") {
          mappedField = "class1";
        }

        if (mappedField in req.body) {
          let fieldData = req.body[mappedField];

          if (mappedField === "class1") {
            fieldData = transformDriverLicenseClass(fieldData);

            if (!fieldData && req.body[mappedField]) {
              continue;
            }
          }

          result[field] = fieldData;
        }
      }
      return result;
    } else if (page == "permit") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "reportee_dob";
        } else if (field == "first_name") {
          mappedField = "reportee_first_name";
        } else if (field == "last_name") {
          mappedField = "reportee_last_name";
        } else if (field == "middle_name") {
          mappedField = "reportee_middle_name";
        } else if (field == "sex") {
          mappedField = "reportee_sex";
        } else if (field == "race") {
          mappedField = "reportee_race";
        } else if (field == "cell_phone") {
          mappedField = "reportee_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "reportee_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "reportee_employer_phone";
        } else if (field == "employer") {
          mappedField = "reportee_employer";
        } else if (field == "Address2") {
          mappedField = "reportee_victim_address";
        } else if (field == "Address") {
          mappedField = "addrs3";
        } else if (field == "City") {
          mappedField = "city3";
        } else if (field == "County") {
          mappedField = "county3";
        } else if (field == "PointX") {
          mappedField = "lng";
        } else if (field == "PointY") {
          mappedField = "lat";
        } else if (field == "State") {
          mappedField = "state3";
        } else if (field == "zip_code") {
          mappedField = "zip3";
        } else if (field == "Country") {
          mappedField = "country3";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd3";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "daily_log") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "reportee_dob";
        } else if (field == "first_name") {
          mappedField = "reportee_first_name";
        } else if (field == "last_name") {
          mappedField = "reportee_last_name";
        } else if (field == "middle_name") {
          mappedField = "reportee_middle_name";
        } else if (field == "sex") {
          mappedField = "reportee_sex";
        } else if (field == "race") {
          mappedField = "reportee_race";
        } else if (field == "cell_phone") {
          mappedField = "reportee_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "reportee_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "reportee_employer_phone";
        } else if (field == "employer") {
          mappedField = "reportee_employer";
        } else if (field == "Address2") {
          mappedField = "reportee_victim_address";
        } else if (field == "Address") {
          mappedField = "addrs3";
        } else if (field == "City") {
          mappedField = "city3";
        } else if (field == "County") {
          mappedField = "county3";
        } else if (field == "PointX") {
          mappedField = "lng3";
        } else if (field == "PointY") {
          mappedField = "lat3";
        } else if (field == "State") {
          mappedField = "state3";
        } else if (field == "zip_code") {
          mappedField = "zip3";
        } else if (field == "Country") {
          mappedField = "country3";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd3";
        } else if (field == "apt_no") {
          mappedField = "apt_no_person";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "evidence") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "reportee_dob";
        } else if (field == "first_name") {
          mappedField = "reportee_first_name";
        } else if (field == "last_name") {
          mappedField = "reportee_last_name";
        } else if (field == "middle_name") {
          mappedField = "reportee_middle_name";
        } else if (field == "sex") {
          mappedField = "reportee_sex";
        } else if (field == "race") {
          mappedField = "reportee_race";
        } else if (field == "cell_phone") {
          mappedField = "reportee_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "reportee_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "reportee_employer_phone";
        } else if (field == "employer") {
          mappedField = "reportee_employer";
        } else if (field == "Address2") {
          mappedField = "reportee_victim_address";
        } else if (field == "Address") {
          mappedField = "addrs3";
        } else if (field == "City") {
          mappedField = "city3";
        } else if (field == "County") {
          mappedField = "county3";
        } else if (field == "PointX") {
          mappedField = "lng3";
        } else if (field == "PointY") {
          mappedField = "lat3";
        } else if (field == "State") {
          mappedField = "state3";
        } else if (field == "zip_code") {
          mappedField = "zip3";
        } else if (field == "Country") {
          mappedField = "country3";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd3";
        } else if (field == "apt_no") {
          mappedField = "apt_no_person";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "property") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "owner_dob";
        } else if (field == "first_name") {
          mappedField = "owner_first_name";
        } else if (field == "last_name") {
          mappedField = "owner_last_name";
        } else if (field == "middle_name") {
          mappedField = "owner_middle_name";
        } else if (field == "sex") {
          mappedField = "owner_sex";
        } else if (field == "race") {
          mappedField = "owner_race";
        } else if (field == "cell_phone") {
          mappedField = "owner_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "owner_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "owner_employer_phone";
        } else if (field == "employer") {
          mappedField = "owner_employer";
        } else if (field == "Address2") {
          mappedField = "owner_victim_address";
        } else if (field == "Address") {
          mappedField = "addrs3";
        } else if (field == "City") {
          mappedField = "city3";
        } else if (field == "County") {
          mappedField = "county3";
        } else if (field == "PointX") {
          mappedField = "lng3";
        } else if (field == "PointY") {
          mappedField = "lat3";
        } else if (field == "State") {
          mappedField = "state3";
        } else if (field == "zip_code") {
          mappedField = "zip3";
        } else if (field == "Country") {
          mappedField = "country3";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd3";
        } else if (field == "apt_no") {
          mappedField = "apt_no_person";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "reportee" || page == "daily_logs_person") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "reportee_dob";
        } else if (field == "first_name") {
          mappedField = "reportee_first_name";
        } else if (field == "last_name") {
          mappedField = "reportee_last_name";
        } else if (field == "middle_name") {
          mappedField = "reportee_middle_name";
        } else if (field == "sex") {
          mappedField = "reportee_sex";
        } else if (field == "race") {
          mappedField = "reportee_race";
        } else if (field == "cell_phone") {
          mappedField = "reportee_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "reportee_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "reportee_employer_phone";
        } else if (field == "employer") {
          mappedField = "reportee_employer";
        } else if (field == "Address2") {
          mappedField = "reportee_victim_address";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "PointX") {
          mappedField = "lng2";
        } else if (field == "PointY") {
          mappedField = "lat2";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd2";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "witness") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "witness_dob";
        } else if (field == "first_name") {
          mappedField = "witness_first_name";
        } else if (field == "last_name") {
          mappedField = "witness_last_name";
        } else if (field == "middle_name") {
          mappedField = "witness_middle_name";
        } else if (field == "sex") {
          mappedField = "witness_sex";
        } else if (field == "race") {
          mappedField = "witness_race";
        } else if (field == "cell_phone") {
          mappedField = "witness_victim_phone";
        } else if (field == "employer_address") {
          mappedField = "witness_employer_address";
        } else if (field == "employer_phone") {
          mappedField = "witness_employer_phone";
        } else if (field == "employer") {
          mappedField = "witness_employer";
        } else if (field == "Address2") {
          mappedField = "witness_victim_address";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "PointX") {
          mappedField = "lng2";
        } else if (field == "PointY") {
          mappedField = "lat2";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd2";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "victim") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "dob";
        } else if (field == "cell_phone") {
          mappedField = "victim_phone";
        } else if (field == "Address2") {
          mappedField = "victim_address";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "PointX") {
          mappedField = "lng2";
        } else if (field == "PointY") {
          mappedField = "lat2";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd2";
        } else if (field == "resident_status") {
          mappedField = "resident";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "uof") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "dob";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "vehicle_master") {
      for (const field of updatableMasterNameFields) {
        let mappedField = field;

        if (field == "date_of_birth") {
          mappedField = "dob";
        } else if (field == "cell_phone") {
          mappedField = "owner_phone";
        } else if (field == "Address2") {
          mappedField = "owner_address";
        } else if (field == "Address") {
          mappedField = "addrs2";
        } else if (field == "City") {
          mappedField = "city2";
        } else if (field == "County") {
          mappedField = "county2";
        } else if (field == "PointX") {
          mappedField = "owner_lng";
        } else if (field == "PointY") {
          mappedField = "owner_lat";
        } else if (field == "State") {
          mappedField = "state2";
        } else if (field == "zip_code") {
          mappedField = "zip2";
        } else if (field == "Country") {
          mappedField = "country2";
        } else if (field == "Neighborhood") {
          mappedField = "nghbd2";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (page == "rcic") {
      for (const field of updatableMasterNameFields) {
        const mappedField = field;

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    }

    return null;
  }

  parseMasterVehicleFields(page, req) {
    const result = {};
    if (page == "arrest" || page == "arrest_non" || page == "traffic_citation") {
      for (const field of updatableMasterVehicleFields) {
        let mappedField = field;

        if (field == "lp_plate_number") {
          mappedField = "lp_no";
        } else if (field == "lp_VIN") {
          mappedField = "vin";
        } else if (field == "vehicle_year") {
          mappedField = "veh_year";
        } else if (field == "vehicle_make") {
          mappedField = "veh_make";
        } else if (field == "insurance_verified") {
          mappedField = "insurance";
        } else if (field == "insurance_company") {
          mappedField = "in_company";
        } else if (field == "insurance_policy_no") {
          mappedField = "in_number";
        } else if (field == "vehicle_color") {
          mappedField = "color";
        } else if (field == "vehicle_model") {
          mappedField = "veh_model";
        } else if (field == "vehicle_defects") {
          mappedField = "veh_defects";
        } else if (field == "US_DOT_no") {
          mappedField = "us_dot";
        } else if (field == "vehicle_weight") {
          mappedField = "veh_weight";
        } else if (field == "hazadous_material") {
          mappedField = "hazardous";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }

      return result;
    } else if (page == "traffic_unit") {
      for (const field of updatableMasterVehicleFields) {
        let mappedField = field;

        if (field == "lp_plate_number") {
          mappedField = "lp_no";
        } else if (field == "lp_VIN") {
          mappedField = "vin";
        } else if (field == "vehicle_year") {
          mappedField = "veh_year";
        } else if (field == "vehicle_make") {
          mappedField = "veh_make";
        } else if (field == "insurance_verified") {
          mappedField = "insurance";
        } else if (field == "insurance_company") {
          mappedField = "in_company";
        } else if (field == "insurance_policy_no") {
          mappedField = "in_number";
        } else if (field == "vehicle_color") {
          mappedField = "color";
        } else if (field == "vehicle_model") {
          mappedField = "veh_model";
        } else if (field == "vehicle_defects") {
          mappedField = "veh_defects";
        } else if (field == "US_DOT_no") {
          mappedField = "us_dot";
        } else if (field == "vehicle_weight") {
          mappedField = "veh_weight";
        } else if (field == "owner_first_name") {
          mappedField = "first_name";
        } else if (field == "owner_last_name") {
          mappedField = "last_name";
        } else if (field == "owner_middle_name") {
          mappedField = "middle_name";
        } else if (field == "owner_dob") {
          mappedField = "dob";
        } else if (field == "owner_sex") {
          mappedField = "sex";
        } else if (field == "owner_race") {
          mappedField = "race";
        } else if (field == "type_of_use") {
          mappedField = "type_use";
        } else if (field == "interlock_equipped_device") {
          mappedField = "interlock";
        } else if (field == "hazadous_material") {
          mappedField = "hazardous";
        } else if (field == "class_no") {
          mappedField = "class1";
        } else if (field == "placard_id") {
          mappedField = "placard";
        } else if (field == "number_of_trailing_units") {
          mappedField = "trailing";
        } else if (field == "autonomous_level") {
          mappedField = "autonomous_mode";
        } else if (field == "special_function_level") {
          mappedField = "special";
        } else if (field == "cargo_body_type") {
          mappedField = "cargo_body";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }
      return result;
    } else if (
      page == "permit" ||
      page == "daily_log" ||
      page == "fir" ||
      page == "suspect" ||
      page == "vehicle" ||
      page == "daily_logs_vehicle" ||
      page == "tow"
    ) {
      for (const field of updatableMasterVehicleFields) {
        let mappedField = field;

        if (field == "lp_plate_number") {
          mappedField = "lp_no";
        } else if (field == "lp_VIN") {
          mappedField = "vin";
        } else if (field == "vehicle_year") {
          mappedField = "veh_year";
        } else if (field == "vehicle_make") {
          mappedField = "veh_make";
        } else if (field == "insurance_verified") {
          mappedField = "insurance";
        } else if (field == "insurance_company") {
          mappedField = "in_company";
        } else if (field == "insurance_policy_no") {
          mappedField = "in_number";
        } else if (field == "vehicle_color") {
          mappedField = "color";
        } else if (field == "vehicle_model") {
          mappedField = "veh_model";
        } else if (field == "vehicle_defects") {
          mappedField = "veh_defects";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }

      return result;
    } else if (page == "evidence" || page == "property") {
      for (const field of updatableMasterVehicleFields) {
        let mappedField = field;

        if (field == "lp_plate_number") {
          mappedField = "plate";
        } else if (field == "lp_state") {
          mappedField = "register";
        } else if (field == "lp_VIN") {
          mappedField = "vehicle_VIN";
        } else if (field == "vehicle_year") {
          mappedField = "veh_year";
        } else if (field == "vehicle_make") {
          mappedField = "make";
        } else if (field == "vehicle_color") {
          mappedField = "color";
        } else if (field == "vehicle_model") {
          mappedField = "model";
        } else if (field == "register_year") {
          mappedField = "reg_year";
        }

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }

      return result;
    } else if (page == "rcic") {
      for (const field of updatableMasterVehicleFields) {
        const mappedField = field;

        if (mappedField in req.body) {
          result[field] = req.body[mappedField];
        }
      }

      return result;
    }

    return null;
  }
}

module.exports = UpdateMaster;
