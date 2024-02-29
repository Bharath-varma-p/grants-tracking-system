const userHasPermission = (user, privilegeName) => {
  if (!user.privileges) {
    return false;
  }
  return user.privileges.findIndex((p) => p.privilege_name == privilegeName) > -1;
};

exports.userHasPermission = userHasPermission;

const hasPermission = (req, privilegeName) => {
  let result = false;

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.privileges) {
    result = userHasPermission(req.session.passport.user, privilegeName);
  }

  return result;
};

module.exports.hasPermission = hasPermission;

const userHasReadPermission = (user, privilegeName) => {
  if (!user.privileges) {
    return false;
  }
  return user.privileges.findIndex((p) => p.privilege_name == privilegeName && p.read_permission == 1) > -1;
};

module.exports.userHasReadPermission = userHasReadPermission;

const hasReadPermission = (req, privilegeName) => {
  let result = false;

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.privileges) {
    result = userHasReadPermission(req.session.passport.user, privilegeName);
  }

  return result;
};

module.exports.hasReadPermission = hasReadPermission;

const userHasWritePermission = (user, privilegeName) => {
  if (!user.privileges) {
    return false;
  }
  return user.privileges.findIndex((p) => p.privilege_name == privilegeName && p.write_permission == 1) > -1;
};

module.exports.userHasWritePermission = userHasWritePermission;

const hasWritePermission = (req, privilegeName) => {
  let result = false;

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.privileges) {
    result = userHasWritePermission(req.session.passport.user, privilegeName);
  }

  return result;
};

module.exports.hasWritePermission = hasWritePermission;

const userHasDeletePermission = (user, privilegeName) => {
  if (!user.privileges) {
    return false;
  }
  return user.privileges.findIndex((p) => p.privilege_name == privilegeName && p.delete_permission == 1) > -1;
};

module.exports.userHasDeletePermission = userHasDeletePermission;

const hasDeletePermission = (req, privilegeName) => {
  let result = false;

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.privileges) {
    result = userHasDeletePermission(req.session.passport.user, privilegeName);
  }

  return result;
};

module.exports.hasDeletePermission = hasDeletePermission;

const userHasSealPermission = (user, privilegeName) => {
  if (!user.privileges) {
    return false;
  }
  return user.privileges.findIndex((p) => p.privilege_name == privilegeName && p.seal_permission == 1) > -1;
};

module.exports.userHasSealPermission = userHasSealPermission;

const hasSealPermission = (req, privilegeName) => {
  let result = false;

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.privileges) {
    result = userHasSealPermission(req.session.passport.user, privilegeName);
  }

  return result;
};

module.exports.hasSealPermission = hasSealPermission;

const userHasPermissionOfAny = (user, privilegeName, flags) => {
  let authorized = false;
  let all_flags = [];

  if (typeof flags === "string") {
    all_flags.push(flags);
  } else if (Array.isArray(flags)) {
    all_flags = [...flags];
  }

  for (const flag of all_flags) {
    if (flag === "read") {
      authorized = userHasReadPermission(user, privilegeName);
    } else if (flag === "write") {
      authorized = userHasWritePermission(user, privilegeName);
    } else if (flag === "delete") {
      authorized = userHasDeletePermission(user, privilegeName);
    } else if (flag === "seal") {
      authorized = userHasSealPermission(user, privilegeName);
    }

    if (authorized) {
      break;
    }
  }

  return authorized;
};

module.exports.userHasPermissionOfAny = userHasPermissionOfAny;

const hasPermissionOfAny = (req, privilegeName, flags) => {
  let authorized = false;
  let all_flags = [];

  if (typeof flags === "string") {
    all_flags.push(flags);
  } else if (Array.isArray(flags)) {
    all_flags = [...flags];
  }

  for (const flag of all_flags) {
    if (flag === "read") {
      authorized = hasReadPermission(req, privilegeName);
    } else if (flag === "write") {
      authorized = hasWritePermission(req, privilegeName);
    } else if (flag === "delete") {
      authorized = hasDeletePermission(req, privilegeName);
    } else if (flag === "seal") {
      authorized = hasSealPermission(req, privilegeName);
    }

    if (authorized) {
      break;
    }
  }

  return authorized;
};

module.exports.hasPermissionOfAny = hasPermissionOfAny;

const userHasRole = (user, roleName) => {
  if (!user.roles) {
    return false;
  }
  return user.roles.findIndex((p) => p.role_name == roleName) > -1;
};

exports.userHasRole = userHasRole;

module.exports.hasRole = (req, roleName) => {
  let result = false;

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.roles) {
    result = userHasRole(req.session.passport.user, roleName);
  }
  console.log(result);
  return result;
};

module.exports.createPrivilegeObject = (req) => {
  const result = {};

  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.privileges) {
    for (const privilege of req.session.passport.user.privileges) {
      const formatted_privilege_name =
        "PRIVILEGE_" + privilege.privilege_name.replace(/\W/gi, "_").replace(/_+/gi, "_").toUpperCase();

      result[formatted_privilege_name] = {
        hasPermission: true,
        read: Boolean(privilege.read_permission),
        write: Boolean(privilege.write_permission),
        delete: Boolean(privilege.delete_permission),
        seal: Boolean(privilege.seal_permission),
      };
    }
  }

  return result;
};

module.exports.createRoleObject = (req) => {
  const result = {};
  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user.roles) {
    for (const role of req.session.passport.user.roles) {
      const formatted_role_name = "ROLE_" + role.role_name.replace(/\W/gi, "_").replace(/_+/gi, "_").toUpperCase();

      result[formatted_role_name] = true;
    }
  }

  return result;
};

async function calculatePrivileges(
  employeeId,
  connection,
  filter_only_to_peel9_team = false,
  filter_has_not_permission = true,
  update_privileges = true
) {
  let result = [];

  try {
    result = await connection.query(
      `
    SELECT * FROM
    (
      SELECT 
        privilege_types.name as privilege_name,
        IFNULL(
			      MAX(IF(isRole = 0 AND isDepartment = 0,has_permission,NULL)), 
            IFNULL
            (
              MAX(IF(isDepartment = 1,has_permission,NULL)), 
              MAX(IFNULL(has_permission,0))
            )

		    )  as has_permission,
        IFNULL(
			      MAX(IF(isRole=0 AND isDepartment = 0,read_permission,NULL)), 
            IFNULL
            (
              MAX(IF(isDepartment = 1,read_permission,NULL)), 
              MAX(IFNULL(read_permission,0))
            )
    		) as read_permission,
        IFNULL(
			      MAX(IF(isRole=0 AND isDepartment = 0,write_permission,NULL)), 
            IFNULL
            (
              MAX(IF(isDepartment = 1,write_permission,NULL)), 
              MAX(IFNULL(write_permission,0))
            )
		    ) as write_permission,
        IFNULL(
			      MAX(IF(isRole=0 AND isDepartment = 0,delete_permission,NULL)), 
            IFNULL
            (
              MAX(IF(isDepartment = 1,delete_permission,NULL)), 
              MAX(IFNULL(delete_permission,0))
            )
		    ) as delete_permission,
        IFNULL(
			      MAX(IF(isRole=0 AND isDepartment = 0,seal_permission,NULL)), 
            IFNULL
            (
              MAX(IF(isDepartment = 1,seal_permission,NULL)), 
              MAX(IFNULL(seal_permission,0))
            )
		    ) as seal_permission,
        menu_id,
        is_production
      FROM sna.privilege_types
      LEFT JOIN
      (
    
        SELECT 
          privilege_name,
          1 as has_permission, 
          read_permission,
          write_permission,
          delete_permission,
          seal_permission,
          1 as isRole,
          0 as isDepartment
        FROM 
          sna.role_privileges
        JOIN sna.user_roles ON sna.user_roles.role_name =  sna.role_privileges.role_name
        JOIN sna.roles ON roles.role_name = role_privileges.role_name
        WHERE 
          user_roles.user_id = ?
          AND 
          user_roles.deleted = 0
          AND
          roles.active = 1
        UNION ALL
        SELECT 
          privilege_name,
          has_permission, 
          read_permission,
          write_permission,
          delete_permission,
          seal_permission,
          0,
          0
        FROM 
          sna.user_privileges
        WHERE 
          user_id = ?
          AND 
          deleted = 0
        UNION ALL
        SELECT 
          privilege_name,
          has_permission, 
          read_permission,
          write_permission,
          delete_permission,
          seal_permission,
          0,
          1
        FROM 
          sna.department_role_privileges
        JOIN sna.user_roles ON sna.user_roles.role_name = sna.department_role_privileges.role_name
        JOIN sna.roles ON roles.role_name = department_role_privileges.role_name
        JOIN sna.users ON sna.users.id = sna.user_roles.user_id AND sna.users.department = sna.department_role_privileges.department_name
        WHERE 
          user_roles.user_id = ?
          AND 
          user_roles.deleted = 0
          AND
          roles.active = 1
          AND
          sna.department_role_privileges.deleted = 0
      ) A ON privilege_types.name = A.privilege_name
      WHERE
        privilege_types.active = 1
        AND
        (? IS NULL OR privilege_types.only_to_peel9_team = 0)
      GROUP BY
        privilege_types.name
    ) T
    WHERE 
      (? IS NULL OR T.has_permission = 1)
      AND
      (${process.env.mode !== "production"} OR T.is_production = 1)
    
    `,
      [employeeId, employeeId, employeeId, filter_only_to_peel9_team ? 1 : null, filter_has_not_permission ? 1 : null]
    );

    if (update_privileges) {
      await connection.query(`UPDATE sna.users SET update_privileges = NULL WHERE id = ? `, [employeeId]);
    }
  } catch (err) {
    globalThis.logger.error(err);
  }

  return result;
}

module.exports.refreshRolesAndPrivileges = async (employeeId, promisePool) => {
  const result = {
    user_roles: [],
    user_privileges: [],
  };

  let connection = null;

  try {
    connection = await promisePool.getConnection();

    result.user_roles = await connection.query(
      `
    SELECT 
        user_roles.role_name 
    FROM sna.user_roles 
    LEFT JOIN sna.roles ON roles.role_name = user_roles.role_name
    WHERE user_id = ? 
        AND 
        user_roles.deleted = 0
        AND
        roles.active=1
    `,
      [employeeId]
    );

    result.user_privileges = await calculatePrivileges(employeeId, connection);

    await connection.query(`UPDATE sna.users SET update_privileges = NULL WHERE id = ? `, [employeeId]);
  } catch (err) {
    globalThis.logger.error(err);
  } finally {
    connection.release();
  }

  return result;
};

module.exports.calculatePrivileges = calculatePrivileges;

module.exports.saveUserPrivileges = async (
  privileges,
  employeeId,
  savingUserId,
  db,
  filter_only_to_peel9_team = true
) => {
  const oldUserPrivileges = await db.query(
    `
      SELECT 
          * 
      FROM sna.user_privileges
      JOIN sna.privilege_types ON user_privileges.privilege_name = privilege_types.name
      WHERE 
          user_id = ?
          AND
          deleted = 0
          AND
          (? IS NULL OR sna.privilege_types.only_to_peel9_team = 0)
          AND
          sna.privilege_types.active = 1
    `,
    [employeeId, filter_only_to_peel9_team ? 1 : null]
  );

  let updateUserPrivilege = false;

  for (const newPrivilege of privileges) {
    const oldPrivilege = oldUserPrivileges.find((old) => old.privilege_name == newPrivilege.privilege_name);

    if (newPrivilege.isChecked == "true") {
      if (oldPrivilege) {
        if (
          oldPrivilege.has_permission == 0 ||
          oldPrivilege.read_permission != newPrivilege.read ||
          oldPrivilege.write_permission != newPrivilege.write ||
          oldPrivilege.delete_permission != newPrivilege.delete ||
          oldPrivilege.seal_permission != newPrivilege.seal
        ) {
          updateUserPrivilege = true;
          await db.query(
            `
                UPDATE sna.user_privileges
                SET
                has_permission = 1,
                read_permission = ?,
                write_permission = ?,
                delete_permission = ?,
                seal_permission = ?,
                edited_by = ?,
                edited_time = ?
                WHERE
                user_id = ?
                AND
                privilege_name = ?
            `,
            [
              newPrivilege.read,
              newPrivilege.write,
              newPrivilege.delete,
              newPrivilege.seal,
              savingUserId,
              new Date(),
              employeeId,
              newPrivilege.privilege_name,
            ]
          );
        }
      } else {
        updateUserPrivilege = true;
        await db.query(
          `
          INSERT INTO
            sna.user_privileges (
              user_id,
              privilege_name,
              has_permission,
              read_permission,
              write_permission,
              delete_permission,
              seal_permission,
              created_by,
              created_time
            )
          VALUES
            (?)
          `,
          [
            [
              employeeId,
              newPrivilege.privilege_name,
              1,
              newPrivilege.read,
              newPrivilege.write,
              newPrivilege.delete,
              newPrivilege.seal,
              savingUserId,
              new Date(),
            ],
          ]
        );
      }
    } else {
      //isChecked false
      if (oldPrivilege) {
        if (
          oldPrivilege.has_permission ||
          oldPrivilege.read_permission != 0 ||
          oldPrivilege.write_permission != 0 ||
          oldPrivilege.delete_permission != 0 ||
          oldPrivilege.seal_permission != 0
        ) {
          updateUserPrivilege = true;
          await db.query(
            `
              UPDATE sna.user_privileges
              SET
              has_permission = 0,
              read_permission = 0,
              write_permission = 0,
              delete_permission = 0,
              seal_permission = 0,
              edited_by = ?,
              edited_time = ?
              WHERE
              user_id = ?
              AND
              privilege_name = ?
          `,
            [savingUserId, new Date(), employeeId, newPrivilege.privilege_name]
          );
        }
      } else {
        updateUserPrivilege = true;
        await db.query(
          `
          INSERT INTO
            sna.user_privileges (
              user_id,
              privilege_name,
              has_permission,
              read_permission,
              write_permission,
              delete_permission,
              seal_permission,
              created_by,
              created_time
            )
          VALUES
            (?)
          `,
          [[employeeId, newPrivilege.privilege_name, 0, 0, 0, 0, 0, savingUserId, new Date()]]
        );
      }
    }
  }

  if (updateUserPrivilege) {
    await db.query(`UPDATE sna.users SET update_privileges = 1 WHERE id = ? `, [employeeId]);
  }
};

module.exports.redirectTo401 = (req, res, message) => {
  const isAjax = req.xhr;
  if (isAjax) {
    return res.status(401).send(message);
  }

  res.status(401).render("error401", {
    revert_link: "toRoot",
    err: message,
    layout: null,
  });
};
