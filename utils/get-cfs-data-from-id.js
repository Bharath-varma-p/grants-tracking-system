const { getPools } = require("./database");
const { runSql } = require("./sql");

module.exports.getCFSDataFromId = async function (databaseName, department, id) {
  const { pool } = getPools(department.path);
  return runSql(
    pool,
    `
      SELECT 
        MasterIncidentID, 
        MasterIncidentID as MasterIncidentNumber, 
        MasterIncidentNumber as master_incident,
        DATE_FORMAT(ResponseDate,'%m/%d/%Y %H:%i') as ResponseDate, 
        Jurisdiction, 
        FinalProblemDescription, 
        Address, 
        Locationtype, 
        Longitude, 
        Latitude, 
        right(DATE_FORMAT(TimeFirstUnitAssigned,'%m/%d/%Y %H:%i'),5) AS dispatch_time, 
        right(DATE_FORMAT(TimeFirstUnitArrived,'%m/%d/%Y %H:%i'),5) as arrival_time, 
        right(DATE_FORMAT(FixedTimeCallClosed,'%m/%d/%Y %H:%i'),5) as cleared_time, 
        DATE_FORMAT(TimePhonePickup,'%m/%d/%Y %H:%i') as ReportedDate, 
        DATE_FORMAT(FixedTimeCallClosed,'%m/%d/%Y %H:%i') as ClosedDate,
        PostalCode, 
        City,
        State,
        County
      FROM ${databaseName} 
      WHERE ID=?`,
    [id]
  );
};
