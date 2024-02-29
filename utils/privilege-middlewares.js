/* eslint-disable no-unused-vars */
const authHelper = require("./auth-helper");
const {
  ROLE_POWER_ADMIN,
  PRIVILEGE_WARRANT_CITATION_ARREST,
  PRIVILEGE_COURT_MANAGEMENT,
  PRIVILEGE_OFFENSE_NON_CRIMINAL,
  PRIVILEGE_DAILY_ACTIVITY_DATABASE,
  PRIVILEGE_FIR,
  PRIVILEGE_VEHICLE_MAINTENANCE,
  PRIVILEGE_PERMITS,
  PRIVILEGE_TRAFFIC_CITATION_WARNING,
  PRIVILEGE_TRAFFIC_CRASH,
  PRIVILEGE_EVIDENCE_PROPERTY,
  PRIVILEGE_MASTER_NAMES,
  PRIVILEGE_TRAININGS,
  PRIVILEGE_MASTER_BUSINESSES,
  PRIVILEGE_VACATION_WATCH,
} = require("./auth-constants");

function redirectTo401(req, res, message) {
  const isAjax = req.xhr;
  if (isAjax) {
    res.status(401).send(message);
  } else {
    res.status(401).render("error401", {
      revert_link: "toRoot",
      err: message,
      layout: null,
    });
  }
}

exports.userIsPowerAdmin = (req, res, next) => {
  if (authHelper.hasRole(req, ROLE_POWER_ADMIN)) {
    return next();
  } else {
    res.redirect("/logout");
  }
};

exports.hasRole = (role_name, message) => {
  return function (req, res, next) {
    if (!authHelper.hasRole(req, role_name)) {
      redirectTo401(req, res, message || "You don't have permission");
    } else {
      next();
    }
  };
};

exports.hasPermission = (privilege_name, message) => {
  return function (req, res, next) {
    if (!authHelper.hasPermission(req, privilege_name)) {
      redirectTo401(req, res, message || "You don't have permission");
    } else {
      next();
    }
  };
};

exports.hasReadPermission = (privilege_name, message) => {
  return function (req, res, next) {
    if (!authHelper.hasReadPermission(req, privilege_name)) {
      redirectTo401(req, res, message || "You don't have read permission");
    } else {
      next();
    }
  };
};

exports.hasWritePermission = (privilege_name, message) => {
  return function (req, res, next) {
    if (!authHelper.hasWritePermission(req, privilege_name)) {
      redirectTo401(req, res, message || "You don't have write permission");
    } else {
      next();
    }
  };
};

exports.hasDeletePermission = (privilege_name, message) => {
  return function (req, res, next) {
    if (!authHelper.hasDeletePermission(req, privilege_name)) {
      redirectTo401(req, res, message || "You don't have delete permission");
    } else {
      next();
    }
  };
};

exports.hasSealPermission = (privilege_name, message) => {
  return function (req, res, next) {
    if (!authHelper.hasSealPermission(req, privilege_name)) {
      redirectTo401(req, res, message || "You don't have seal permission");
    } else {
      next();
    }
  };
};

exports.hasPermissionOfAny = (privilege_name, flags, message) => {
  return function (req, res, next) {
    let authorized = false;

    let all_flags = [];

    if (typeof flags == "string") {
      all_flags.push(flags);
    } else if (Array.isArray(flags)) {
      all_flags = [...flags];
    }

    for (const flag of all_flags) {
      if (flag == "read") {
        authorized = authHelper.hasReadPermission(req, privilege_name);
      } else if (flag == "write") {
        authorized = authHelper.hasWritePermission(req, privilege_name);
      } else if (flag == "delete") {
        authorized = authHelper.hasDeletePermission(req, privilege_name);
      } else if (flag == "seal") {
        authorized = authHelper.hasSealPermission(req, privilege_name);
      }

      if (authorized) {
        break;
      }
    }

    if (!authorized) {
      redirectTo401(req, res, message || "You don't have permission");
    } else {
      next();
    }
  };
};

exports.checkAttachmentPrivileges = function (permissionType) {
  return function (req, res, next) {
    let privilegeName = "";
    let hasPermission = false;

    let permissionTypes = [];

    if (typeof permissionType == "string") {
      permissionTypes.push(permissionType);
    } else if (Array.isArray(permissionType)) {
      permissionTypes = [...permissionType];
    }

    const database = req.params.database || req.body.database || req.query.database;

    switch (database) {
      case "arrest_non_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_WARRANT_CITATION_ARREST, permissionTypes);
        privilegeName = "Warrant-Citation Arrest";
        break;
      case "court_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_COURT_MANAGEMENT, permissionTypes);
        privilegeName = "Court Management";
        break;
      case "incident_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_OFFENSE_NON_CRIMINAL, permissionTypes);
        privilegeName = "Offense/Non Criminal";
        break;
      case "property_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_OFFENSE_NON_CRIMINAL, permissionTypes);
        privilegeName = "Offense/Non Criminal";
        break;
      case "arrest_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_OFFENSE_NON_CRIMINAL, permissionTypes);
        privilegeName = "Offense/Non Criminal";
        break;
      case "daily_logs_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_DAILY_ACTIVITY_DATABASE, permissionTypes);
        privilegeName = "Daily Activity Database";
        break;
      case "fir_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_FIR, permissionTypes);
        privilegeName = "FIR";
        break;
      case "maintenance_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_VEHICLE_MAINTENANCE, permissionTypes);
        privilegeName = "Vehicle Maintenance";
        break;
      case "permit_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_PERMITS, permissionTypes);
        privilegeName = "Permits";
        break;
      case "traffic_citation_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_TRAFFIC_CITATION_WARNING, permissionTypes);
        privilegeName = "Traffic Citation/Warning";
        break;
      case "traffic_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_TRAFFIC_CRASH, permissionTypes);
        privilegeName = "Traffic Crash";
        break;
      case "evidence_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_EVIDENCE_PROPERTY, permissionTypes);
        privilegeName = "Evidence & Property";
        break;
      case "mastername_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_MASTER_NAMES, permissionTypes);
        privilegeName = "Master Names";
        break;
      case "trainings_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_TRAININGS, permissionTypes);
        privilegeName = "Trainings";
        break;
      case "vacation_watch_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_VACATION_WATCH, permissionTypes);
        privilegeName = "Vacation Watch";
        break;
      case "business_attachments":
        hasPermission = authHelper.hasPermissionOfAny(req, PRIVILEGE_MASTER_BUSINESSES, permissionTypes);
        privilegeName = "Master Business";
        break;
      default:
        hasPermission = true;
    }

    if (hasPermission) {
      return next();
    }

    const isDelete = req.path.startsWith("/attachments_delete/");
    const isRead = permissionType == "read";

    redirectTo401(
      req,
      res,
      `You don't have permission to ${isDelete ? "delete" : isRead ? "view" : "add/edit"} attachments. ${
        isRead ? "Read" : "Write"
      } permission for ${privilegeName} is required`
    );
  };
};
