const authHelper = require("./auth-helper");

module.exports.createViewTemplateVariables = function (req, res, next) {
  let userParams = {};
  let globalVariables = {};

  if (req.session && req.session.passport && req.session.passport.user) {
    if (!req.session.passport.user.privilegesObject) {
      req.session.passport.user.privilegesObject = authHelper.createPrivilegeObject(req);
      req.session.passport.user.rolesObject = authHelper.createRoleObject(req);
    }

    globalVariables = { ...req.session.passport.user.privilegesObject };
    globalVariables.isSupervisor = req.session.passport.user.rolesObject.ROLE_SUPERVISOR;
    globalVariables.isPowerAdmin = req.session.passport.user.rolesObject.ROLE_POWER_ADMIN;
    globalVariables.isProsecutor = req.session.passport.user.rolesObject.ROLE_PROSECUTOR;
    globalVariables.hasUserRole = req.session.passport.user.rolesObject.ROLE_USER;
    globalVariables.user_id = req.session.passport.user.id;
    globalVariables.user = req.session.passport.user.name;
    globalVariables.sensitiveMode = req.session.passport.user.sensitiveMode;
    globalVariables.reports_to = req.session.passport.user.reports_to || "";

    globalVariables.bucketHost = globalThis.bucketHost;
    globalVariables.bucketName = globalThis.bucketName;
    globalVariables.bucketFullURL = globalVariables.bucketHost + globalVariables.bucketName;

    userParams = {
      user: req.session.passport.user.name,
      print_name: req.session.passport.print_name,
      officer_name: req.session.passport.user.name,
      employee_badge: req.session.passport.user.badge_number,
      employee_id: req.session.passport.user.id,
      department: req.session.passport.user.department,
      employee_department: req.session.passport.user.department,
      reports_to: req.session.passport.user.reports_to,
      darkMode: req.session.passport.user.darkMode == 1 ? true : false,
      voiceCommands: req.session.passport.user.voiceCommands == 1 ? true : false,
      whatsnew_notification: req.session.passport.user.whatsnew_notification,
      isPowerAdmin: req.session.passport.user.rolesObject.ROLE_POWER_ADMIN,
      isSupervisor: req.session.passport.user.rolesObject.ROLE_SUPERVISOR,
      ...req.session.passport.user.privilegesObject,
      ...req.session.passport.user.rolesObject,
    };
  }

  const departmentPath = req.path.split("/")[1].toLowerCase();
  const department = globalThis.departmentMap[departmentPath];

  let departmentParams = {};

  if (department) {
    departmentParams = {
      routLink: department.route,
      routeLink: department.route,
      department_logo: department.logo,
      footer: department.footer,
      department_name: department.name,
      crash_submission: department.crash_submission,
      custom_fips: department.custom_fips,
      popup_daily_notes_after_login: department.popup_daily_notes_after_login,
      department_address1: department.address1,
      name_preferred: department.name_preferred,
      department_address2: department.address2,
      department_phone: department.phone,
      departmentName: department.department_name,
      department_path: department.path,
      pointx: department.pointx,
      pointy: department.pointy,
      city: department.city_name2,
      city_short: department.city_name,
    };

    globalVariables.routLink = department.route;
    globalVariables.department_name = department.name;
    globalVariables.crash_submission = department.crash_submission;
    globalVariables.custom_fips = department.custom_fips || false;
    globalVariables.defaultCenter = department.defaultCenter;
    globalVariables.departmentBucketFullURL = globalVariables.bucketFullURL + "/" + department.path + "/uploads";
    globalVariables.pointx = department.pointx;
    globalVariables.pointy = department.pointy;
  }

  globalVariables.isLiveServer = process.env.mode === "production";

  res.locals = {
    ...departmentParams,
    ...userParams,
    isLiveServer: process.env.mode === "production",
    isLocalhost: process.env.mode !== "production",
    globalVariables: JSON.stringify(globalVariables),
    ...res.locals,
  };

  next();
};
