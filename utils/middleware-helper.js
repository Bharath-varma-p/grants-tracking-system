const { getPools } = require("./database");
const authHelper = require("./auth-helper");
const { addAuditLogs } = require("./add-audit-logs");
const { ROLE_POWER_ADMIN } = require("./auth-constants");
const { runSql } = require("./sql");

module.exports.isLoggedIn = function (req, res, next) {
  if (
    req.isAuthenticated() &&
    (req.session.passport.user.department == req.department.name ||
      req.session.passport.user.department == "Peel9" ||
      (req.session.passport.user.department == "Demo" && req.department.name !== "P9 Demo"))
  ) {
    return next();
  }

  const isAjax = req.xhr;

  if (isAjax) {
    res.status(500).send("Logout");
  } else {
    res.redirect("/logout");
  }
};

module.exports.isTokenValidated = async function (req, res, next) {
  const { pool } = getPools(req.department.path);

  if (!req.session.passport) {
    res.redirect("/login");
  }

  const result = await runSql(
    pool,
    "select * from sna.users where id=? AND deleted_time IS NULL",
    req.session.passport.user.id
  );

  if (!result.status) {
    return next(result.error);
  }

  const [user] = result.data;

  if (user?.qr_valid == 1) {
    req.session.passport.user.date_of_birth = user.employee_dob;
    req.session.passport.user.first_name = user.first_name;
  } else {
    if (req.xhr) {
      res.status(500).send("Logout");
    } else {
      res.redirect("/login_otp");
    }
    return;
  }

  if (user.update_privileges !== 1) {
    return next();
  }

  try {
    const newRolesAndPrivileges = await authHelper.refreshRolesAndPrivileges(user.id, pool);

    req.session.passport.user.roles = newRolesAndPrivileges.user_roles;
    req.session.passport.user.privileges = newRolesAndPrivileges.user_privileges;
    req.session.passport.user.show_sealed =
      user.show_sealed === 1 &&
      !!newRolesAndPrivileges.user_privileges.find((p) => p.privilege_name === "Unseal Case" && p.has_permission === 1);
    req.session.passport.user.privilegesObject = null;
    req.session.passport.user.rolesObject = null;
  } catch (error) {
    globalThis.logger.error(error);
  } finally {
    next();
  }
};

module.exports.addAuditLogs = function (action, pageName) {
  return function (req, res, next) {
    addAuditLogs(req, action, pageName);
    next();
  };
};

module.exports.isPeel9Member = function (req, res, next) {
  if (req.session.passport.user.department == "Peel9") {
    return next();
  } else {
    authHelper.redirectTo401(req, res, "You don't have permission");
  }
};

module.exports.isPowerAdmin = function (req, res, next) {
  if (authHelper.hasRole(req, ROLE_POWER_ADMIN)) {
    return next();
  } else {
    authHelper.redirectTo401(req, res, "You don't have power admin role");
  }
};

module.exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  const isAjax = req.xhr;

  if (isAjax) {
    res.status(500).send("Logout");
  } else {
    res.redirect("/");
  }
};

module.exports.isAdmin = function (req, res, next) {
  if (
    process.env.mode === "production" &&
    req.session.passport.user.username !== "mozer_rms" &&
    req.session.passport.user.username !== "said.varlioglu"
  ) {
    return res.status(404).end();
  }

  next();
};
