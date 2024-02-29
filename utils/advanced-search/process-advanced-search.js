const { offenseNonCriminalAdvancedSearch } = require("./offense-non-criminal");
const { dailyActivityAdvancedSearch } = require("./daily-activity");
const { trafficCrashAdvancedSearch } = require("./traffic-crash");
const { trafficCitationAdvancedSearch } = require("./traffic-citation");
const { siemAdvancedSearch } = require("./siem");
const { userActivityAdvancedSearch } = require("./user-activity");
const { storageDataAdvancedSearch } = require("./storage-data");
const { caseManagementAdvancedSearch } = require("./case-management");
const { masterNameAdvancedSearch } = require("./master-name");
const { masterVehicleAdvancedSearch } = require("./master-vehicle");
const { trainingAdvancedSearch } = require("./training");
const { auditLogsAdvancedSearch } = require("./audit-logs");
const { warrantCitationArrestAdvancedSearch } = require("./warrant-citation-arrest");
const { vacationWatchAdvancedSearch } = require("./vacation-watch-advanced-search");
const { masterNameSolveSearch } = require("./master-name-solve-search");

module.exports.processAdvancedSearch = function (req, tableOptions) {
  const emptyResult = {
    where: "",
    join: "",
    parameters: "",
    table: "",
  };

  const { name } = tableOptions;

  switch (name) {
    case "siem":
      return siemAdvancedSearch(req);
    case "case_management":
      return caseManagementAdvancedSearch(req);
    case "user_activity":
      return userActivityAdvancedSearch(req, req.department.name);
    case "storage_usage":
      return storageDataAdvancedSearch(req, {
        department: req.department,
        departmentName: req.department.name,
        departments: globalThis.departments,
      });
  }

  if (req.query.apply_search !== "1") {
    return emptyResult;
  }

  switch (name) {
    case "incident":
      return offenseNonCriminalAdvancedSearch(req);
    case "daily_activity":
      return dailyActivityAdvancedSearch(req);
    case "traffic_crash":
      return trafficCrashAdvancedSearch(req);
    case "traffic_citation":
      return trafficCitationAdvancedSearch(req);
    case "warrant_citation_arrest":
      return warrantCitationArrestAdvancedSearch(req);
    case "master_name":
      return masterNameAdvancedSearch(req);
    case "master_vehicle":
      return masterVehicleAdvancedSearch(req);
    case "training":
      return trainingAdvancedSearch(req);
    case "vacation_watch":
      return vacationWatchAdvancedSearch(req);
    case "audit_logs":
      return auditLogsAdvancedSearch(req);
    case "master_name_solve_search":
      return masterNameSolveSearch(req);
  }

  return emptyResult;
};
