const { getPools } = require("./database");
const { SuccessResult, ErrorResult } = require("./result");

module.exports.setActionTakenOnCFS = async function ({ databaseName, actionTaken, id, department }) {
  const isCFS = databaseName && databaseName.startsWith("cfs.");

  const { pool } = getPools(department.path);

  let db;
  try {
    db = await pool.getConnection();

    if (isCFS) {
      await db.query(
        `
          UPDATE cfs.incident_data A
          JOIN 
          (
              SELECT MasterIncidentID FROM cfs.incident_data
              WHERE id = ?
          ) B ON B.MasterIncidentID = A.MasterIncidentID
          JOIN cfs.units ON A.ID = cfs.units.IncidentID
          SET action_taken=?
          WHERE UnitHomeJurisdiction = '${department.cfs_name}' 
        `,
        [id, actionTaken]
      );

      await db.query(
        `
        update ${department.database_name_with_dot}incident_datap9 
        join cfs.incident_data ON incident_datap9.MasterIncidentID = cfs.incident_data.MasterIncidentID
        set incident_datap9.action_taken=? 
        where 
            cfs.incident_data.id=?
            AND
            deleted IS NULL
        `,
        [actionTaken, id]
      );
    } else {
      await db.query(
        `
          update ${department.database_name_with_dot}incident_datap9 A
          join (
              select MasterIncidentID FROM ${department.database_name_with_dot}incident_datap9 WHERE id = ? AND deleted IS NULL
          ) B ON A.MasterIncidentID = B.MasterIncidentID
          set action_taken=? 
          where A.deleted IS NULL`,
        [id, actionTaken]
      );

      await db.query(
        `
        update cfs.incident_data A
        JOIN 
        (
            SELECT MasterIncidentID FROM ${department.database_name_with_dot}incident_datap9
            WHERE id = ?
        ) B ON B.MasterIncidentID = A.MasterIncidentID
        JOIN cfs.units ON A.ID = cfs.units.IncidentID
        SET action_taken=?
        WHERE 
            UnitHomeJurisdiction = '${department.cfs_name}' 
        `,
        [id, actionTaken]
      );
    }

    return new SuccessResult();
  } catch (error) {
    return new ErrorResult(error);
  } finally {
    if (db) {
      db.release();
    }
  }
};
