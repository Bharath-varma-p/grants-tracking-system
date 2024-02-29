const BaseLogic = require("./base-logic");
const { getPools } = require("./database");
const { SuccessResult, ErrorResult } = require("./result");

const DEADLOCK_TRY_COUNT = 5;
const RETRY_DURATION_AFTER_DEADLOCK = 5 * 1000;

class SnaNetwork extends BaseLogic {
  constructor(department) {
    super(department, getPools("sna").pool);
  }

  async insert({
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    master_name_id,
    vehicle_id,
    master_business_id,
    linked_no,
    linked_id,
    linked_source,
    parent_no,
    parent_id,
    parent_source,
    created_date,
    edited_date,
    point_x,
    point_y,
    person_point_x,
    person_point_y,
    offense,
    address,
    date_time,
    custom_data,
    confidential,
  }) {
    let db;

    let tryCount = 0;
    let retryTime = 0;

    if (!master_name_id && !vehicle_id && !master_business_id) {
      //Traffic crash is needed for establishing link to traffic person and traffic unit's owner in cooffending network.
      //Incident is needed for establishing link to arrest, suspect in cooffending network.
      //Even if it has no master name or vehicle or business, we should add to network table
      if (
        linked_source !== "Traffic Crash" &&
        linked_source !== "Incident" &&
        linked_source !== "Daily Activity" &&
        linked_source !== "Permit"
      ) {
        return new SuccessResult();
      }
    }

    while (tryCount < DEADLOCK_TRY_COUNT) {
      try {
        await new Promise((resolve) => setTimeout(resolve, retryTime));

        db = await this.pool.getConnection();

        await db.query(
          `INSERT INTO sna.network (first_name, middle_name, last_name, date_of_birth, master_name_id, vehicle_id, master_business_id, linked_no, linked_id, linked_source, parent_no, parent_id, parent_source, created_date, edited_date, point_x, point_y, person_point_x, person_point_y, offense, address, date_time, custom_data, department, confidential) VALUES (?)`,
          [
            [
              first_name,
              middle_name,
              last_name,
              date_of_birth,
              master_name_id || null,
              vehicle_id || null,
              master_business_id || null,
              linked_no || null,
              linked_id || null,
              linked_source || null,
              parent_no || null,
              parent_id || null,
              parent_source || null,
              created_date,
              edited_date,
              point_x,
              point_y,
              person_point_x,
              person_point_y,
              offense,
              address,
              date_time,
              custom_data,
              this.department.name,
              confidential,
            ],
          ]
        );

        return new SuccessResult();
      } catch (err) {
        globalThis.logger.error(err);

        if (err.code === "ER_LOCK_DEADLOCK") {
          tryCount++;
          retryTime = RETRY_DURATION_AFTER_DEADLOCK;
          continue;
        }

        globalThis.logger.error("updating sna network failed");

        return new ErrorResult("updating sna network failed", err);
      } finally {
        if (db) {
          db.release();
        }
      }
    }

    return new ErrorResult("updating sna network failed because of deadlock");
  }

  async update({
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    master_name_id,
    vehicle_id,
    master_business_id,
    linked_no,
    linked_id,
    linked_source,
    parent_no,
    parent_id,
    parent_source,
    created_date,
    edited_date,
    point_x,
    point_y,
    person_point_x,
    person_point_y,
    offense,
    address,
    date_time,
    custom_data,
    confidential,
  }) {
    let db;

    let tryCount = 0;
    let retryTime = 0;

    if (!master_name_id && !vehicle_id && !master_business_id) {
      //Traffic crash, incident, daily logs don't contain master name or vehicle or business. But we have to keep them.
      //Because they are bridge to reach other subcomponents like traffic person. In this way we can link suspect to traffic person in cooffending network.
      if (
        linked_source !== "Traffic Crash" &&
        linked_source !== "Incident" &&
        linked_source !== "Daily Activity" &&
        linked_source !== "Permit"
      ) {
        //There is no master name or vehicle or business. The record will be deleted. We don't need it in network table.
        return await this.delete({
          linked_id,
          linked_no,
          linked_source,
        });
      }
    }

    while (tryCount < DEADLOCK_TRY_COUNT) {
      try {
        await new Promise((resolve) => setTimeout(resolve, retryTime));

        db = await this.pool.getConnection();

        let sourceType = linked_source;

        if (linked_source === "Reportee" || linked_source === "Involved Individual") {
          sourceType = ["Reportee", "Involved Individual"];
        }

        const updateResult = await db.query(
          `UPDATE sna.network SET first_name = ?, middle_name = ?, last_name = ?, date_of_birth = ?, master_name_id = ?, vehicle_id = ?, master_business_id = ?, linked_no = ?, linked_id = ?, linked_source = ?, parent_no = ?, parent_id = ?, parent_source = ?, created_date = ?, edited_date = ?, point_x = ?, point_y = ?, person_point_x = ?, person_point_y = ?, offense = ?, address = ?, date_time = ?, custom_data = ?, department = ?, confidential = ? WHERE linked_id = ? AND linked_source IN (?) AND department = ?`,
          [
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            master_name_id || null,
            vehicle_id || null,
            master_business_id || null,
            linked_no || null,
            linked_id || null,
            linked_source || null,
            parent_no || null,
            parent_id || null,
            parent_source || null,
            created_date,
            edited_date,
            point_x,
            point_y,
            person_point_x,
            person_point_y,
            offense,
            address,
            date_time,
            custom_data,
            this.department.name,
            confidential,
            linked_id,
            sourceType,
            this.department.name,
          ]
        );

        if (linked_source !== "Incident" && updateResult.affectedRows === 0) {
          const isRecordExist = await this.isRecordExist(linked_id, linked_source);

          if (isRecordExist) {
            //Record not found in network table for updating. But the real record exists. Therefore it will be added to network table
            //Exp: Assume there is no property owner previously. When updating, the new property owner was added.
            //Property record was not in network table because it had no master name or vehicle or business.
            //After adding new property owner, we could not find the related record in network table to update. We have to insert it to network table.
            await this.insert.apply(this, arguments);
          }
        }

        if (linked_source === "Incident") {
          await db.query(
            ` UPDATE sna.network SET point_x = ?, point_y = ?, offense = ?, address = ?, date_time = ?, confidential = ? WHERE parent_id = ? AND parent_source='Incident' AND department = ? AND linked_source IN ('Victim','Arrest','Suspect','Reportee','Involved Individual','Witness','Uof Subject','Uof Officer','Incident Vehicle')`,
            [point_x, point_y, offense, address, date_time, confidential, linked_id, this.department.name]
          );

          await db.query(
            ` UPDATE sna.network SET point_x = ?, point_y = ?, offense = ?, address = ?, date_time = ?, confidential = ? WHERE parent_id IS NULL AND parent_no = ? AND parent_source='Incident' AND department = ? AND linked_source IN ('Victim','Arrest','Suspect','Reportee','Involved Individual','Witness','Uof Subject','Uof Officer','Incident Vehicle')`,
            [point_x, point_y, offense, address, date_time, confidential, linked_no, this.department.name]
          );

          await db.query(
            ` UPDATE sna.network SET offense = ?, confidential = ? WHERE parent_id = ? AND parent_source='Incident' AND department = ? AND linked_source IN ('Property')`,
            [offense, confidential, linked_id, this.department.name]
          );

          await db.query(
            ` UPDATE sna.network SET offense = ?, confidential = ? WHERE parent_id IS NULL AND parent_no = ? AND parent_source='Incident' AND department = ? AND linked_source IN ('Property')`,
            [offense, confidential, linked_no, this.department.name]
          );
        }

        if (linked_source === "Traffic Crash") {
          if (point_x && point_y) {
            await db.query(
              `
                  UPDATE sna.network SET point_x = ?, point_y = ?, address = ?, date_time = ? WHERE parent_no = ? AND parent_source='Traffic Crash' AND department = ? AND linked_source IN ('Traffic Unit','Traffic Person')
              `,
              [point_x, point_y, address, date_time, linked_no, this.department.name]
            );
          }
        }

        if (linked_source === "Traffic Citation") {
          if (point_x && point_y) {
            await db.query(
              `
              UPDATE sna.network SET point_x = ?, point_y = ?, address = ?, offense = ?, date_time = ? WHERE parent_no = ? AND parent_source='Traffic Citation' AND department = ? AND linked_source IN ('Traffic Citation Witness')
          `,
              [point_x, point_y, address, offense, date_time, linked_no, this.department.name]
            );
          }
        }

        if (linked_source === "Permit") {
          await db.query(
            `
                UPDATE sna.network SET point_x = ?, point_y = ?, address = ?, offense = ?, date_time = ? WHERE parent_id = ? AND parent_source='Permit' AND department = ? AND linked_source IN ('Permit Vehicle')
            `,
            [point_x, point_y, address, offense, date_time, linked_id, this.department.name]
          );

          await db.query(
            `
                UPDATE sna.network SET point_x = ?, point_y = ?, offense = ?, date_time = ? WHERE parent_id = ? AND parent_source='Permit' AND department = ? AND linked_source IN ('Permit Person', 'Permit Business')
            `,
            [point_x, point_y, offense, date_time, linked_id, this.department.name]
          );
        }

        return new SuccessResult();
      } catch (err) {
        globalThis.logger.error(err);

        if (err.code === "ER_LOCK_DEADLOCK") {
          tryCount++;
          retryTime = RETRY_DURATION_AFTER_DEADLOCK;
          continue;
        }

        globalThis.logger.error("updating sna network failed");

        return new ErrorResult("updating sna network failed", err);
      } finally {
        if (db) {
          db.release();
        }
      }
    }

    return new ErrorResult("updating sna network failed because of deadlock");
  }

  async delete({ linked_id, linked_no = null, linked_source }) {
    let db;

    let tryCount = 0;
    let retryTime = 0;

    while (tryCount < DEADLOCK_TRY_COUNT) {
      try {
        await new Promise((resolve) => setTimeout(resolve, retryTime));

        db = await this.pool.getConnection();

        if (linked_source === "Incident") {
          await db.query(
            `
          UPDATE sna.network A
          JOIN sna.network B ON A.parent_id = B.linked_id AND A.parent_source = B.linked_source AND A.department = B.department
          SET 
            A.parent_id = NULL,
            A.parent_no = NULL,
            A.parent_source = NULL
          WHERE 
            B.linked_source IN ('Victim','Arrest','Suspect','Reportee','Involved Individual','Witness','Uof Subject','Uof Officer','Property','Incident Vehicle')
            AND
            B.parent_id = ?
            AND
            B.parent_source = 'Incident'
            AND
            B.department = ?
        `,
            [linked_id, this.department.name]
          );

          if (linked_no) {
            await db.query(
              `
                UPDATE sna.network A
                JOIN sna.network B ON A.parent_id = B.linked_id AND A.parent_source = B.linked_source AND A.department = B.department
                SET 
                  A.parent_id = NULL,
                  A.parent_no = NULL,
                  A.parent_source = NULL
                WHERE 
                  B.linked_source IN ('Victim','Arrest','Suspect','Reportee','Involved Individual','Witness','Uof Subject','Uof Officer','Property','Incident Vehicle')
                  AND
                  B.parent_no = ?
                  AND
                  B.parent_source = 'Incident'
                  AND
                  B.department = ?
              `,
              [linked_no, this.department.name]
            );
          }

          await db.query(
            `
            DELETE FROM sna.network 
            WHERE 
              linked_source IN ('Victim','Arrest','Suspect','Reportee','Involved Individual','Witness','Uof Subject','Uof Officer','Property','Incident Vehicle')
              AND
              parent_id = ?
              AND 
              parent_source = 'Incident'
              AND
              department = ?

          `,
            [linked_id, this.department.name]
          );

          if (linked_no) {
            await db.query(
              `
            DELETE FROM sna.network 
            WHERE 
              linked_source IN ('Victim','Arrest','Suspect','Reportee','Involved Individual','Witness','Uof Subject','Uof Officer','Property','Incident Vehicle')
              AND
              parent_no = ?
              AND 
              parent_source = 'Incident'
              AND
              department = ?
          `,
              [linked_no, this.department.name]
            );
          }
        }

        if (linked_source === "Traffic Crash") {
          await db.query(
            `
            DELETE FROM sna.network 
            WHERE 
              linked_source IN ('Traffic Unit','Traffic Person')
              AND
              parent_id = ?
              AND 
              parent_source = 'Traffic Crash'
              AND
              department = ?

          `,
            [linked_id, this.department.name]
          );

          if (linked_no) {
            await db.query(
              `
              DELETE FROM sna.network 
              WHERE 
                linked_source IN ('Traffic Unit','Traffic Person')
                AND
                parent_no = ?
                AND 
                parent_source = 'Traffic Crash'
                AND
                department = ?
            `,
              [linked_no, this.department.name]
            );
          }
        }

        if (linked_source === "Traffic Citation") {
          await db.query(
            `
          DELETE FROM sna.network 
          WHERE 
            linked_source IN ('Traffic Citation Witness')
            AND
            parent_id = ?
            AND 
            parent_source = 'Traffic Citation'
            AND
            department = ?

        `,
            [linked_id, this.department.name]
          );

          if (linked_no) {
            await db.query(
              `
              DELETE FROM sna.network 
              WHERE 
                linked_source IN ('Traffic Citation Witness')
                AND
                parent_no = ?
                AND 
                parent_source = 'Traffic Citation'
                AND
                department = ?

            `,
              [linked_no, this.department.name]
            );
          }
        }

        if (linked_source === "Daily Activity") {
          await db.query(
            `
              DELETE FROM sna.network 
              WHERE 
                linked_source IN ('Daily Activity Person', 'Daily Activity Business', 'Daily Activity Vehicle' )
                AND
                parent_id = ?
                AND 
                parent_source = 'Daily Activity'
                AND
                department = ?

            `,
            [linked_id, this.department.name]
          );
        }

        if (linked_source === "Permit") {
          await db.query(
            `
              DELETE FROM sna.network 
              WHERE 
                linked_source IN ('Permit Person', 'Permit Business', 'Permit Vehicle' )
                AND
                parent_id = ?
                AND 
                parent_source = 'Permit'
                AND
                department = ?

            `,
            [linked_id, this.department.name]
          );
        }

        await db.query(
          `
          UPDATE sna.network
          SET 
            parent_id = NULL,
            parent_source = NULL,
            parent_no = NULL 
          WHERE 
            parent_id = ?
            AND 
            parent_source = ?
            AND
            department = ?
      `,
          [linked_id, linked_source, this.department.name]
        );

        if (linked_no) {
          await db.query(
            `
            UPDATE sna.network
            SET 
              parent_id = NULL,
              parent_source = NULL,
              parent_no = NULL 
            WHERE 
              parent_no = ?
              AND 
              parent_source = ?
              AND
              department = ?
              
        `,
            [linked_no, linked_source, this.department.name]
          );
        }

        await db.query(`DELETE FROM sna.network WHERE linked_id = ? AND linked_source = ? AND department = ?`, [
          linked_id,
          linked_source,
          this.department.name,
        ]);

        return new SuccessResult();
      } catch (err) {
        globalThis.logger.error(err);

        if (err.code === "ER_LOCK_DEADLOCK") {
          tryCount++;
          retryTime = RETRY_DURATION_AFTER_DEADLOCK;
          continue;
        }

        globalThis.logger.error("updating sna network failed");
        return new ErrorResult("updating sna network failed", err);
      } finally {
        if (db) {
          db.release();
        }
      }
    }

    return new ErrorResult("updating sna network failed because of deadlock");
  }

  //#region INCIDENT

  async deleteIncident(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const linkedRecord = (
        await db.query(`SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ?`, [
          linked_id,
        ])
      )[0];

      let linked_no;

      if (linkedRecord) {
        linked_no = linkedRecord.incident_no;

        const incidents = (
          await db.query(
            `SELECT Count(*) as count FROM ${this.department.database_name_with_dot}incident WHERE incident_no = ? AND deleted IS NULL`,
            [linkedRecord.incident_no]
          )
        )[0];

        if (incidents.count > 1) {
          linked_no = null;
        }
      }

      const result = await this.delete({
        linked_id,
        linked_no,
        linked_source: "Incident",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting incident failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting incident failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  //#endregion

  //#region VICTIM
  async insertVictim(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const victims = await db.query(
        `SELECT victim.*, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}victim JOIN ${this.department.database_name_with_dot}incident ON incident.id = victim.incident_id WHERE victim.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = victims[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseVictim(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting victim failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting victim failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateVictim(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const victims = await db.query(
        `SELECT victim.*, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}victim JOIN ${this.department.database_name_with_dot}incident ON incident.id = victim.incident_id WHERE victim.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = victims[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseVictim(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating victim failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating victim failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteVictim(linked_id) {
    try {
      const result = await this.delete({ linked_id, linked_source: "Victim" });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting victim failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting victim failed", err);
    }
  }

  parseVictim(record) {
    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      master_business_id: record.master_business_id,
      linked_id: record.id,
      linked_source: "Victim",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      address: record.incident_address,
      offense: record.incident_orc_no,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }

  //#endregion

  //#region ARREST
  async insertArrest(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const arrests = await db.query(
        `SELECT arrest.*, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}arrest JOIN ${this.department.database_name_with_dot}incident ON incident.id = arrest.incident_id WHERE arrest.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = arrests[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseArrest(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting arrest failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting arrest failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateArrest(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const arrests = await db.query(
        `SELECT arrest.*, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}arrest JOIN ${this.department.database_name_with_dot}incident ON incident.id = arrest.incident_id WHERE arrest.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = arrests[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseArrest(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating arrest failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating arrest failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteArrest(linked_id) {
    try {
      const result = await this.delete({ linked_id, linked_source: "Arrest" });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting arrest failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting arrest failed", err);
    }
  }

  parseArrest(record) {
    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      linked_id: record.id,
      linked_source: "Arrest",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      address: record.incident_address,
      offense: record.incident_orc_no,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }

  //#endregion

  //#region SUSPECT
  async insertSuspect(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const suspects = await db.query(
        `SELECT suspect.*, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}suspect JOIN ${this.department.database_name_with_dot}incident ON incident.id = suspect.incident_id WHERE suspect.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = suspects[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseSuspect(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting suspect failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting suspect failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateSuspect(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const suspects = await db.query(
        `SELECT suspect.*, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}suspect JOIN ${this.department.database_name_with_dot}incident ON incident.id = suspect.incident_id WHERE suspect.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = suspects[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseSuspect(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating suspect failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating suspect failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteSuspect(linked_id) {
    try {
      const result = await this.delete({ linked_id, linked_source: "Suspect" });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting suspect failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting suspect failed", err);
    }
  }

  parseSuspect(record) {
    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      linked_id: record.id,
      linked_source: "Suspect",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      offense: record.incident_orc_no,
      address: record.incident_address,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }
  //#endregion

  //#region REPORTEE
  async insertReportee(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const reportees = await db.query(
        `SELECT reportee.*, incident.created_date , incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}reportee JOIN ${this.department.database_name_with_dot}incident ON incident.id = reportee.incident_id WHERE reportee.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = reportees[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseReportee(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting reportee/involved individual failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting reportee/involved individual failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateReportee(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const reportees = await db.query(
        `SELECT reportee.*,incident.created_date , incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}reportee JOIN ${this.department.database_name_with_dot}incident ON incident.id = reportee.incident_id WHERE reportee.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = reportees[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseReportee(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating reportee/involved individual failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating reportee/involved individual failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteReportee(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const reportee = (
        await db.query(`SELECT individual_type FROM ${this.department.database_name_with_dot}reportee WHERE id = ?`, [
          linked_id,
        ])
      )[0];

      if (!reportee) {
        return;
      }

      const result = await this.delete({
        linked_id,
        linked_source: reportee.individual_type === "Reportee" ? "Reportee" : "Involved Individual",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting reportee/involved individual failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting reportee/involved individual failed", err);
    }
  }

  parseReportee(record) {
    return {
      first_name: record.reportee_first_name,
      middle_name: record.reportee_middle_name,
      last_name: record.reportee_last_name,
      date_of_birth: record.reportee_dob,
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: record.individual_type === "Reportee" ? "Reportee" : "Involved Individual",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      offense: record.incident_orc_no,
      address: record.incident_address,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }
  //#endregion

  //#region WITNESS
  async insertWitness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const witnesses = await db.query(
        `SELECT witness.*, incident.created_date, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}witness JOIN ${this.department.database_name_with_dot}incident ON incident.id = witness.incident_id WHERE witness.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = witnesses[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseWitness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting witness failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting witness failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateWitness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const witnesses = await db.query(
        `SELECT witness.*,incident.created_date, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}witness JOIN ${this.department.database_name_with_dot}incident ON incident.id = witness.incident_id WHERE witness.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = witnesses[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseWitness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating witness failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating witness failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteWitness(linked_id) {
    try {
      const result = await this.delete({ linked_id, linked_source: "Witness" });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting witness failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting witness failed", err);
    }
  }

  parseWitness(record) {
    return {
      first_name: record.witness_first_name,
      middle_name: record.witness_middle_name,
      last_name: record.witness_last_name,
      date_of_birth: record.witness_dob,
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: "Witness",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      offense: record.incident_orc_no,
      address: record.incident_address,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }
  //#endregion

  //#region PROPERTY
  async insertProperty(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const properties = await db.query(
        `SELECT property.*, incident.orc_no as incident_orc_no, incident.confidential FROM ${this.department.database_name_with_dot}property JOIN ${this.department.database_name_with_dot}incident ON incident.id = property.incident_id WHERE property.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = properties[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseProperty(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting property failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting property failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateProperty(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const properties = await db.query(
        `SELECT property.*, incident.orc_no as incident_orc_no, incident.confidential FROM ${this.department.database_name_with_dot}property JOIN ${this.department.database_name_with_dot}incident ON incident.id = property.incident_id WHERE property.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = properties[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseProperty(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating property failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating property failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteProperty(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Property",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting property failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting property failed", err);
    }
  }

  parseProperty(record) {
    return {
      first_name: record.owner_first_name,
      middle_name: record.owner_middle_name,
      last_name: record.owner_last_name,
      date_of_birth: record.owner_dob,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      master_business_id: record.master_business_id,
      linked_id: record.id,
      linked_source: "Property",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.recovery_pointx,
      point_y: record.recovery_pointy,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      offense: record.incident_orc_no,
      address: record.recovery_address,
      date_time: record.DateRecovered,
      confidential: record.confidential,
    };
  }
  //#endregion

  //#region EVIDENCE
  async insertEvidence(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const evidences = await db.query(
        `SELECT evidence.* FROM ${this.department.database_name_with_dot}evidence WHERE evidence.id = ?`,
        [linked_id]
      );

      const record = evidences[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseEvidence(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting evidence failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting evidence failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateEvidence(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const evidences = await db.query(
        `SELECT evidence.* FROM ${this.department.database_name_with_dot}evidence WHERE evidence.id = ?`,
        [linked_id]
      );

      const record = evidences[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseEvidence(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating evidence failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating evidence failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteEvidence(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Evidence",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting evidence failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting evidence failed", err);
    }
  }

  parseEvidence(record) {
    let parentNo, parentId, parentSource;

    if (record.linked_source) {
      parentSource = record.linked_source;

      if (parentSource === "Evidence") {
        parentSource = null;
      }

      if (record.linked_source === "Daily Logs") {
        parentNo = record.linked_id;
        parentId = record.linked_id;
        parentSource = "Daily Activity";
      } else if (record.linked_source === "FIR") {
        parentNo = record.linked_id;
      } else if (record.linked_source === "Traffic Crash") {
        parentNo = record.linked_id;
      } else if (record.linked_source === "Traffic Citation") {
        parentNo = record.linked_id;
      } else if (record.linked_source === "Warrant-Citation Arrest") {
        parentNo = record.linked_id;
      }
    } else if (record.incident_no) {
      parentNo = record.incident_no;
      parentSource = "Incident";
    }

    return {
      first_name: record.reportee_first_name,
      middle_name: record.reportee_middle_name,
      last_name: record.reportee_last_name,
      date_of_birth: record.reportee_dob,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      master_business_id: record.master_business_id,
      linked_no: record.evidence_no,
      linked_id: record.id,
      linked_source: "Evidence",
      parent_no: parentNo,
      parent_id: parentId,
      parent_source: parentSource,
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.recovery_lng,
      point_y: record.recovery_lat,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      address: record.recovery_address,
      date_time: record.DateRecovered,
    };
  }
  //#endregion

  //#region INCIDENT VEHICLE
  async insertIncidentVehicle(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const incidentVehicles = await db.query(
        `SELECT incident_vehicle.*,incident.id as incident_id, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}incident_vehicle JOIN ${this.department.database_name_with_dot}incident ON incident.incident_no = incident_vehicle.incident_no WHERE incident_vehicle.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = incidentVehicles[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseIncidentVehicle(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting incident vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting incident vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateIncidentVehicle(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const incidentVehicles = await db.query(
        `SELECT incident_vehicle.*, incident.id as incident_id, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}incident_vehicle JOIN ${this.department.database_name_with_dot}incident ON incident.incident_no = incident_vehicle.incident_no WHERE incident_vehicle.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = incidentVehicles[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseIncidentVehicle(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating incident vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating incident vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteIncidentVehicle(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Incident Vehicle",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting incident vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting incident vehicle failed", err);
    }
  }

  parseIncidentVehicle(record) {
    return {
      vehicle_id: record.vehicle_id,
      linked_id: record.ID,
      linked_source: "Incident Vehicle",
      parent_id: record.incident_id,
      parent_no: record.incident_no,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      address: record.incident_address,
      offense: record.incident_orc_no,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }
  //#endregion

  //#region UOF SUBJECT
  async insertUofSubject(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const uofs = await db.query(
        `SELECT uof.*, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}uof JOIN ${this.department.database_name_with_dot}incident ON incident.id = uof.incident_id WHERE uof.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = uofs[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseUofSubject(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting uof subject failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting uof subject failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateUofSubject(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const uofs = await db.query(
        `SELECT uof.*, incident.PointX, incident.PointY, incident.address2 as incident_address, incident.orc_no as incident_orc_no, incident.date_time as incident_date_time, incident.confidential FROM ${this.department.database_name_with_dot}uof JOIN ${this.department.database_name_with_dot}incident ON incident.id = uof.incident_id WHERE uof.id = ? AND incident.deleted IS NULL`,
        [linked_id]
      );

      const record = uofs[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseUofSubject(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating uof subject failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating uof subject failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteUofSubject(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Uof Subject",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting uof subject failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting uof subject failed", err);
    }
  }

  parseUofSubject(record) {
    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: "Uof Subject",
      parent_no: record.incident_no,
      parent_id: record.incident_id,
      parent_source: "Incident",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      offense: record.incident_orc_no,
      address: record.incident_address,
      date_time: record.incident_date_time,
      confidential: record.confidential,
    };
  }
  //#endregion

  //#region FIR
  async insertFIR(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const firs = await db.query(
        `
        SELECT 
          fir.*,
          NULLIF(
            IF (linked_source IS NOT NULL AND linked_source <> '', 
                CASE 
                    WHEN linked_source = 'Incident' THEN (SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ${this.department.database_name_with_dot}fir.linked_id LIMIT 1)
                    WHEN linked_source = 'Traffic Citation' THEN (SELECT citation_no FROM ${this.department.database_name_with_dot}traffic_citations WHERE id = ${this.department.database_name_with_dot}fir.linked_id LIMIT 1)
                    WHEN linked_source = 'Daily Activity' THEN linked_id
                    WHEN linked_source = 'Warrant-Citation Arrest' THEN linked_id
                    ELSE NULL
                END,
                NULL
            ),
            ''
        ) AS new_linked_no,
        NULLIF ( IF( linked_source = 'Warrant-Citation Arrest', NULL, linked_id ),'' ) AS new_linked_id
        FROM ${this.department.database_name_with_dot}fir WHERE fir.id = ?`,
        [linked_id]
      );

      const record = firs[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseFIR(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting FIR failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting FIR failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateFIR(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const firs = await db.query(
        `
        SELECT 
            fir.*,
            NULLIF(
              IF (linked_source IS NOT NULL AND linked_source <> '', 
                  CASE 
                      WHEN linked_source = 'Incident' THEN (SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ${this.department.database_name_with_dot}fir.linked_id LIMIT 1)
                      WHEN linked_source = 'Traffic Citation' THEN (SELECT citation_no FROM ${this.department.database_name_with_dot}traffic_citations WHERE id = ${this.department.database_name_with_dot}fir.linked_id LIMIT 1)
                      WHEN linked_source = 'Daily Activity' THEN linked_id
                      WHEN linked_source = 'Warrant-Citation Arrest' THEN linked_id
                      ELSE NULL
                  END,
                  NULL
              ),
              ''
            ) AS new_linked_no,
            NULLIF ( IF( linked_source = 'Warrant-Citation Arrest', NULL, linked_id ),'' ) AS new_linked_id 
        FROM ${this.department.database_name_with_dot}fir WHERE fir.id = ?`,
        [linked_id]
      );

      const record = firs[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseFIR(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating FIR failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating FIR failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteFIR(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const linkedRecord = (
        await db.query(`SELECT incident_no FROM ${this.department.database_name_with_dot}fir WHERE id = ?`, [linked_id])
      )[0];

      let linked_no;

      if (linkedRecord) {
        linked_no = linkedRecord.incident_no;

        const firs = (
          await db.query(
            `SELECT Count(*) as count FROM ${this.department.database_name_with_dot}fir WHERE incident_no = ? AND deleted IS NULL`,
            [linkedRecord.incident_no]
          )
        )[0];

        if (firs.count > 1) {
          linked_no = null;
        }
      }

      const result = await this.delete({
        linked_id,
        linked_no,
        linked_source: "FIR",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting FIR failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting FIR failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseFIR(record) {
    let parentNo, parentId, parentSource;

    if (record.linked_source) {
      parentSource = record.linked_source;
      parentNo = record.new_linked_no;
      parentId = record.new_linked_id;
    }

    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      linked_no: record.incident_no,
      linked_id: record.id,
      linked_source: "FIR",
      parent_no: parentNo,
      parent_id: parentId,
      parent_source: parentSource,
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      address: record.Address,
      date_time: record.arrest_date,
    };
  }
  //#endregion

  //#region WARRANT-CITATION ARREST
  async insertWarrantCitationArrest(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const arrests = await db.query(
        `
          SELECT 
            arrest_non.*,
            NULLIF(
              IF (linked_source IS NOT NULL AND linked_source <> '', 
                  CASE 
                      WHEN linked_source = 'Incident' THEN (SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ${this.department.database_name_with_dot}arrest_non.linked_id LIMIT 1)
                      WHEN linked_source = 'Traffic Crash' THEN (SELECT crash_no FROM ${this.department.database_name_with_dot}traffic WHERE id = ${this.department.database_name_with_dot}arrest_non.linked_id LIMIT 1)
                      WHEN linked_source = 'Traffic Citation' THEN linked_id
                      WHEN linked_source = 'FIR' THEN linked_id
                      ELSE NULL
                  END,
                  NULL
              ),
              ''
          ) AS new_linked_no,
          NULLIF ( IF ( linked_source = 'FIR' OR linked_source = 'Traffic Citation', NULL, linked_id ),'') AS new_linked_id
          FROM ${this.department.database_name_with_dot}arrest_non WHERE arrest_non.id = ?`,
        [linked_id]
      );

      const record = arrests[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseWarrantCitationArrest(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting warrant-citation arrest failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting warrant-citation arrest failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateWarrantCitationArrest(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const arrests = await db.query(
        `
          SELECT 
              arrest_non.*,
              NULLIF(
                IF (linked_source IS NOT NULL AND linked_source <> '', 
                    CASE 
                        WHEN linked_source = 'Incident' THEN (SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ${this.department.database_name_with_dot}arrest_non.linked_id LIMIT 1)
                        WHEN linked_source = 'Traffic Crash' THEN (SELECT crash_no FROM ${this.department.database_name_with_dot}traffic WHERE id = ${this.department.database_name_with_dot}arrest_non.linked_id LIMIT 1)
                        WHEN linked_source = 'Traffic Citation' THEN linked_id
                        WHEN linked_source = 'FIR' THEN linked_id
                        ELSE NULL
                    END,
                    NULL
                ),
                ''
            ) AS new_linked_no,
            NULLIF ( IF ( linked_source = 'FIR' OR linked_source = 'Traffic Citation', NULL, linked_id ),'') AS new_linked_id
          FROM ${this.department.database_name_with_dot}arrest_non WHERE arrest_non.id = ?`,
        [linked_id]
      );

      const record = arrests[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseWarrantCitationArrest(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating warrant-citation arrest failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating warrant-citation arrest failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteWarrantCitationArrest(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const linkedRecord = (
        await db.query(`SELECT incident_no FROM ${this.department.database_name_with_dot}arrest_non WHERE id = ?`, [
          linked_id,
        ])
      )[0];

      let linked_no;

      if (linkedRecord) {
        linked_no = linkedRecord.incident_no;

        const arrests = (
          await db.query(
            `SELECT Count(*) as count FROM ${this.department.database_name_with_dot}arrest_non WHERE incident_no = ? AND deleted IS NULL`,
            [linkedRecord.incident_no]
          )
        )[0];

        if (arrests.count > 1) {
          linked_no = null;
        }
      }

      const result = await this.delete({
        linked_id,
        linked_no,
        linked_source: "Warrant-Citation Arrest",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting warrant-citation arrest failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting warrant-citation arrest  failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseWarrantCitationArrest(record) {
    let parentNo, parentId, parentSource;

    if (record.linked_source) {
      parentSource = record.linked_source;
      parentNo = record.new_linked_no;
      parentId = record.new_linked_id;
    }

    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      linked_no: record.incident_no,
      linked_id: record.id,
      linked_source: "Warrant-Citation Arrest",
      parent_no: parentNo,
      parent_id: parentId,
      parent_source: parentSource,
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      address: record.Address,
      offense: record.orc_no,
      date_time: record.arrest_date,
    };
  }
  //#endregion

  //#region TRAFFIC CRASH
  async insertTrafficCrash(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const crashes = await db.query(
        `
          SELECT 
            traffic.*,
            IFNULL(linked_incidentNo,'') as new_linked_no,
            IFNULL(linked_id,'') as new_linked_id,
            IFNULL(
              CASE 
                  WHEN linked_source = 'Offense-NonCriminal' THEN 'Incident'
                  ELSE linked_source
              END,
              ''
            ) as new_linked_source
          FROM ${this.department.database_name_with_dot}traffic WHERE id = ?`,
        [linked_id]
      );

      const record = crashes[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseTrafficCrash(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting traffic crash failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting traffic crash failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateTrafficCrash(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const crashes = await db.query(
        `
          SELECT 
            traffic.*,
            IFNULL(linked_incidentNo,'') as new_linked_no,
            IFNULL(linked_id,'') as new_linked_id,
            IFNULL(
              CASE 
                  WHEN linked_source = 'Offense-NonCriminal' THEN 'Incident'
                  ELSE linked_source
              END,
              ''
            ) as new_linked_source
          FROM ${this.department.database_name_with_dot}traffic WHERE id = ?`,
        [linked_id]
      );

      const record = crashes[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseTrafficCrash(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating traffic crash failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating traffic crash failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteTrafficCrash(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const linkedRecord = (
        await db.query(`SELECT crash_no FROM ${this.department.database_name_with_dot}traffic WHERE id = ?`, [
          linked_id,
        ])
      )[0];

      let linked_no;

      if (linkedRecord) {
        linked_no = linkedRecord.crash_no;

        const crashes = (
          await db.query(
            `SELECT Count(*) as count FROM ${this.department.database_name_with_dot}traffic WHERE crash_no = ? AND deleted IS NULL`,
            [linked_no]
          )
        )[0];

        if (crashes.count > 1) {
          linked_no = null;
        }
      }

      const result = await this.delete({
        linked_id,
        linked_no,
        linked_source: "Traffic Crash",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting traffic crash failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting traffic crash failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseTrafficCrash(record) {
    let parentNo, parentId, parentSource;

    if (record.linked_source) {
      parentSource = record.new_linked_source;
      parentNo = record.new_linked_no;
      parentId = record.new_linked_id;
    }

    return {
      linked_no: record.crash_no,
      linked_id: record.id,
      linked_source: "Traffic Crash",
      parent_no: parentNo,
      parent_id: parentId,
      parent_source: parentSource,
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      address: record.Address,
      date_time: record.crash_date,
    };
  }
  //#endregion

  //#region TRAFFIC UNIT
  async insertTrafficUnit(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const trafficUnits = await db.query(
        `
        SELECT 
          traffic_unit.*, 
          traffic.id as parent_id,
          traffic.PointX, 
          traffic.PointY,
          traffic.address as crash_address,
          traffic.crash_date as crash_date
        FROM ${this.department.database_name_with_dot}traffic_unit 
        JOIN ${this.department.database_name_with_dot}traffic ON traffic_unit.CrashNo = traffic.crash_no 
        WHERE traffic_unit.id = ? AND traffic.deleted IS NULL`,
        [linked_id]
      );

      const record = trafficUnits[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseTrafficUnit(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting traffic unit failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting traffic unit failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateTrafficUnit(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const trafficUnits = await db.query(
        `
        SELECT 
          traffic_unit.*, 
          traffic.id as parent_id,
          traffic.PointX, 
          traffic.PointY,
          traffic.address as crash_address,
          traffic.crash_date as crash_date 
        FROM ${this.department.database_name_with_dot}traffic_unit 
        JOIN ${this.department.database_name_with_dot}traffic ON traffic_unit.CrashNo = traffic.crash_no 
        WHERE traffic_unit.id = ? AND traffic.deleted IS NULL`,
        [linked_id]
      );

      const record = trafficUnits[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseTrafficUnit(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating traffic unit failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating traffic unit failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteTrafficUnit(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Traffic Unit",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting traffic unit failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting traffic unit failed", err);
    }
  }

  parseTrafficUnit(record) {
    return {
      first_name: record.owner_first_name,
      middle_name: record.owner_middle_name,
      last_name: record.owner_last_name,
      date_of_birth: record.owner_dob,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      linked_id: record.id,
      linked_source: "Traffic Unit",
      parent_no: record.CrashNo,
      parent_id: record.parent_id,
      parent_source: "Traffic Crash",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.owner_lng,
      person_point_y: record.owner_lat,
      address: record.crash_address,
      date_time: record.crash_date,
    };
  }

  //#endregion

  //#region TRAFFIC PERSON
  async insertTrafficPerson(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const trafficPeople = await db.query(
        `
        SELECT 
          traffic_person.*, 
          traffic.id as parent_id,
          traffic.PointX, 
          traffic.PointY,
          traffic.address as crash_address,
          traffic.crash_date as crash_date 
        FROM ${this.department.database_name_with_dot}traffic_person 
        JOIN ${this.department.database_name_with_dot}traffic ON traffic_person.CrashNo = traffic.crash_no 
        WHERE traffic_person.id = ? AND traffic.deleted IS NULL`,
        [linked_id]
      );

      const record = trafficPeople[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseTrafficPerson(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting traffic person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting traffic person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateTrafficPerson(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const trafficPeople = await db.query(
        `
        SELECT 
          traffic_person.*, 
          traffic.id as parent_id,
          traffic.PointX, 
          traffic.PointY,
          traffic.address as crash_address,
          traffic.crash_date as crash_date 
        FROM ${this.department.database_name_with_dot}traffic_person 
        JOIN ${this.department.database_name_with_dot}traffic ON traffic_person.CrashNo = traffic.crash_no 
        WHERE traffic_person.id = ? AND traffic.deleted IS NULL`,
        [linked_id]
      );

      const record = trafficPeople[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseTrafficPerson(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating traffic person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating traffic person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteTrafficPerson(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Traffic Person",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting traffic person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting traffic person failed", err);
    }
  }

  parseTrafficPerson(record) {
    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.dob,
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: "Traffic Person",
      parent_no: record.CrashNo,
      parent_id: record.parent_id,
      parent_source: "Traffic Crash",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      person_point_x: record.lng,
      person_point_y: record.lat,
      address: record.crash_address,
      date_time: record.crash_date,
    };
  }

  //#endregion

  //#region TRAFFIC CITATON
  async insertTrafficCitation(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const citations = await db.query(
        `
          SELECT 
            traffic_citations.*,
            NULLIF(
              IF (linked_source IS NOT NULL AND linked_source <> '', 
                  CASE 
                      WHEN linked_source = 'Offense-NonCriminal' THEN (SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ${this.department.database_name_with_dot}traffic_citations.linked_id LIMIT 1)
                      WHEN linked_source = 'Traffic Crash' THEN (SELECT crash_no FROM ${this.department.database_name_with_dot}traffic WHERE id = ${this.department.database_name_with_dot}traffic_citations.linked_id LIMIT 1)
                      ELSE NULL
                  END,
                  NULL
              ),
              ''
          ) AS new_linked_no,
          NULLIF ( linked_id ,'') AS new_linked_id,
          NULLIF(IF(linked_source = 'Offense-NonCriminal', 'Incident', linked_source),'') as new_linked_source,
          ${this.department.database_name_with_dot}concatCodes(
            IF(orc_code1 IS NULL OR orc_code1 = '', local_code1, orc_code1),
            IF(orc_code2 IS NULL OR orc_code2 = '', local_code2, orc_code2),
            IF(orc_code3 IS NULL OR orc_code3 = '', local_code3, orc_code3),
            IF(orc_code4 IS NULL OR orc_code4 = '', local_code4, orc_code4),
            IF(orc_code5 IS NULL OR orc_code5 = '', local_code5, orc_code5),
            IF(orc_code6 IS NULL OR orc_code6 = '', local_code6, orc_code6)
          ) as offense
          FROM ${this.department.database_name_with_dot}traffic_citations WHERE traffic_citations.id = ?`,
        [linked_id]
      );

      const record = citations[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseTrafficCitation(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting traffic citation failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting traffic citation failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateTrafficCitation(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const citations = await db.query(
        `
          SELECT 
            traffic_citations.*,
            NULLIF(
              IF (linked_source IS NOT NULL AND linked_source <> '', 
                  CASE 
                      WHEN linked_source = 'Offense-NonCriminal' THEN (SELECT incident_no FROM ${this.department.database_name_with_dot}incident WHERE id = ${this.department.database_name_with_dot}traffic_citations.linked_id LIMIT 1)
                      WHEN linked_source = 'Traffic Crash' THEN (SELECT crash_no FROM ${this.department.database_name_with_dot}traffic WHERE id = ${this.department.database_name_with_dot}traffic_citations.linked_id LIMIT 1)
                      ELSE NULL
                  END,
                  NULL
              ),
              ''
          ) AS new_linked_no,
          NULLIF ( linked_id ,'') AS new_linked_id,
          NULLIF(IF(linked_source = 'Offense-NonCriminal', 'Incident', linked_source),'') as new_linked_source,
          ${this.department.database_name_with_dot}concatCodes(
            IF(orc_code1 IS NULL OR orc_code1 = '', local_code1, orc_code1),
            IF(orc_code2 IS NULL OR orc_code2 = '', local_code2, orc_code2),
            IF(orc_code3 IS NULL OR orc_code3 = '', local_code3, orc_code3),
            IF(orc_code4 IS NULL OR orc_code4 = '', local_code4, orc_code4),
            IF(orc_code5 IS NULL OR orc_code5 = '', local_code5, orc_code5),
            IF(orc_code6 IS NULL OR orc_code6 = '', local_code6, orc_code6)
          ) as offense
          FROM ${this.department.database_name_with_dot}traffic_citations WHERE traffic_citations.id = ?`,
        [linked_id]
      );

      const record = citations[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseTrafficCitation(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating traffic citation failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating traffic citation failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteTrafficCitation(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const linkedRecord = (
        await db.query(
          `SELECT citation_no FROM ${this.department.database_name_with_dot}traffic_citations WHERE id = ?`,
          [linked_id]
        )
      )[0];

      let linked_no;

      if (linkedRecord) {
        linked_no = linkedRecord.citation_no;

        const citations = (
          await db.query(
            `SELECT Count(*) as count FROM ${this.department.database_name_with_dot}traffic_citations WHERE citation_no = ? AND deleted IS NULL`,
            [linked_no]
          )
        )[0];

        if (citations.count > 1) {
          linked_no = null;
        }
      }

      const result = await this.delete({
        linked_id,
        linked_no,
        linked_source: "Traffic Citation",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting traffic citation failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting traffic citation failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseTrafficCitation(record) {
    let parentNo, parentId, parentSource;

    if (record.linked_source) {
      parentSource = record.new_linked_source;
      parentNo = record.new_linked_no;
      parentId = record.new_linked_id;
    }

    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.date_of_birth,
      master_name_id: record.master_name_id,
      vehicle_id: record.vehicle_id,
      linked_no: record.citation_no,
      linked_id: record.id,
      linked_source: "Traffic Citation",
      parent_no: parentNo,
      parent_id: parentId,
      parent_source: parentSource,
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      address: record.Address,
      offense: record.offense,
      date_time: record.citation_date,
    };
  }
  //#endregion

  //#region TRAFFIC CITATON WITNESS
  async insertTrafficCitationWitness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const trafficCitationWitnesses = await db.query(
        `
          SELECT 
            traffic_citation_witness.*, 
            traffic_citations.id as parent_id,
            traffic_citations.PointX,
            traffic_citations.PointY,
            traffic_citations.Address as citation_address,
            traffic_citations.citation_date,
            ${this.department.database_name_with_dot}concatCodes(
              IF(orc_code1 IS NULL OR orc_code1 = '', local_code1, orc_code1),
              IF(orc_code2 IS NULL OR orc_code2 = '', local_code2, orc_code2),
              IF(orc_code3 IS NULL OR orc_code3 = '', local_code3, orc_code3),
              IF(orc_code4 IS NULL OR orc_code4 = '', local_code4, orc_code4),
              IF(orc_code5 IS NULL OR orc_code5 = '', local_code5, orc_code5),
              IF(orc_code6 IS NULL OR orc_code6 = '', local_code6, orc_code6)
            ) as offense
          FROM ${this.department.database_name_with_dot}traffic_citation_witness 
          JOIN ${this.department.database_name_with_dot}traffic_citations ON traffic_citation_witness.citation_no = traffic_citations.citation_no 
          WHERE traffic_citation_witness.id = ?  AND traffic_citations.deleted IS NULL`,
        [linked_id]
      );

      const record = trafficCitationWitnesses[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseTrafficCitationWitness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting traffic citation witness failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting traffic citation witness failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateTrafficCitationWitness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const trafficCitationWitnesses = await db.query(
        `
          SELECT 
            traffic_citation_witness.*, 
            traffic_citations.id as parent_id,
            traffic_citations.PointX,
            traffic_citations.PointY,
            traffic_citations.Address as citation_address,
            traffic_citations.citation_date,
            ${this.department.database_name_with_dot}concatCodes(
              IF(orc_code1 IS NULL OR orc_code1 = '', local_code1, orc_code1),
              IF(orc_code2 IS NULL OR orc_code2 = '', local_code2, orc_code2),
              IF(orc_code3 IS NULL OR orc_code3 = '', local_code3, orc_code3),
              IF(orc_code4 IS NULL OR orc_code4 = '', local_code4, orc_code4),
              IF(orc_code5 IS NULL OR orc_code5 = '', local_code5, orc_code5),
              IF(orc_code6 IS NULL OR orc_code6 = '', local_code6, orc_code6)
            ) as offense
          FROM ${this.department.database_name_with_dot}traffic_citation_witness 
          JOIN ${this.department.database_name_with_dot}traffic_citations ON traffic_citation_witness.citation_no = traffic_citations.citation_no 
          WHERE traffic_citation_witness.id = ? AND traffic_citation_witness.deleted IS NULL AND traffic_citations.deleted IS NULL`,
        [linked_id]
      );

      const record = trafficCitationWitnesses[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseTrafficCitationWitness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating traffic citation witness failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating traffic citation witness failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteTrafficCitationWitness(linked_id) {
    try {
      const result = await this.delete({
        linked_id,
        linked_source: "Traffic Citation Witness",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting traffic citation witness failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting traffic citation witness failed", err);
    }
  }

  parseTrafficCitationWitness(record) {
    return {
      first_name: record.witness_first_name,
      middle_name: record.witness_middle_name,
      last_name: record.witness_last_name,
      date_of_birth: record.witness_dob,
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: "Traffic Citation Witness",
      parent_no: record.citation_no,
      parent_id: record.parent_id,
      parent_source: "Traffic Citation",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.PointX,
      point_y: record.PointY,
      address: record.citation_address,
      offense: record.offense,
      date_time: record.citation_date,
    };
  }

  //#endregion

  //#region COURT MANAGEMENT
  async insertCourtManagement(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const courtManagements = await db.query(
        `
          SELECT
            id, 
            trim(trim(BOTH ',' FROM replace(substring_index(depositor_name,',',2),substring_index(depositor_name,',',1),''))) as first_name,
            trim(trim(BOTH ',' FROM replace(depositor_name,substring_index(depositor_name,',',2),''))) as middle_name,
            substring_index(depositor_name,',',1) as last_name,
            dob,
            master_name_id,
            linked_data_incidentNo as new_linked_no,
            linked_data_id as new_linked_id,
            CASE 
                WHEN data_source = 'Arrest' THEN 'Arrest'
                WHEN data_source = 'Suspect' THEN 'Suspect'
                WHEN data_source = 'Victim' THEN 'Victim'
                WHEN data_source = 'Traffic Citation' THEN 'Traffic Citation'
                WHEN data_source = 'Trafffic Citation' THEN 'Traffic Citation'
                WHEN data_source = 'Warrant-Citation Arrest' THEN 'Warrant-Citation Arrest'
                WHEN data_source = 'Non-NIBRS Arrest' THEN 'Warrant-Citation Arrest'
                ELSE NULL
            END as new_linked_source,
            data_source,
            created_date,
            edited_date,
            court_date
          FROM ${this.department.database_name_with_dot}traffic_citations_court WHERE id = ?`,
        [linked_id]
      );

      const record = courtManagements[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseCourtManagement(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting court management failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting court management failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateCourtManagement(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const courtManagements = await db.query(
        `
          SELECT
            id, 
            trim(trim(BOTH ',' FROM replace(substring_index(depositor_name,',',2),substring_index(depositor_name,',',1),''))) as first_name,
            trim(trim(BOTH ',' FROM replace(depositor_name,substring_index(depositor_name,',',2),''))) as middle_name,
            substring_index(depositor_name,',',1) as last_name,
            dob,
            master_name_id,
            NULLIF(linked_data_incidentNo,'') as new_linked_no,
            NULLIF(linked_data_id,'') as new_linked_id,
            CASE 
                WHEN data_source = 'Arrest' THEN 'Arrest'
                WHEN data_source = 'Suspect' THEN 'Suspect'
                WHEN data_source = 'Victim' THEN 'Victim'
                WHEN data_source = 'Traffic Citation' THEN 'Traffic Citation'
                WHEN data_source = 'Trafffic Citation' THEN 'Traffic Citation'
                WHEN data_source = 'Warrant-Citation Arrest' THEN 'Warrant-Citation Arrest'
                WHEN data_source = 'Non-NIBRS Arrest' THEN 'Warrant-Citation Arrest'
                ELSE NULL
            END as new_linked_source,
            data_source,
            created_date,
            edited_date,
            court_date
          FROM ${this.department.database_name_with_dot}traffic_citations_court WHERE id = ?`,
        [linked_id]
      );

      const record = courtManagements[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseCourtManagement(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating court management failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating court management failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteCourtManagement(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const result = await this.delete({
        linked_id,
        linked_source: "Court Management",
      });

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting court management failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting court management failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseCourtManagement(record) {
    let parentNo, parentId, parentSource;

    if (record.data_source) {
      parentSource = record.new_linked_source;
      parentNo = record.new_linked_no;
      parentId = record.new_linked_id;
    }

    return {
      first_name: record.first_name,
      middle_name: record.middle_name,
      last_name: record.last_name,
      date_of_birth: record.dob,
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: "Court Management",
      parent_no: parentNo,
      parent_id: parentId,
      parent_source: parentSource,
      created_date: record.created_date,
      edited_date: record.edited_date,
      date_time: record.court_date,
    };
  }
  //#endregion

  //#region DAILY ACTIVITY
  async insertDailyActivity(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivities = await db.query(
        `SELECT * FROM ${this.department.database_name_with_dot}daily_logs WHERE id = ?`,
        [linked_id]
      );

      const record = dailyActivities[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseDailyActivity(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting daily activity failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting daily activity failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateDailyActivity(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivities = await db.query(
        `SELECT * FROM ${this.department.database_name_with_dot}daily_logs WHERE id = ?`,
        [linked_id]
      );

      const record = dailyActivities[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseDailyActivity(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating daily activity failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating daily activity failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteDailyActivity(linked_ids) {
    let db;
    try {
      db = await this.pool.getConnection();

      let result;

      for (const linkedId of linked_ids) {
        result = await this.delete({
          linked_id: linkedId,
          linked_no: linkedId,
          linked_source: "Daily Activity",
        });
      }

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting daily activity failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting daily activity failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseDailyActivity(record) {
    return {
      linked_no: record.ID,
      linked_id: record.ID,
      linked_source: "Daily Activity",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.pointx,
      point_y: record.pointy,
      offense: record.event_type,
      address: record.address2,
      date_time: record.start_time,
    };
  }
  //#endregion

  //#region DAILY ACTIVITY PERSON
  async insertDailyActivityPerson(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityPerson = await db.query(
        `SELECT 
          daily_logs_person.first_name,
          daily_logs_person.middle_name,
          daily_logs_person.last_name,
          daily_logs_person.dob as date_of_birth,
          daily_logs_person.master_name_id,
          daily_logs_person.id as linked_id,
          daily_logs.id as parent_id,
          daily_logs_person.created_date,
          daily_logs_person.edited_date,
          daily_logs.pointx as point_x,
          daily_logs.pointy as point_y,
          daily_logs_person.person_pointx as person_point_x,
          daily_logs_person.person_pointy as person_point_y,
          daily_logs.event_type as offense,
          daily_logs_person.address,
          daily_logs.start_time as date_time
        FROM ${this.department.database_name_with_dot}daily_logs_person 
        JOIN ${this.department.database_name_with_dot}daily_logs ON daily_logs.id = ${this.department.database_name_with_dot}daily_logs_person.incident_no
        WHERE 
          daily_logs_person.id = ?
          AND daily_logs.deleted IS NULL`,
        [linked_id]
      );

      const record = dailyActivityPerson[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseDailyActivityPerson(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting daily activity person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting daily activity person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateDailyActivityPerson(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityPerson = await db.query(
        `SELECT 
          daily_logs_person.first_name,
          daily_logs_person.middle_name,
          daily_logs_person.last_name,
          daily_logs_person.dob as date_of_birth,
          daily_logs_person.master_name_id,
          daily_logs_person.id as linked_id,
          daily_logs.id as parent_id,
          daily_logs_person.created_date,
          daily_logs_person.edited_date,
          daily_logs.pointx as point_x,
          daily_logs.pointy as point_y,
          daily_logs_person.person_pointx as person_point_x,
          daily_logs_person.person_pointy as person_point_y,
          daily_logs.event_type as offense,
          daily_logs_person.address,
          daily_logs.start_time as date_time
        FROM ${this.department.database_name_with_dot}daily_logs_person 
        JOIN ${this.department.database_name_with_dot}daily_logs ON daily_logs.id = ${this.department.database_name_with_dot}daily_logs_person.incident_no
        WHERE 
          daily_logs_person.id = ?
          AND daily_logs.deleted IS NULL`,
        [linked_id]
      );

      const record = dailyActivityPerson[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseDailyActivityPerson(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating daily activity person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating daily activity person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteDailyActivityPerson(linked_ids) {
    let db;
    try {
      db = await this.pool.getConnection();

      let result;

      for (const linkedId of linked_ids) {
        result = await this.delete({
          linked_id: linkedId,
          linked_no: linkedId,
          linked_source: "Daily Activity Person",
        });
      }

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting daily activity person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting daily activity person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseDailyActivityPerson(record) {
    return {
      ...record,
      linked_source: "Daily Activity Person",
      parent_source: "Daily Activity",
    };
  }
  //#endregion DAILY ACTIVITY PERSON

  //#region DAILY ACTIVITY BUSINESS
  async insertDailyActivityBusiness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityBusiness = await db.query(
        `SELECT 
          daily_logs_business.master_business_id,
          daily_logs_business.id as linked_id,
          daily_logs.id as parent_id,
          daily_logs_business.created_date,
          daily_logs_business.edited_date,
          daily_logs.pointx as point_x,
          daily_logs.pointy as point_y,
          daily_logs.event_type as offense,
          daily_logs_business.business_address as address,
          daily_logs.start_time as date_time
        FROM ${this.department.database_name_with_dot}daily_logs_business 
        JOIN ${this.department.database_name_with_dot}daily_logs ON daily_logs.id = ${this.department.database_name_with_dot}daily_logs_business.incident_no
        WHERE 
          daily_logs_business.id = ?
          AND
          daily_logs.deleted IS NULL`,
        [linked_id]
      );

      const record = dailyActivityBusiness[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseDailyActivityBusiness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting daily activity business failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting daily activity business failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateDailyActivityBusiness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityBusiness = await db.query(
        `SELECT 
          daily_logs_business.master_business_id,
          daily_logs_business.id as linked_id,
          daily_logs.id as parent_id,
          daily_logs_business.created_date,
          daily_logs_business.edited_date,
          daily_logs.pointx as point_x,
          daily_logs.pointy as point_y,
          daily_logs.event_type as offense,
          daily_logs_business.business_address as address,
          daily_logs.start_time as date_time
        FROM ${this.department.database_name_with_dot}daily_logs_business 
        JOIN ${this.department.database_name_with_dot}daily_logs ON daily_logs.id = ${this.department.database_name_with_dot}daily_logs_business.incident_no
        WHERE 
          daily_logs_business.id = ?
          AND daily_logs.deleted IS NULL`,
        [linked_id]
      );

      const record = dailyActivityBusiness[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseDailyActivityBusiness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating daily activity business failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating daily activity business failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteDailyActivityBusiness(linked_ids) {
    let db;
    try {
      db = await this.pool.getConnection();

      let result;

      for (const linkedId of linked_ids) {
        result = await this.delete({
          linked_id: linkedId,
          linked_no: linkedId,
          linked_source: "Daily Activity Business",
        });
      }

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting daily activity business failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting daily activity business failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseDailyActivityBusiness(record) {
    return {
      ...record,
      linked_source: "Daily Activity Business",
      parent_source: "Daily Activity",
    };
  }
  //#endregion DAILY ACTIVITY BUSINESS

  //#region DAILY ACTIVITY VEHICLE
  async insertDailyActivityVehicle(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityVehicle = await db.query(
        `SELECT 
          daily_logs_vehicle.vehicle_id,
          daily_logs_vehicle.id as linked_id,
          daily_logs.id as parent_id,
          daily_logs_vehicle.created_date,
          daily_logs_vehicle.edited_date,
          daily_logs.event_type as offense,
          daily_logs.start_time as date_time,
          daily_logs.pointx as point_x,
          daily_logs.pointy as point_y
        FROM ${this.department.database_name_with_dot}daily_logs_vehicle 
        JOIN ${this.department.database_name_with_dot}daily_logs ON daily_logs.id = ${this.department.database_name_with_dot}daily_logs_vehicle.incident_no
        WHERE 
          daily_logs_vehicle.id = ?
          AND daily_logs.deleted IS NULL`,
        [linked_id]
      );

      const record = dailyActivityVehicle[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseDailyActivityVehicle(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting daily activity vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting daily activity vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updateDailyActivityVehicle(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityVehicle = await db.query(
        `SELECT 
          daily_logs_vehicle.vehicle_id,
          daily_logs_vehicle.id as linked_id,
          daily_logs.id as parent_id,
          daily_logs_vehicle.created_date,
          daily_logs_vehicle.edited_date,
          daily_logs.event_type as offense,
          daily_logs.start_time as date_time
        FROM ${this.department.database_name_with_dot}daily_logs_vehicle 
        JOIN ${this.department.database_name_with_dot}daily_logs ON daily_logs.id = ${this.department.database_name_with_dot}daily_logs_vehicle.incident_no
        WHERE 
          daily_logs_vehicle.id = ?
          AND daily_logs.deleted IS NULL`,
        [linked_id]
      );

      const record = dailyActivityVehicle[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseDailyActivityVehicle(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating daily activity vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating daily activity vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteDailyActivityVehicle(linked_ids) {
    let db;
    try {
      db = await this.pool.getConnection();

      let result;

      for (const linkedId of linked_ids) {
        result = await this.delete({
          linked_id: linkedId,
          linked_no: linkedId,
          linked_source: "Daily Activity Vehicle",
        });
      }

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting daily activity vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting daily activity vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseDailyActivityVehicle(record) {
    return {
      ...record,
      linked_source: "Daily Activity Vehicle",
      parent_source: "Daily Activity",
    };
  }
  //#endregion DAILY ACTIVITY VEHICLE

  //#region PERMIT
  async insertPermit(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const permits = await db.query(`SELECT * FROM ${this.department.database_name_with_dot}permits WHERE id = ?`, [
        linked_id,
      ]);

      const record = permits[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parsePermit(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting permit failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting permit failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updatePermit(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const permits = await db.query(`SELECT * FROM ${this.department.database_name_with_dot}permits WHERE id = ?`, [
        linked_id,
      ]);

      const record = permits[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parsePermit(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating permit failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating permit failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deletePermit(linked_ids) {
    let db;
    try {
      db = await this.pool.getConnection();

      let result;

      for (const linkedId of linked_ids) {
        result = await this.delete({
          linked_id: linkedId,
          linked_source: "Permit",
        });
      }

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting permit failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting permit failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parsePermit(record) {
    return {
      linked_id: record.id,
      linked_source: "Permit",
      created_date: record.created_date,
      edited_date: record.edited_date,
      point_x: record.pointx,
      point_y: record.pointy,
      person_point_x: record.person_pointx,
      person_point_y: record.person_pointy,
      address: record.address2,
      date_time: record.issued_date,
      offense: record.permit_type,
    };
  }
  //#endregion

  //#region PERMIT PERSON
  async insertPermitPerson(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const permitPerson = await db.query(
        `SELECT 
          permit_person.first_name,
          permit_person.middle_name,
          permit_person.last_name,
          permit_person.dob as date_of_birth,
          permit_person.master_name_id,
          permit_person.id as linked_id,
          permits.id as parent_id,
          permits.id as parent_no,
          permit_person.created_date,
          permit_person.edited_date,
          permits.pointx as point_x,
          permits.pointy as point_y,
          permit_person.person_pointx as person_point_x,
          permit_person.person_pointy as person_point_y,
          permits.permit_type as offense,
          permit_person.address,
          permits.issued_date as date_time
        FROM ${this.department.database_name_with_dot}permit_person 
        JOIN ${this.department.database_name_with_dot}permits ON permits.id = ${this.department.database_name_with_dot}permit_person.permit_id
        WHERE 
          permit_person.id = ?`,
        [linked_id]
      );

      const record = permitPerson[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parsePermitPerson(record));

      if (!result.status) {
        throw new Error(result.error);
      }
      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting permit person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting permit person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updatePermitPerson(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const permitPerson = await db.query(
        `SELECT 
          permit_person.first_name,
          permit_person.middle_name,
          permit_person.last_name,
          permit_person.dob as date_of_birth,
          permit_person.master_name_id,
          permit_person.id as linked_id,
          permits.id as parent_id,
          permits.id as parent_no,
          permit_person.created_date,
          permit_person.edited_date,
          permits.pointx as point_x,
          permits.pointy as point_y,
          permit_person.person_pointx as person_point_x,
          permit_person.person_pointy as person_point_y,
          permits.permit_type as offense,
          permit_person.address,
          permits.issued_date as date_time
        FROM ${this.department.database_name_with_dot}permit_person 
        JOIN ${this.department.database_name_with_dot}permits ON permits.id = ${this.department.database_name_with_dot}permit_person.permit_id
        WHERE 
          permit_person.id = ?`,
        [linked_id]
      );

      const record = permitPerson[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parsePermit(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating permit person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating permit person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deletePermitPerson(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const result = await this.delete({
        linked_id: linked_id,
        linked_no: linked_id,
        linked_source: "Permit Person",
      });

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting permit person failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting permit person failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parsePermitPerson(record) {
    return {
      ...record,
      linked_source: "Permit Person",
      parent_source: "Permit",
    };
  }
  //#endregion PERMIT PERSON

  //#region PERMIT VEHICLE
  async insertPermitVehicle(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const [record] = await db.query(
        `SELECT 
          permit_vehicle.vehicle_id,
          permit_vehicle.id as linked_id,
          permits.id as parent_id,
          permits.id as parent_no,
          permit_vehicle.created_date,
          permit_vehicle.edited_date,
          permits.permit_type as offense,
          permits.issued_date as date_time,
          permits.pointx as point_x,
          permits.pointy as point_y,
          permits.address2 as address
        FROM ${this.department.database_name_with_dot}permit_vehicle 
        JOIN ${this.department.database_name_with_dot}permits ON permits.id = ${this.department.database_name_with_dot}permit_vehicle.permit_id
        WHERE 
          permit_vehicle.id = ?`,
        [linked_id]
      );

      if (!record) {
        return;
      }

      const result = await this.insert(this.parsePermitVehicle(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting permit vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting permit vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updatePermitVehicle(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const [record] = await db.query(
        `SELECT 
          permit_vehicle.vehicle_id,
          permit_vehicle.id as linked_id,
          permits.id as parent_id,
          permits.id as parent_no,
          permit_vehicle.created_date,
          permit_vehicle.edited_date,
          permits.permit_type as offense,
          permits.address2 as address,
          permits.issued_date as date_time,
          permits.pointx as point_x,
          permits.pointy as point_y
        FROM ${this.department.database_name_with_dot}permit_vehicle 
        JOIN ${this.department.database_name_with_dot}permits ON permits.id = ${this.department.database_name_with_dot}permit_vehicle.permit_id
        WHERE 
          permit_vehicle.id = ?`,
        [linked_id]
      );

      if (!record) {
        return;
      }

      const result = await this.update(this.parsePermitVehicle(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating permit vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating permit vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deletePermitVehicle(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const result = await this.delete({
        linked_id: linked_id,
        linked_no: linked_id,
        linked_source: "Permit Vehicle",
      });

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting permit vehicle failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting permit vehicle failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parsePermitVehicle(record) {
    return {
      ...record,
      linked_source: "Permit Vehicle",
      parent_source: "Permit",
    };
  }
  //#endregion PERMIT VEHICLE

  //#region PERMIT BUSINESS
  async insertPermitBusiness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const [record] = await db.query(
        `SELECT 
          permit_business.master_business_id,
          permit_business.id as linked_id,
          permits.id as parent_id,
          permits.id as parent_no,
          permit_business.created_date,
          permit_business.edited_date,
          permits.pointx as point_x,
          permits.pointy as point_y,
          permits.permit_type as offense,
          permit_business.business_address as address,
          permits.issued_date as date_time
        FROM ${this.department.database_name_with_dot}permit_business 
        JOIN ${this.department.database_name_with_dot}permits ON permits.id = ${this.department.database_name_with_dot}permit_business.permit_id
        WHERE 
          permit_business.id = ?`,
        [linked_id]
      );

      if (!record) {
        return;
      }

      const result = await this.insert(this.parsePermitBusiness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting permit business failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting permit business failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async updatePermitBusiness(linked_id) {
    let db;

    try {
      db = await this.pool.getConnection();

      const dailyActivityBusiness = await db.query(
        `SELECT 
          permit_business.master_business_id,
          permit_business.id as linked_id,
          permits.id as parent_id,
          permits.id as parent_no,
          permit_business.created_date,
          permit_business.edited_date,
          permits.pointx as point_x,
          permits.pointy as point_y,
          permits.permit_type as offense,
          permit_business.business_address as address,
          permits.issued_date as date_time
        FROM ${this.department.database_name_with_dot}permit_business 
        JOIN ${this.department.database_name_with_dot}permits ON permits.id = ${this.department.database_name_with_dot}permit_business.permit_id
        WHERE 
          permit_business.id = ?`,
        [linked_id]
      );

      const record = dailyActivityBusiness[0];

      if (!record) {
        return;
      }

      const result = await this.update(this.parseDailyActivityBusiness(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network updating daily activity business failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network updating daily activity business failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deletePermitBusiness(linked_ids) {
    let db;
    try {
      db = await this.pool.getConnection();

      let result;

      for (const linkedId of linked_ids) {
        result = await this.delete({
          linked_id: linkedId,
          linked_no: linkedId,
          linked_source: "Permit Business",
        });
      }

      if (result && !result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting permit business failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting permit business failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parsePermitBusiness(record) {
    return {
      ...record,
      linked_source: "Permit Business",
      parent_source: "Permit",
    };
  }
  //#endregion PERMIT BUSINESS

  //#region MASTER NAME ATTACHMENT
  async insertMasterNameAttachment(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      const masterNameAttachments = await db.query(
        `SELECT * FROM ${this.department.database_name_with_dot}mastername_attachments WHERE id = ? AND deleted IS NULL`,
        [linked_id]
      );

      const record = masterNameAttachments[0];

      if (!record) {
        return;
      }

      const result = await this.insert(this.parseMasterNameAttachment(record));

      if (!result.status) {
        throw new Error(result.error);
      }

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network inserting master name attachment failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network inserting master name attachment failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  async deleteMasterNameAttachment(linked_id) {
    let db;
    try {
      db = await this.pool.getConnection();

      await this.delete({ linked_id, linked_source: "Master Name Attachment" });

      return new SuccessResult();
    } catch (err) {
      globalThis.logger.error("sna network deleting master name attachment failed");
      globalThis.logger.error(err);
      return new ErrorResult("sna network deleting master name attachment failed", err);
    } finally {
      if (db) {
        db.release();
      }
    }
  }

  parseMasterNameAttachment(record) {
    return {
      master_name_id: record.master_name_id,
      linked_id: record.id,
      linked_source: "Master Name Attachment",
      created_date: record.edited_date,
      edited_date: record.edited_date,
      custom_data: record.file_name,
    };
  }
  //#endregion

  async isRecordExist(linked_id, linked_source) {
    let query;
    if (linked_source === "Victim") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}victim WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Arrest") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}arrest WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Suspect") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}suspect WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Reportee") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}reportee WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Involved Individual") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}reportee WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Property") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}property WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Evidence") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}evidence WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Incident Vehicle") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}incident_vehicle WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Uof Subject") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}uof WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "FIR") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}fir WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Warrant-Citation Arrest") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}arrest_non WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Traffic Crash") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}traffic WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Traffic Unit") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}traffic_unit WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Traffic Person") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}traffic_person WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Traffic Citation") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}traffic_citations WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Traffic Citation Witness") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}traffic_citation_witness WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Court Management") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}traffic_citations_court WHERE id = ? AND deleted IS NULL AND expungement IS NULL`;
    } else if (linked_source === "Daily Activity") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}daily_logs WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Daily Activity Person") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}daily_logs_person WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Daily Activity Business") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}daily_logs_business WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Daily Activity Vehicle") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}daily_logs_vehicle WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Permit") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}permits WHERE id = ?`;
    } else if (linked_source === "Permit Person") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}permit_person WHERE id = ?`;
    } else if (linked_source === "Permit Vehicle") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}permit_vehicle WHERE id = ?`;
    } else if (linked_source === "Permit Business") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}permit_business WHERE id = ?`;
    } else if (linked_source === "Master Name Attachment") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}mastername_attachments WHERE id = ? AND deleted IS NULL`;
    } else if (linked_source === "Incident") {
      query = `SELECT COUNT(*) as Count FROM ${this.department.database_name_with_dot}incident WHERE id = ? AND deleted IS NULL`;
    }

    if (!query) {
      return false;
    }

    let db;
    try {
      db = await this.pool.getConnection();

      return (await db.query(query, [linked_id]))[0].Count > 0;
    } catch (err) {
      globalThis.logger.error(err);
      throw err;
    } finally {
      if (db) {
        db.release();
      }
    }
  }
}

module.exports = SnaNetwork;
