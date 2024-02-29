const convert = require("xml-js");
const helpers = require("./helper");
const { findGeocode } = require("./find-geocode");
const soapRequest = require("easy-soap-request");
const { getPools } = require("./database");
const { sendEmail } = require("./send-mail");
const UpdateMaster = require("./update-master");
const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const SqlHelper = require("./sql");
const { SuccessResult, ErrorResult } = require("./result");

const URL = "https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/API.asmx";

class Rcic {
  constructor() {
    this.instanceId = crypto.randomUUID();
  }

  async isProcessing() {
    const { pool } = getPools("sna");

    const result = await SqlHelper.runSql(
      pool,
      `SELECT is_processing 
      FROM sna.rcic 
      WHERE 
        is_processing = 1 
        AND 
        DATE_ADD(last_processing_time, INTERVAL 30 SECOND) > NOW()
      LIMIT 1`
    );

    if (!result.status) {
      throw new Error("Checking rcic processing failed");
    }

    return result.data.length > 0;
  }

  async setProcessing(isProcessing, updateLastUpdateTime) {
    const { pool } = getPools("sna");

    let db;
    try {
      db = await pool.getConnection();

      await db.query("LOCK TABLE sna.rcic WRITE");

      let sql = "UPDATE sna.rcic SET is_processing = ?";
      const params = [isProcessing];

      if (updateLastUpdateTime) {
        sql += `, last_update_time = NOW()`;
        params.push(updateLastUpdateTime);
      }

      if (isProcessing) {
        sql += `, last_processing_time = NOW()`;
      }

      await db.query(sql, params);

      await db.query("UNLOCK TABLES");

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("Setting rcic processing failed. Error: " + err.message);
      return new ErrorResult("Setting rcic processing failed. Error: " + err.message, err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async check() {
    if (this.checkingRCIC) {
      return;
    }

    this.checkingRCIC = true;

    let body;
    try {
      //Checking from database if rcic is running
      if (await this.isProcessing()) {
        return;
      }

      const settingIsProcessingResult = await this.setProcessing(true);

      if (!settingIsProcessingResult.status) {
        throw new Error(settingIsProcessingResult.message);
      }

      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
      const data = await this.fetchData();

      if (!data) {
        return;
      }

      const { fetchId } = data;
      body = data.body;

      if (fetchId > 0) {
        this.fetchId = fetchId;

        this.logAndSaveXml(body);

        const atLeastOneEntryisSuccesful = await this.processEntries(body);

        if (atLeastOneEntryisSuccesful) {
          await this.sendACK(fetchId);

          await this.setProcessing(false, true);

          globalThis.logger.info("Processing RCIC is successful");
        } else {
          await this.setProcessing(false);
        }
      }
    } catch (err) {
      globalThis.logger.error(err);

      await this.setProcessing(false);

      if (err.message !== "timeout of 10000ms exceeded") {
        sendEmail({
          to: "bselvan@gmail.com",
          subject: "RCIC General Error",
          body: `
          ${JSON.stringify(err)}
  
          ${body}
          `,
        })
          .then(() => {
            globalThis.logger.info("Sending rcic error via mail is successful");
          })
          .catch((mailError) => {
            globalThis.logger.error("Sending rcic error via mail failed. Error:" + mailError.error.message);
          });
      }
    } finally {
      this.checkingRCIC = false;
      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = null;
    }
  }

  async fetchData() {
    const xml = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><h:ClearSoapHeader xmlns:h="https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/" xmlns="https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Username>ClearPeel9Access</Username><Password>^nUh-C4s6%kC%?3-</Password></h:ClearSoapHeader></s:Header><s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><GetRms xmlns="https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/"><Parameters/></GetRms></s:Body></s:Envelope>`;

    const getRmsHeaders = {
      POST: "https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/API.asmx HTTP/1.1",
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/GetRms",
      Host: "clearwebservice.clear-rcic.rcc.org",
      "Content-Length": `${xml.length}`,
      Expect: "100-continue",
      "Accept-Encoding": "gzip, deflate",
      Connection: "Keep-Alive",
    };

    const { response } = await soapRequest({
      rejectUnauthorized: false,
      url: URL,
      headers: getRmsHeaders,
      method: "POST",
      xml: xml,
      timeout: 10000,
    });

    const { body } = response;

    const fetchId = /<FetchId>(.*)<\/FetchId>/i.exec(body)?.at(1);

    return {
      body,
      fetchId,
    };
  }

  async processEntry(entry) {
    const { pool } = getPools("sna");

    const updateMaster = new UpdateMaster();

    let db, dbVehicle;

    try {
      let vehicle, license, person;
      const rcicUnit = entry.attributes.Unit;
      const controlNo = entry.attributes.CtlNo;

      for (const elem of entry.elements) {
        if (elem.name === "Vehicle") {
          vehicle = {
            lp_state: elem.attributes.PlateState,
            lp_plate_number: elem.attributes.PlateNum,
            lp_VIN: elem.attributes.VIN,
            vehicle_year: elem.attributes.DescYear,
            vehicle_make: elem.attributes.DescMake,
            vehicle_color: helpers.findVehicleColorCode(elem.attributes.DescColor),
            vehicle_model: elem.attributes.DescModel,
            register_year: elem.attributes.PlateYear,
            rcic_unit: rcicUnit,
          };
        }

        if (elem.name === "License") {
          license = {
            driving_lic_no: elem.attributes.OLN,
            issued_date: elem.attributes.IssDate,
            issue_state: elem.attributes.State,
            driver_license_class: elem.attributes.Class,
            expiration_date: elem.attributes.ExpDate,
          };
        }

        if (elem.name === "Person") {
          let first_name, last_name, middle_name, suffix, City, County, PointX, PointY, State, zip_code, Country;

          if (elem.attributes.Name) {
            const splits = elem.attributes.Name.trim().split(" ");

            first_name = splits.shift();
            last_name = splits.pop();

            if (
              ["JUNIOR", "JR", "JR.", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"].includes(
                last_name?.toUpperCase()
              )
            ) {
              suffix = last_name;
              last_name = splits.pop();
            }

            middle_name = splits.join(" ");
          }

          if (elem.attributes.AddrLine1 && elem.attributes.AddrLocale) {
            const address2 = elem.attributes.AddrLine1 + " " + elem.attributes.AddrLocale;

            const geocodeResult = await findGeocode(address2);

            if (geocodeResult.status) {
              City = geocodeResult.data.City;
              County = geocodeResult.data.County;
              State = geocodeResult.data.State;
              Country = geocodeResult.data.Country;
              zip_code = geocodeResult.data.ZipCode;
              PointX = geocodeResult.data.PointX;
              PointY = geocodeResult.data.PointY;
            } else {
              if (geocodeResult.error.message !== "Not found") {
                globalThis.logger.warn("geocode error: " + address2 + " Message: " + geocodeResult.error.message);
              }
            }
          }

          person = {};

          if (elem.attributes.BirthDate) {
            person.date_of_birth = elem.attributes.BirthDate;
          }

          if (first_name) {
            person.first_name = first_name;
          }

          if (last_name) {
            person.last_name = last_name;
          }

          if (middle_name) {
            person.middle_name = middle_name;
          }

          if (suffix) {
            person.suffix = suffix;
          }

          if (elem.attributes.Sex) {
            person.sex = elem.attributes.Sex;
          }

          if (elem.attributes.Race) {
            person.race = elem.attributes.Race;
          }

          if (elem.attributes.AddrLine1 && elem.attributes.AddrLocale) {
            person.Address2 = elem.attributes.AddrLine1 + " " + elem.attributes.AddrLocale;
          }

          if (elem.attributes.AddrLine1) {
            person.Address = elem.attributes.AddrLine1;
          }

          if (elem.attributes.HairColor) {
            person.hair_color = helpers.findHairColorCode(elem.attributes.HairColor);
          }

          if (elem.attributes.EyeColor) {
            person.eye_color = helpers.findEyeColorCode(elem.attributes.EyeColor);
          }

          if (elem.attributes.Height) {
            person.height = elem.attributes.Height;
          }

          if (elem.attributes.Weight) {
            person.weight = elem.attributes.Weight;
          }

          if (elem.attributes.SSN) {
            person.ssn = elem.attributes.SSN;
          }

          if (City) {
            person.City = City;
          }

          if (County) {
            person.County = County;
          }

          if (PointX) {
            person.PointX = PointX;
          }

          if (PointY) {
            person.PointY = PointY;
          }

          if (State) {
            person.State = State;
          }

          if (zip_code) {
            person.zip_code = zip_code;
          }

          if (Country) {
            person.Country = Country;
          }

          if (controlNo) {
            person.control_no = controlNo;
          }

          person.rcic_unit = rcicUnit;
        }
      }

      db = await pool.getConnection();

      if (person) {
        person = { ...person, ...license };

        let foundMasterName;

        if (person.ssn) {
          [foundMasterName] = await db.query(
            `
              SELECT
                  id, 
                  master_name_id
              FROM sna.master_name
              WHERE
                  deleted IS NULL
                  AND
                  active IS NULL
                  AND
                  REPLACE(CAST(AES_DECRYPT(ssn,UNHEX(SHA2('${process.env.ssn_password}',512))) AS CHAR),'-','') = ?
            `,
            [person.ssn]
          );
        }

        if (!foundMasterName && person.last_name && person.first_name && person.date_of_birth) {
          const matchedMasterNames = await db.query(
            `
              SELECT
                  id, 
                  master_name_id,
                  RIGHT(REPLACE(CAST(AES_DECRYPT(ssn,UNHEX(SHA2('${process.env.ssn_password}',512))) AS CHAR),'-',''),4) as ssn,
                  driving_lic_no,
                  middle_name,
                  sex
              FROM sna.master_name
              WHERE
                  deleted IS NULL
                  AND
                  active IS NULL
                  AND
                  first_name = ?
                  AND
                  last_name = ?
                  AND
                  date_of_birth = ?
        `,
            [person.first_name, person.last_name, person.date_of_birth]
          );

          for (const matchedMasterName of matchedMasterNames) {
            let isConflictExist = false;

            if (person.ssn && matchedMasterName.ssn) {
              if (person.ssn.slice(-4).toLowerCase() !== matchedMasterName.ssn.toLowerCase()) {
                isConflictExist = true;
                continue;
              }
            }

            if (person.middle_name && matchedMasterName.middle_name) {
              if (
                person.middle_name.substr(0, 1).toLowerCase() !==
                matchedMasterName.middle_name.substr(0, 1).toLowerCase()
              ) {
                isConflictExist = true;
                continue;
              }
            }

            if (!isConflictExist) {
              foundMasterName = matchedMasterName;
              break;
            }
          }
        }

        if (foundMasterName) {
          person.master_name_id = foundMasterName.master_name_id;
          person.id = foundMasterName.id;
          await updateMaster.update("rcic", { body: person });
        } else {
          if (!person.first_name || !person.last_name || !person.date_of_birth) {
            return;
          }

          const records = [
            person.first_name,
            person.middle_name,
            person.last_name,
            person.suffix,
            person.date_of_birth,
            person.sex,
            person.race,
            person.hair_color,
            person.eye_color,
            person.height,
            person.weight,
            person.control_no,
            new Date(),
            1,
            new Date(),
            person.Address2,
            person.Address,
            "RCIC",
            person.driving_lic_no,
            person.issued_date,
            person.expiration_date,
            person.issue_state,
            person.driver_license_class,
            "RCIC",
            person.City,
            person.County,
            person.PointX,
            person.PointY,
            person.State,
            person.zip_code,
            person.Country,
            "RCIC",
            person.rcic_unit,
            `Server : ${process.env.server_no || "localhost"}, FetchID: ${this.fetchId}, InstanceId : ${
              this.instanceId
            }`,
          ];

          const row = await db.query(
            `INSERT INTO sna.master_name 
            (
              ssn, 
              first_name, 
              middle_name, 
              last_name, 
              suffix, 
              date_of_birth, 
              sex, 
              race, 
              hair_color, 
              eye_color, 
              height, 
              weight, 
              control_no,
              created_date, 
              record_seq_no, 
              edited_date, 
              Address2, 
              Address, 
              department, 
              driving_lic_no, 
              issued_date, 
              expiration_date, 
              issue_state, 
              driver_license_class, 
              added_by,
              City,
              County,
              PointX,
              PointY,
              State,
              zip_code,
              Country,
              user,
              edited_by,
              picture1 
            ) 
            values (AES_ENCRYPT("${person.ssn}", UNHEX(SHA2("${process.env.ssn_password}",512))), ?)`,
            [records]
          );

          const masterNameID = "RCIC" + row.insertId;

          person.master_name_id = masterNameID;
          person.id = row.insertId;

          await db.query("update sna.master_name set master_name_id=? where id=?", [masterNameID, row.insertId]);
        }
      }

      if (vehicle) {
        dbVehicle = await pool.getConnection();

        if (person && person.id) {
          const vehicleOwner = (await dbVehicle.query("SELECT * FROM sna.master_name WHERE id= ?", [person.id]))[0];

          vehicle.owner_first_name = vehicleOwner.first_name;
          vehicle.owner_middle_name = vehicleOwner.middle_name;
          vehicle.owner_last_name = vehicleOwner.last_name;
          vehicle.suffix = vehicleOwner.suffix;
          vehicle.owner_dob = vehicleOwner.date_of_birth;
          vehicle.owner_sex = vehicleOwner.sex;
          vehicle.owner_race = vehicleOwner.race;
          vehicle.owner_address = vehicleOwner.Address2;
          vehicle.owner_address_short = vehicleOwner.Address;
          vehicle.owner_neighborhood = vehicleOwner.Neighborhood;
          vehicle.owner_city = vehicleOwner.City;
          vehicle.owner_county = vehicleOwner.County;
          vehicle.owner_state = vehicleOwner.State;
          vehicle.owner_zip_code = vehicleOwner.zip_code;
          vehicle.owner_country = vehicleOwner.Country;
          vehicle.owner_lat = vehicleOwner.PointX;
          vehicle.owner_lng = vehicleOwner.PointY;
          vehicle.apt_no = vehicleOwner.apt_no;
          vehicle.owner_phone = vehicleOwner.cell_phone;
          vehicle.master_name_id = vehicleOwner.master_name_id;
        }

        const foundMasterVehicle = (
          await dbVehicle.query(
            `
          SELECT
              id, 
              vehicle_id
          FROM sna.vehicle
          WHERE
              deleted IS NULL
              AND
              current_status IS NULL
              AND
              (
                  lp_plate_number = ?
                  OR
                  lp_VIN = ?
              )
          `,
            [vehicle.lp_plate_number, vehicle.lp_VIN]
          )
        )[0];

        if (foundMasterVehicle) {
          vehicle.vehicle_id = foundMasterVehicle.vehicle_id;
          await updateMaster.update("rcic", { body: vehicle });
        } else {
          const records = [
            new Date(),
            vehicle.rcic_unit,
            new Date(),
            vehicle.owner_first_name,
            vehicle.owner_middle_name,
            vehicle.owner_last_name,
            vehicle.suffix,
            vehicle.owner_dob,
            vehicle.owner_sex,
            vehicle.owner_race,
            vehicle.owner_address,
            vehicle.owner_address_short,
            vehicle.owner_neighborhood,
            vehicle.owner_city,
            vehicle.owner_county,
            vehicle.owner_state,
            vehicle.owner_zip_code,
            vehicle.owner_country,
            vehicle.owner_lat,
            vehicle.owner_lng,
            vehicle.apt_no,
            vehicle.owner_phone,
            vehicle.master_name_id,
            vehicle.lp_state,
            vehicle.lp_plate_number,
            vehicle.lp_VIN,
            vehicle.vehicle_year,
            vehicle.vehicle_make,
            vehicle.vehicle_color,
            vehicle.vehicle_model,
            "RCIC",
            vehicle.register_year,
            "Peel9",
          ];

          const row = await dbVehicle.query(
            `
              INSERT INTO sna.vehicle 
              (
                  created_date, 
                  edited_by,
                  edited_date, 
                  owner_first_name, 
                  owner_middle_name, 
                  owner_last_name, 
                  suffix, 
                  owner_dob, 
                  owner_sex, 
                  owner_race, 
                  owner_address, 
                  owner_address_short, 
                  owner_neighborhood, 
                  owner_city, 
                  owner_county, 
                  owner_state, 
                  owner_zip_code, 
                  owner_country, 
                  owner_lat, 
                  owner_lng,
                  apt_no, 
                  owner_phone, 
                  master_name_id, 
                  lp_state, 
                  lp_plate_number, 
                  lp_VIN, 
                  vehicle_year, 
                  vehicle_make, 
                  vehicle_color, 
                  vehicle_model, 
                  department, 
                  register_year,
                  user
              )
              values (?)`,
            [records]
          );

          const vehicleMasterID = "RCIC" + row.insertId;

          await dbVehicle.query("update sna.vehicle set vehicle_id=? where id=?", [vehicleMasterID, row.insertId]);
        }
      }
    } catch (err) {
      globalThis.logger.error(err);
      throw err;
    } finally {
      if (db) {
        db.release();
      }
      if (dbVehicle) {
        dbVehicle.release();
      }
    }
  }

  async sendACK(fetchId) {
    const xmlAck = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><h:ClearSoapHeader xmlns:h="https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/" xmlns="https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><Username>ClearPeel9Access</Username><Password>^nUh-C4s6%kC%?3-</Password></h:ClearSoapHeader></s:Header><s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><AckRms xmlns="https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/"><Parameters><FetchId>${fetchId}</FetchId></Parameters></AckRms></s:Body></s:Envelope>`;
    const ackHeaders = {
      POST: "https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/API.asmx HTTP/1.1",
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "https://clearwebservice.clear-rcic.rcc.org/PcmRmsInterface/AckRms",
      Host: "clearwebservice.clear-rcic.rcc.org",
      "Content-Length": `${xmlAck.length}`,
      Expect: "100-continue",
      "Accept-Encoding": "gzip, deflate",
    };

    await soapRequest({
      rejectUnauthorized: false,
      url: URL,
      headers: ackHeaders,
      method: "POST",
      xml: xmlAck,
      timeout: 10000,
    });
  }

  async processEntries(xml) {
    const xmlData = convert.xml2js(xml, { compact: false, spaces: 4 });
    const result = xmlData?.elements[0]?.elements[0]?.elements[0]?.elements[0];

    if (result?.attributes?.Success === "true") {
      const entries = result.elements[1].elements;

      if (entries) {
        let atLeastOneSuccesful = false;

        for (const entry of entries) {
          try {
            await this.processEntry(entry);
            atLeastOneSuccesful = true;
          } catch (err) {
            sendEmail({
              to: "bselvan@gmail.com",
              subject: "RCIC Entry Error",
              body: `
              ${JSON.stringify(entry)}

              ${JSON.stringify(err)}

              ${xml}
              `,
            })
              .then(() => {
                globalThis.logger.info("Sending rcic error via mail is successful");
              })
              .catch((mailError) => {
                globalThis.logger.error("Sending rcic error via mail failed. Error:" + mailError.error.message);
              });
          }
        }

        return atLeastOneSuccesful;

        // const processes = entries.map((entry) => this.processEntry(entry));

        // const entryResults = await Promise.allSettled(processes);

        // return entryResults.some((prom) => prom.status === "fulfilled");
      }
    }

    return false;
  }

  async logAndSaveXml(xml) {
    globalThis.logger.info(xml);
    const rcicFolder = path.join(__dirname, "../..", "public", "rcic");

    let rcicFolderExists = false;

    try {
      await fs.stat(rcicFolder);

      rcicFolderExists = true;
    } catch (err) {
      if (err.code === "ENOENT") {
        //directorty not found
        try {
          await fs.mkdir(rcicFolder); //Create rcic folder in public/rcic

          rcicFolderExists = true;
        } catch (err2) {
          globalThis.logger.error("Creating public/rcic folder failed: Error: " + err2.message);
        }
      } else {
        globalThis.logger.error("Creating public/rcic folder failed: Error: " + err.message);
      }
    }

    if (rcicFolderExists) {
      try {
        await fs.writeFile(path.join(rcicFolder, `${this.fetchId}.xml`), xml, "utf8");
      } catch (err) {
        globalThis.logger.error("Saving rcic xml failed: Error: " + err.message);
      }
    }
  }
}

module.exports = Rcic;
