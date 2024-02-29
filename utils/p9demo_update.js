const { getPools } = require("./database");

module.exports.updateP9Demo = async function (req, res) {
  //If not admin and is live server, then sending unauthorized error.
  if (
    process.env.mode === "production" &&
    req.session.passport.user.username != "mozer_rms" &&
    req.session.passport.user.username != "CCole"
  ) {
    return res.status(403).end();
  }

  req.setTimeout(3600000);
  res.setHeader("Content-Type", "text/html");

  const { pool } = getPools("sna");

  const db = await pool.getConnection();

  try {
    try {
      globalThis.logger.info("Deleting training data");
      await res.write("Deleting training data<br/>");
      await db.query(
        `delete from P9Demo.incident where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.arrest where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.suspect where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.victim where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.property where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.evidence where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1)`
      );
      await db.query(
        `delete from P9Demo.reportee where incident_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.witness where incident_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.daily_logs where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(`delete from P9Demo.daily_notes where last_updated is null;`);
      await db.query(
        `delete from P9Demo.traffic where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.fir where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.arrest_non where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.maintenance where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.narrative where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.tows where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.traffic_citations where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.permits where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.permit_person where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.permit_business where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.permit_vehicle where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.incident_datap9 where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.commentsp9 where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `delete from P9Demo.unitsp9 where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );

      await globalThis.logger.info("Deleting training data");
      await res.write("Updatating P9Demo from norwood PD training data<br/>");
      await db.query(
        `insert into P9Demo.incident 
        (
          Ori,
          incident_no,
          orc_no,
          attempted_completed,
          suspected_of_using,
          number_of_premise,
          date_time,
          report_date_time,
          case_clearences,
          clearence_date,
          use_of_force,
          Address2,
          Address,
          Neighborhood,
          City,
          County,
          State,
          zip_code,
          Country,
          PointX,
          PointY,
          cargo_theft,
          larceny_type,
          location_type,
          entry_method,
          forced,
          opening,
          side,
          operation_method,
          criminal_activity,
          weapon_force_type,
          day_night,
          hate_bias,
          hate_type,
          gtre,
          created_date,
          rcno,
          inci_plus,
          incident_seq_no,
          narrative,
          edited_date,
          user,
          entered_by,
          assist_officerList,
          enteredBy,
          outside_force,
          officer_approach,
          ambush,
          initial_contact_circumstance,
          response,
          other_ori1,
          other_ori2,
          other_ori3,
          other_ori4,
          consulted_prior,
          deleted,
          temperature,
          weather_main,
          weather_description,
          humidity,
          pressure,
          wind_speed,
          cloud,
          rain,
          report_type,
          call_number,
          dispatch_time,
          arrival_time,
          clearence_time,
          occurred_from,
          occurred_to,
          cleared_by,
          officer_id,
          officer_badge,
          user_approved,
          supervisor_approved,
          supervisor_name,
          supervisor_id,
          supervisor_badge,
          user_approved_on,
          user_id,
          user_badge,
          user_name,
          supervisor_approved_on,
          officer_note_to_supervisor,
          supervisor_note_to_officer,
          follow_up_assigned_officer,
          non_incident,
          apt_no,
          saveProgress,
          linked_incident_no,
          pageRemained,
          follow_up_notes,
          close_follow_up,
          case_close_date,
          nibrs_submission_date,
          resubmit_oibrs,
          assisting_officers,
          reviewed,
          reviewed_by,
          reviewed_date,
          camera_recording,
          confidential,
          narrative_reviewed,
          master_incident,
          local_code,
          business_name,
          batch_label,
          ordering_no,
          component_save_progress,
          assigned_investigators,
          last_approval_data,
          random_uuid
        )
        select 
          Ori,
          incident_no,
          orc_no,
          attempted_completed,
          suspected_of_using,
          number_of_premise,
          date_time,
          report_date_time,
          case_clearences,
          clearence_date,
          use_of_force,
          Address2,
          Address,
          Neighborhood,
          City,
          County,
          State,
          zip_code,
          Country,
          PointX,
          PointY,
          cargo_theft,
          larceny_type,
          location_type,
          entry_method,
          forced,
          opening,
          side,
          operation_method,
          criminal_activity,
          weapon_force_type,
          day_night,
          hate_bias,
          hate_type,
          gtre,
          created_date,
          rcno,
          inci_plus,
          incident_seq_no,
          narrative,
          edited_date,
          user,
          entered_by,
          assist_officerList,
          enteredBy,
          outside_force,
          officer_approach,
          ambush,
          initial_contact_circumstance,
          response,
          other_ori1,
          other_ori2,
          other_ori3,
          other_ori4,
          consulted_prior,
          deleted,
          temperature,
          weather_main,
          weather_description,
          humidity,
          pressure,
          wind_speed,
          cloud,
          rain,
          report_type,
          call_number,
          dispatch_time,
          arrival_time,
          clearence_time,
          occurred_from,
          occurred_to,
          cleared_by,
          officer_id,
          officer_badge,
          user_approved,
          supervisor_approved,
          supervisor_name,
          supervisor_id,
          supervisor_badge,
          user_approved_on,
          user_id,
          user_badge,
          user_name,
          supervisor_approved_on,
          officer_note_to_supervisor,
          supervisor_note_to_officer,
          follow_up_assigned_officer,
          non_incident,
          apt_no,
          saveProgress,
          linked_incident_no,
          pageRemained,
          follow_up_notes,
          close_follow_up,
          case_close_date,
          nibrs_submission_date,
          resubmit_oibrs,
          assisting_officers,
          reviewed,
          reviewed_by,
          reviewed_date,
          camera_recording,
          confidential,
          narrative_reviewed,
          master_incident,
          local_code,
          business_name,
          batch_label,
          ordering_no,
          component_save_progress,
          assigned_investigators,
          last_approval_data,
          random_uuid
        from norwood.incident where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.arrest select * from norwood.arrest where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.suspect select * from norwood.suspect where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.victim select * from norwood.victim where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.property select * from norwood.property where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.evidence select * from norwood.evidence where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.reportee select * from norwood.reportee where incident_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.witness select * from norwood.witness where incident_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.daily_logs select * from norwood.daily_logs where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.daily_notes (id, user, user_employee_id, created_date, to_whom, to_whom_id, note, check_done, completed_on, to_whom_user, department_wide, custom_data) select id, user, user_employee_id, created_date, to_whom, to_whom_id, note, check_done, completed_on, to_whom_user, department_wide, custom_data from norwood.daily_notes where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.traffic select * from norwood.traffic where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.fir select * from norwood.fir where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.arrest_non select * from norwood.arrest_non where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.maintenance select * from norwood.maintenance where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.narrative select * from norwood.narrative where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.tows select * from norwood.tows where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.traffic_citations select * from norwood.traffic_citations where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.permits select * from norwood.permits where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.permit_person select * from norwood.permit_person where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.permit_vehicle select * from norwood.permit_vehicle where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.permit_business select * from norwood.permit_business where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.incident_datap9 select * from norwood.incident_datap9 where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.commentsp9 select * from norwood.commentsp9 where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(
        `insert into P9Demo.unitsp9 select * from norwood.unitsp9 where created_date>= (Select last_updated from P9Demo.daily_notes order by id asc limit 1);`
      );
      await db.query(`update P9Demo.daily_notes set last_updated=NOW()`);
    } catch (err) {
      globalThis.logger.error(err);
      res.write("Update failed<br/>");
      res.write(err.sqlMessage);
    }

    const completionDate = new Date();
    globalThis.logger.info("Update completed:" + completionDate);
    res.write("<br>Update completed:" + completionDate);
  } catch (err) {
    globalThis.logger.error(err);
    throw err;
  } finally {
    if (db) {
      db.release();
    }
  }
};
