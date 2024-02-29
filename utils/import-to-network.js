const { getPools } = require("./database");

module.exports.importToNetwork = async function (req, res) {
  req.setTimeout(3600000);
  res.setHeader("Content-Type", "text/html");

  const { pool } = getPools("sna");

  const db = await pool.getConnection();

  try {
    const fields = [
      "first_name",
      "middle_name",
      "last_name",
      "date_of_birth",
      "master_name_id",
      "vehicle_id",
      "master_business_id",
      "linked_no",
      "linked_id",
      "linked_source",
      "parent_no",
      "parent_id",
      "parent_source",
      "department",
      "created_date",
      "edited_date",
      "point_x",
      "point_y",
      "person_point_x",
      "person_point_y",
      "offense",
      "address",
      "date_time",
      "custom_data",
      "confidential",
    ];

    try {
      await db.query("DROP TABLE IF EXISTS network");

      await db.query(`
      CREATE TABLE network (
        id int NOT NULL AUTO_INCREMENT,
        first_name varchar(100) DEFAULT NULL,
        middle_name varchar(100) DEFAULT NULL,
        last_name varchar(100) DEFAULT NULL,
        date_of_birth varchar(100) DEFAULT NULL,
        master_name_id varchar(100) DEFAULT NULL,
        vehicle_id varchar(100) DEFAULT NULL,
        master_business_id varchar(100) DEFAULT NULL,
        linked_no varchar(50) DEFAULT NULL,
        linked_id int NOT NULL,
        linked_source varchar(100) NOT NULL,
        parent_no varchar(50) DEFAULT NULL,
        parent_id varchar(50) DEFAULT NULL,
        parent_source varchar(100) DEFAULT NULL,
        department varchar(100) DEFAULT NULL,
        created_date datetime DEFAULT NULL,
        edited_date datetime DEFAULT NULL,
        point_x varchar(100) DEFAULT NULL,
        point_y varchar(100) DEFAULT NULL,
        person_point_x varchar(100) DEFAULT NULL,
        person_point_y varchar(100) DEFAULT NULL,
        offense text DEFAULT NULL,
        address text DEFAULT NULL,
        date_time datetime DEFAULT NULL,
        custom_data text DEFAULT NULL,
        confidential VARCHAR(10) DEFAULT NULL,
        PRIMARY KEY (id)
      )
    `);
    } catch (err) {
      globalThis.logger.error(err);
    }

    globalThis.logger.info("Import started:" + new Date());

    const departments = globalThis.departments;

    for (let i = 0; i < departments.length; i++) {
      const dept = departments[i];

      //Victims
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            NULLIF(master_name_id,''),
            NULL,
            NULLIF(master_business_id,''),
            NULL,
            victim.id,
            'Victim',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            victim.created_date,
            victim.edited_date,
            incident.PointX,
            incident.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}victim
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = victim.incident_no
        WHERE 
            victim.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (master_business_id IS NOT NULL AND master_business_id <> '')
            )
        GROUP BY victim.id
        `);

      //Arrests
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULL,
            NULL,
            arrest.id,
            'Arrest',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            arrest.created_date,
            arrest.edited_date,
            arrest.PointX,
            arrest.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            arrest.address,
            arrest_date,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}arrest
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = arrest.incident_no
        WHERE 
            arrest.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        GROUP BY arrest.id
        `);

      //Suspects
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULL,
            NULL,
            suspect.id,
            'Suspect',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            suspect.created_date,
            suspect.edited_date,
            incident.PointX,
            incident.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}suspect
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = suspect.incident_no
        WHERE 
            suspect.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        GROUP BY suspect.id
        `);

      //Reportee
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            reportee_first_name,
            reportee_middle_name,
            reportee_last_name,
            reportee_dob,
            NULLIF(master_name_id,''),
            NULL,
            NULL,
            NULL,
            reportee.id,
            'Reportee',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            incident.created_date,
            reportee.edited_date,
            incident.PointX,
            incident.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}reportee
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = reportee.incident_no
        WHERE 
            reportee.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            individual_type='Reportee'
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
            )
        GROUP BY reportee.id
        `);

      //Involved Individual
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            reportee_first_name,
            reportee_middle_name,
            reportee_last_name,
            reportee_dob,
            NULLIF(master_name_id,''),
            NULL,
            NULL,
            NULL,
            reportee.id,
            'Involved Individual',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            incident.created_date,
            reportee.edited_date,
            incident.PointX,
            incident.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}reportee
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = reportee.incident_no
        WHERE 
            reportee.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (individual_type IS NULL OR individual_type <> 'Reportee')
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
            )
        GROUP BY reportee.id
        `);

      //Witness
      await db.query(`
        INSERT INTO network ( ${fields})
            SELECT  
            witness_first_name,
            witness_middle_name,
            witness_last_name,
            witness_dob,
            NULLIF(master_name_id,''),
            NULL,
            NULL,
            NULL,
            witness.id,
            'Witness',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            incident.created_date,
            witness.edited_date,
            incident.PointX,
            incident.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}witness
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = witness.incident_no
        WHERE 
            witness.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
            )
        GROUP BY witness.id
      `);

      //Property
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            owner_first_name,
            owner_middle_name,
            owner_last_name,
            owner_dob,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULLIF(master_business_id,''),
            NULL,
            property.id,
            'Property',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            property.created_date,
            property.edited_date,
            recovery_pointx,
            recovery_pointy,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            recovery_address,
            DateRecovered,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}property
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = property.incident_no
        WHERE 
            property.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
                OR
                (master_business_id IS NOT NULL AND master_business_id <> '')
            )
        GROUP BY property.id
        `);

      //Evidence
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            reportee_first_name,
            reportee_middle_name,
            reportee_last_name,
            reportee_dob,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULLIF(master_business_id,''),
            NULLIF(evidence_no,''),
            id,
            'Evidence',
            NULLIF(
                IF (linked_source IS NOT NULL AND linked_source  <> '', 
                    CASE 
                        WHEN linked_source  = 'Daily Logs' THEN linked_id
                        WHEN linked_source  = 'FIR' THEN linked_id
                        WHEN linked_source  = 'Traffic Crash' THEN linked_id
                        WHEN linked_source  = 'Traffic Citation' THEN linked_id
                        WHEN linked_source  = 'Warrant-Citation Arrest' THEN linked_id
                        ELSE NULL
                    END,
                    IF (incident_no  IS NOT NULL AND incident_no <> '', incident_no,NULL)
                ),
                ''
            ),
            NULLIF (
                IF (linked_source IS NOT NULL AND linked_source  <> '', 
                    CASE
                        WHEN linked_source = 'Daily Logs' THEN linked_id
                        -- WHEN linked_source = 'FIR' THEN (SELECT IF(COUNT(*) > 1, NULL, id) FROM ${dept.database_name_with_dot}fir WHERE incident_no = ${dept.database_name_with_dot}evidence.linked_id AND deleted IS NULL LIMIT 1)
                        -- WHEN linked_source = 'Traffic Crash' THEN (SELECT IF(COUNT(*) > 1, NULL, id) FROM ${dept.database_name_with_dot}traffic WHERE crash_no = ${dept.database_name_with_dot}evidence.linked_id AND deleted IS NULL LIMIT 1)
                        -- WHEN linked_source = 'Traffic Citation' THEN (SELECT IF(COUNT(*) > 1, NULL, id) FROM ${dept.database_name_with_dot}traffic_citations WHERE citation_no = ${dept.database_name_with_dot}evidence.linked_id AND deleted IS NULL LIMIT 1)
                        -- WHEN linked_source = 'Warrant-Citation Arrest' THEN (SELECT IF(COUNT(*) > 1, NULL, id) FROM ${dept.database_name_with_dot}arrest_non WHERE incident_no = ${dept.database_name_with_dot}evidence.linked_id AND deleted IS NULL LIMIT 1)
                        ELSE NULL
                    END,
                    -- IF (incident_no  IS NOT NULL AND incident_no <> '', (SELECT IF(COUNT(*) > 1, NULL, id) FROM ${dept.database_name_with_dot}incident WHERE incident_no = ${dept.database_name_with_dot}evidence.incident_no AND deleted IS NULL LIMIT 1), NULL)
                    NULL
                ),
                ''
            ),
            NULLIF(
                IF (linked_source IS NOT NULL AND linked_source  <> '', 
                    CASE 
                        WHEN linked_source  = 'Daily Logs' THEN 'Daily Activity'
                        WHEN linked_source  = 'FIR' THEN CONVERT(linked_source USING utf8) 
                        WHEN linked_source  = 'Traffic Crash' THEN CONVERT(linked_source USING utf8) 
                        WHEN linked_source  = 'Traffic Citation' THEN CONVERT(linked_source USING utf8) 
                        WHEN linked_source  = 'Warrant-Citation Arrest' THEN CONVERT(linked_source USING utf8) 
                        ELSE NULL
                    END,
                    IF (incident_no IS NOT NULL AND incident_no <> '' , 'Incident', NULL)
                ),
                ''
            ),
            '${dept.name}',
            created_date,
            edited_date,
            recovery_lng,
            recovery_lat,
            person_pointx,
            person_pointy,
            NULL,
            recovery_address,
            DateRecovered,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}evidence 
        WHERE 
            deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
                OR
                (master_business_id IS NOT NULL AND master_business_id <> '')
            )
        `);

      //Incident Vehicle
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULLIF(vehicle_id,''),
            NULL,
            NULL,
            incident_vehicle.id,
            'Incident Vehicle',
            incident.incident_no,
            incident.id,
            'Incident',
            '${dept.name}',
            incident_vehicle.created_date,
            incident_vehicle.edited_date,
            incident.PointX,
            incident.PointY,
            NULL,
            NULL,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}incident_vehicle
        JOIN ${dept.database_name_with_dot}incident ON incident_vehicle.incident_no = incident.incident_no
        WHERE 
            incident_vehicle.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        GROUP BY incident_vehicle.id
        `);

      //Uof Subject
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULL,
            NULL,
            uof.id,
            'Uof Subject',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            uof.created_date,
            uof.edited_date,
            incident.PointX,
            incident.PointY,
            person_pointx,
            person_pointy,
            IF(LENGTH(incident.orc_no) < 2 OR ISNULL(incident.orc_no), concat(incident.non_incident,'--Incident'), incident.orc_no),
            incident.address2,
            incident.date_time,
            NULL,
            incident.confidential
        FROM ${dept.database_name_with_dot}uof
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = uof.incident_no
        WHERE 
            uof.deleted IS NULL
            AND
            incident.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        GROUP BY uof.id
        `);

      /*
      //Uof Officer
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT
            first_name,
            middle_name,
            last_name,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            uof_officer.id,
            'Uof Officer',
            incident.incident_no,
            incident_id,
            'Incident',
            '${dept.name}',
            uof_officer.created_date,
            uof_officer.edited_date,
            incident.PointX,
            incident.PointY,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}uof_officer
        JOIN ${dept.database_name_with_dot}incident ON incident.incident_no = uof_officer.incident_no
        WHERE
            uof_officer.deleted IS NULL
            AND
            incident.deleted IS NULL
        GROUP BY uof_officer.id
        `);
      */

      //FIR
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULL,
            NULLIF(incident_no,''),
            id,
            'FIR',
            NULLIF(
                IF (linked_source IS NOT NULL AND linked_source <> '', 
                    CASE 
                        WHEN linked_source = 'Incident' THEN (SELECT incident_no FROM ${dept.database_name_with_dot}incident WHERE id = ${dept.database_name_with_dot}fir.linked_id LIMIT 1)
                        WHEN linked_source = 'Traffic Citation' THEN (SELECT citation_no FROM ${dept.database_name_with_dot}traffic_citations WHERE id = ${dept.database_name_with_dot}fir.linked_id LIMIT 1)
                        WHEN linked_source = 'Daily Activity' THEN linked_id
                        WHEN linked_source = 'Warrant-Citation Arrest' THEN linked_id
                        ELSE NULL
                    END,
                    NULL
                ),
                ''
            ),
            NULLIF (
                CASE 
                    WHEN linked_source = 'Warrant-Citation Arrest' THEN NULL
                    ELSE linked_id
                END,
                ''
            ),
            NULLIF(linked_source,''),
            '${dept.name}',
            created_date,
            edited_date,
            PointX,
            PointY,
            person_pointx,
            person_pointy,
            NULL,
            address,
            arrest_date,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}fir
        WHERE 
            deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        `);

      //Warrant-Citation Arrest
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULL,
            NULLIF(incident_no,''),
            id,
            'Warrant-Citation Arrest',
            NULLIF(
                IF (linked_source IS NOT NULL AND linked_source <> '', 
                    CASE 
                        WHEN linked_source = 'Incident' THEN (SELECT incident_no FROM ${dept.database_name_with_dot}incident WHERE id = ${dept.database_name_with_dot}arrest_non.linked_id LIMIT 1)
                        WHEN linked_source = 'Traffic Crash' THEN (SELECT crash_no FROM ${dept.database_name_with_dot}traffic WHERE id = ${dept.database_name_with_dot}arrest_non.linked_id LIMIT 1)
                        WHEN linked_source = 'Traffic Citation' THEN linked_id
                        WHEN linked_source = 'FIR' THEN linked_id
                        WHEN linked_source = 'Daily Activity' THEN linked_id
                        ELSE NULL
                    END,
                    NULL
                ),
                ''
            ),
            NULLIF (
                CASE
                    WHEN linked_source = 'Incident' THEN linked_id
                    WHEN linked_source = 'Traffic Crash' THEN linked_id
                    WHEN linked_source = 'Traffic Citation' THEN NULL
                    WHEN linked_source = 'FIR' THEN NULL
                    ELSE NULL
                END,
            ''),
            NULLIF(linked_source,''),
            '${dept.name}',
            created_date,
            edited_date,
            PointX,
            PointY,
            person_pointx,
            person_pointy,
            orc_no,
            address,
            arrest_date,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}arrest_non
        WHERE 
            deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        `);

      //Traffic Crash
      await db.query(`
      INSERT INTO network ( ${fields})
      SELECT  
          NULL,
          NULL,
          NULL,
          NULL,
          NULL,
          NULL,
          NULL,
          NULLIF(crash_no,''),
          id,
          'Traffic Crash',
          NULLIF(linked_incidentNo,''),
          NULLIF(linked_id,''),
          NULLIF(
            CASE 
                WHEN linked_source = 'Offense-NonCriminal' THEN 'Incident'
                ELSE linked_source
            END,
            ''
          ),
          '${dept.name}',
          created_date,
          edited_date,
          PointX,
          PointY,
          NULL,
          NULL,
          NULL,
          address,
          crash_date,
          NULL,
          NULL
      FROM ${dept.database_name_with_dot}traffic
      WHERE 
          traffic.deleted IS NULL
      `);

      //Traffic Unit
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            owner_first_name,
            owner_middle_name,
            owner_last_name,
            owner_dob,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULL,
            NULL,
            traffic_unit.id,
            'Traffic Unit',
            NULLIF(traffic.crash_no,''),
            traffic.id,
            'Traffic Crash',
            '${dept.name}',
            traffic_unit.created_date,
            traffic_unit.edited_date,
            traffic.PointX,
            traffic.PointY,
            owner_lng,
            owner_lat,
            NULL,
            traffic.address,
            traffic.crash_date,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}traffic_unit
        JOIN ${dept.database_name_with_dot}traffic ON traffic.crash_no = traffic_unit.CrashNo 
        WHERE 
            traffic_unit.deleted IS NULL
            AND
            traffic.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
                OR
                (vehicle_id IS NOT NULL AND vehicle_id <> '')
            )
        GROUP BY traffic_unit.id
        `);

      //Traffic Person
      await db.query(`
        INSERT INTO network ( ${fields})
        SELECT  
            first_name,
            middle_name,
            last_name,
            dob,
            NULLIF(master_name_id,''),
            NULL,
            NULL,
            NULL,
            traffic_person.id,
            'Traffic Person',
            NULLIF(traffic.crash_no,''),
            traffic.id,
            'Traffic Crash',
            '${dept.name}',
            traffic_person.created_date,
            traffic_person.edited_date,
            traffic.PointX,
            traffic.PointY,
            lng,
            lat,
            NULL,
            traffic.address,
            traffic.crash_date,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}traffic_person
        JOIN ${dept.database_name_with_dot}traffic ON traffic.crash_no = traffic_person.CrashNo 
        WHERE 
            traffic_person.deleted IS NULL
            AND
            traffic.deleted IS NULL
            AND
            (
                (master_name_id IS NOT NULL AND master_name_id <> '')
            )
        GROUP BY traffic_person.id
        `);

      //Traffic Citations
      await db.query(`
      INSERT INTO network ( ${fields})
      SELECT  
          first_name,
          middle_name,
          last_name,
          date_of_birth,
          NULLIF(master_name_id,''),
          NULLIF(vehicle_id,''),
          NULL,
          NULLIF(citation_no,''),
          id,
          'Traffic Citation',
          NULLIF(
              IF (linked_source IS NOT NULL AND linked_source <> '', 
                  CASE 
                      WHEN linked_source = 'Offense-NonCriminal' THEN (SELECT incident_no FROM ${dept.database_name_with_dot}incident WHERE id = ${dept.database_name_with_dot}traffic_citations.linked_id LIMIT 1)
                      WHEN linked_source = 'Traffic Crash' THEN (SELECT crash_no FROM ${dept.database_name_with_dot}traffic WHERE id = ${dept.database_name_with_dot}traffic_citations.linked_id LIMIT 1)
                      ELSE NULL
                  END,
                  NULL
              ),
              ''
          ),
          NULLIF ( linked_id ,''),
          NULLIF(IF(linked_source = 'Offense-NonCriminal', 'Incident', linked_source),''),
          '${dept.name}',
          created_date,
          edited_date,
          PointX,
          PointY,
          NULL,
          NULL,
          ${dept.database_name_with_dot}concatCodes(
              IF(orc_code1 IS NULL OR orc_code1 = '', local_code1, orc_code1),
              IF(orc_code2 IS NULL OR orc_code2 = '', local_code2, orc_code2),
              IF(orc_code3 IS NULL OR orc_code3 = '', local_code3, orc_code3),
              IF(orc_code4 IS NULL OR orc_code4 = '', local_code4, orc_code4),
              IF(orc_code5 IS NULL OR orc_code5 = '', local_code5, orc_code5),
              IF(orc_code6 IS NULL OR orc_code6 = '', local_code6, orc_code6)
          ),
          Address,
          citation_date,
          NULL,
          NULL
      FROM ${dept.database_name_with_dot}traffic_citations
      WHERE 
          deleted IS NULL
          AND
          (
              (master_name_id IS NOT NULL AND master_name_id <> '')
              OR
              (vehicle_id IS NOT NULL AND vehicle_id <> '')
          )
      `);

      //Traffic Citation Witness
      await db.query(`
    INSERT INTO network ( ${fields})
    SELECT  
        witness_first_name,
        witness_middle_name,
        witness_last_name,
        witness_dob,
        NULLIF(traffic_citation_witness.master_name_id,''),
        NULL,
        NULL,
        NULL,
        traffic_citation_witness.id,
        'Traffic Citation Witness',
        NULLIF(traffic_citations.citation_no,''),
        traffic_citations.id,
        'Traffic Citation',
        '${dept.name}',
        traffic_citation_witness.created_date,
        traffic_citation_witness.edited_date,
        traffic_citations.PointX,
        traffic_citations.PointY,
        NULL,
        NULL,
        ${dept.database_name_with_dot}concatCodes(
            IF(orc_code1 IS NULL OR orc_code1 = '', local_code1, orc_code1),
            IF(orc_code2 IS NULL OR orc_code2 = '', local_code2, orc_code2),
            IF(orc_code3 IS NULL OR orc_code3 = '', local_code3, orc_code3),
            IF(orc_code4 IS NULL OR orc_code4 = '', local_code4, orc_code4),
            IF(orc_code5 IS NULL OR orc_code5 = '', local_code5, orc_code5),
            IF(orc_code6 IS NULL OR orc_code6 = '', local_code6, orc_code6)
        ),
        traffic_citations.Address,
        traffic_citations.citation_date,
        NULL,
        NULL
    FROM ${dept.database_name_with_dot}traffic_citation_witness
    JOIN ${dept.database_name_with_dot}traffic_citations ON traffic_citations.citation_no = traffic_citation_witness.citation_no
    WHERE 
        traffic_citations.deleted IS NULL
        AND
        traffic_citation_witness.deleted IS NULL
        AND
        (
            (traffic_citation_witness.master_name_id IS NOT NULL AND traffic_citation_witness.master_name_id <> '')
        )
    `);

      //Court Management
      await db.query(`
    INSERT INTO network ( ${fields} )
    SELECT 
        trim(trim(BOTH ',' FROM replace(substring_index(depositor_name,',',2),substring_index(depositor_name,',',1),''))),
        trim(trim(BOTH ',' FROM replace(depositor_name,substring_index(depositor_name,',',2),''))),
        substring_index(depositor_name,',',1),
        dob,
        NULLIF(master_name_id,''),
        NULL,
        NULL,
        NULL,
        id,
        'Court Management',
        NULLIF(linked_data_incidentNo,''),
        NULLIF(linked_data_id,''),
        CASE 
            WHEN data_source = 'Arrest' THEN 'Arrest'
            WHEN data_source = 'Suspect' THEN 'Suspect'
            WHEN data_source = 'Victim' THEN 'Victim'
            WHEN data_source = 'Traffic Citation' THEN 'Traffic Citation'
            WHEN data_source = 'Trafffic Citation' THEN 'Traffic Citation'
            WHEN data_source = 'Warrant-Citation Arrest' THEN 'Warrant-Citation Arrest'
            WHEN data_source = 'Non-NIBRS Arrest' THEN 'Warrant-Citation Arrest'
            ELSE NULL
        END,
        '${dept.name}',
        created_date,
        edited_date,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        court_date,
        NULL,
        NULL
    FROM ${dept.database_name_with_dot}traffic_citations_court
    WHERE 
        deleted IS NULL
        AND
        expungement IS NULL
        AND
        (
            (master_name_id IS NOT NULL AND master_name_id <> '')
        )
    `);

      //Daily Activity
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                daily_logs.id,
                daily_logs.id,
                'Daily Activity',
                NULL,
                NULL,
                NULL,
                '${dept.name}',
                daily_logs.created_date,
                daily_logs.edited_date,
                daily_logs.pointx,
                daily_logs.pointy,
                NULL,
                NULL,
                daily_logs.event_type,
                daily_logs.address2,
                daily_logs.start_time,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}daily_logs 
            WHERE deleted IS NULL
      `);

      //Daily Activity Person
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                daily_logs_person.first_name as reportee_first_name,
                daily_logs_person.middle_name as reportee_middle_name,
                daily_logs_person.last_name as reportee_last_name,
                daily_logs_person.dob as reportee_dob,
                daily_logs_person.master_name_id,
                NULL,
                NULL,
                NULL,
                daily_logs_person.id,
                'Daily Activity Person',
                NULL,
                daily_logs.id,
                'Daily Activity',
                '${dept.name}',
                daily_logs_person.created_date,
                daily_logs_person.edited_date,
                daily_logs.pointx,
                daily_logs.pointy,
                daily_logs_person.person_pointx,
                daily_logs_person.person_pointy,
                daily_logs.event_type,
                daily_logs_person.address,
                daily_logs.start_time,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}daily_logs 
            INNER JOIN ${dept.database_name_with_dot}daily_logs_person ON daily_logs_person.incident_no = daily_logs.id
            WHERE 
                daily_logs_person.master_name_id IS NOT NULL AND daily_logs_person.master_name_id <> ''
                AND
                daily_logs_person.deleted IS NULL
                AND
                daily_logs.deleted IS NULL
      `);

      //Daily Activity Business
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                daily_logs_business.master_business_id,
                NULL,
                daily_logs_business.id,
                'Daily Activity Business',
                NULL,
                daily_logs.id,
                'Daily Activity',
                '${dept.name}',
                daily_logs_business.created_date,
                daily_logs_business.edited_date,
                daily_logs.pointx,
                daily_logs.pointy,
                NULL,
                NULL,
                daily_logs.event_type,
                daily_logs_business.business_address,
                daily_logs.start_time,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}daily_logs 
            INNER JOIN ${dept.database_name_with_dot}daily_logs_business ON daily_logs_business.incident_no = daily_logs.id
            WHERE 
                daily_logs_business.master_business_id IS NOT NULL AND daily_logs_business.master_business_id <> ''
                AND
                daily_logs_business.deleted IS NULL
                AND
                daily_logs.deleted IS NULL
      `);

      //Daily Activity Vehicle
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                daily_logs_vehicle.vehicle_id,
                NULL,
                NULL,
                daily_logs_vehicle.id,
                'Daily Activity Vehicle',
                NULL,
                daily_logs.id,
                'Daily Activity',
                '${dept.name}',
                daily_logs_vehicle.created_date,
                daily_logs_vehicle.edited_date,
                daily_logs.pointx,
                daily_logs.pointy,
                NULL,
                NULL,
                daily_logs.event_type,
                NULL,
                daily_logs.start_time,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}daily_logs 
            INNER JOIN ${dept.database_name_with_dot}daily_logs_vehicle ON daily_logs_vehicle.incident_no = daily_logs.id
            WHERE 
                daily_logs_vehicle.vehicle_id IS NOT NULL AND daily_logs_vehicle.vehicle_id <> ''
                AND
                daily_logs_vehicle.deleted IS NULL
                AND
                daily_logs.deleted IS NULL
      `);

      //Permit
      await db.query(`
        INSERT INTO network ( ${fields} )
        SELECT  
            NULL,
            NULL,
            NULL,
            NULL,
            NULLIF(master_name_id,''),
            NULLIF(vehicle_id,''),
            NULLIF(master_business_id,''),
            NULL,
            id,
            'Permit',
            NULL,
            NULL,
            NULL,
            '${dept.name}',
            created_date,
            edited_date,
            pointx,
            pointy,
            NULL,
            NULL,
            permit_type,
            address2,
            issued_date,
            NULL,
            NULL
        FROM ${dept.database_name_with_dot}permits
        `);

      //Permit Person
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                permit_person.first_name as reportee_first_name,
                permit_person.middle_name as reportee_middle_name,
                permit_person.last_name as reportee_last_name,
                permit_person.dob as reportee_dob,
                permit_person.master_name_id,
                NULL,
                NULL,
                NULL,
                permit_person.id,
                'Permit Person',
                permits.id,
                permits.id,
                'Permit',
                '${dept.name}',
                permit_person.created_date,
                permit_person.edited_date,
                permits.pointx,
                permits.pointy,
                permit_person.person_pointx,
                permit_person.person_pointy,
                permits.permit_type,
                permit_person.address,
                permits.issued_date,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}permits 
            INNER JOIN ${dept.database_name_with_dot}permit_person ON permit_person.permit_id = permits.id
            WHERE 
                permit_person.master_name_id IS NOT NULL AND permit_person.master_name_id <> ''
                AND
                permit_person.deleted IS NULL
      `);

      //Person Business
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                permit_business.master_business_id,
                NULL,
                permit_business.id,
                'Permit Business',
                permits.id,
                permits.id,
                'Permit',
                '${dept.name}',
                permit_business.created_date,
                permit_business.edited_date,
                permits.pointx,
                permits.pointy,
                NULL,
                NULL,
                permits.permit_type,
                permit_business.business_address,
                permits.issued_date,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}permits
            INNER JOIN ${dept.database_name_with_dot}permit_business ON permit_business.permit_id = permits.id
            WHERE 
                permit_business.master_business_id IS NOT NULL AND permit_business.master_business_id <> ''
                AND
                permit_business.deleted IS NULL
      `);

      //Permit Vehicle
      await db.query(`
      INSERT INTO network ( ${fields})
            SELECT 
                NULL,
                NULL,
                NULL,
                NULL,
                NULL,
                permit_vehicle.vehicle_id,
                NULL,
                NULL,
                permit_vehicle.id,
                'Permit Vehicle',
                permits.id,
                permits.id,
                'Permit',
                '${dept.name}',
                permit_vehicle.created_date,
                permit_vehicle.edited_date,
                permits.pointx,
                permits.pointy,
                NULL,
                NULL,
                permits.permit_type,
                permits.address2,
                permits.issued_date,
                NULL,
                NULL
            FROM ${dept.database_name_with_dot}permits 
            INNER JOIN ${dept.database_name_with_dot}permit_vehicle ON permit_vehicle.permit_id = permits.id
            WHERE 
                permit_vehicle.vehicle_id IS NOT NULL AND permit_vehicle.vehicle_id <> ''
                AND
                permit_vehicle.deleted IS NULL
      `);

      //Master Name Attachment
      await db.query(`
        INSERT INTO network ( ${fields} )
        SELECT  
            NULL,
            NULL,
            NULL,
            NULL,
            NULLIF(master_name_id,''),
            NULL,
            NULL,
            NULL,
            id,
            'Master Name Attachment',
            NULL,
            NULL,
            NULL,
            '${dept.name}',
            edited_date,
            edited_date,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            file_name,
            NULL
        FROM ${dept.database_name_with_dot}mastername_attachments
        WHERE
        (
            (master_name_id IS NOT NULL AND master_name_id <> '')
        )
        AND
        deleted IS NULL
      `);

      globalThis.logger.info(`${dept.name} updated succesfully`);
      res.write(`${dept.name} updated succesfully`);
      res.write("<br><br>");
    }

    try {
      globalThis.logger.info("Creating indexes");
      await db.query(
        `CREATE UNIQUE INDEX idx_id_no_source_parent_source_department ON network (linked_id,linked_no,linked_source,parent_source,department )`
      );
      await db.query(`CREATE INDEX idx_parent_id_source_department ON network (parent_id,parent_source,department )`);
      await db.query(`CREATE INDEX idx_parent_no_source_department ON network (parent_no,parent_source,department )`);
      await db.query(`CREATE INDEX idx_no_source_department ON network (linked_no,linked_source,department )`);
      await db.query(`CREATE INDEX idx_master_name_id ON network ( master_name_id )`);
      await db.query(`CREATE INDEX idx_vehicle_id ON network ( vehicle_id )`);
      await db.query(`CREATE INDEX idx_department ON network(department)`);
    } catch (err) {
      globalThis.logger.error(err);
      res.write("Creating indexes failed<br/>");
      res.write(err.sqlMessage);
    }

    const completionDate = new Date();
    globalThis.logger.info("Import completed:" + completionDate);
    res.write("<br>Import completed:" + completionDate);
  } catch (err) {
    globalThis.logger.error(err);
    throw err;
  } finally {
    if (db) {
      db.release();
    }
  }
};
