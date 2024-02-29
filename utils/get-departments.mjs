import SqlHelper from "./sql.js";
import { getPools } from "./database.js";
import initialDepartments from "../config/initial-departments.js";
import { createDepartmentDatabase } from "./create-department-database.js";
import { createCrashDiagramImages } from "./create-crash-diagram-images.js";

export async function getDepartments() {
  const { pool } = getPools("sna");

  let departmentsResult = await SqlHelper.runSql(
    pool,
    "SELECT * FROM sna.departments WHERE name='Peel9' or name='CPD' and deleted_time IS NULL"
  );

  if (!departmentsResult.status) {
    if (departmentsResult.error.code !== "ER_NO_SUCH_TABLE") {
      throw departmentsResult.error;
    }

    const departmentTableCreationResult = await SqlHelper.runSql(
      pool,
      `CREATE TABLE departments (
      id int NOT NULL AUTO_INCREMENT,
      name VARCHAR(255),
      path VARCHAR(255),
      ori VARCHAR(255),
      database_name VARCHAR(255),
      logo VARCHAR(255),
      address1 VARCHAR(255),
      address2 VARCHAR(255),
      phone VARCHAR(255),
      department_name VARCHAR(255),
      pointx FLOAT,
      pointy FLOAT,
      footer TEXT,
      baldwin VARCHAR(3),
      crash_submission VARCHAR(3),
      crash_submission_test VARCHAR(3),
      city_name VARCHAR(255),
      city_name2 VARCHAR(255),
      cfs_name VARCHAR(255),
      county_code INT,
      ncic VARCHAR(255),
      fips VARCHAR(255),
      citation_ticket_prefix VARCHAR(255),
      court_code VARCHAR(255),
      ecs VARCHAR(255),
      chief_name VARCHAR(255),
      chief_title VARCHAR(255),
      new_oibrs VARCHAR(3),
      bmv_passwd VARCHAR(255),
      bmv_username VARCHAR(255),
      bmv_host VARCHAR(255),
      bmv_port VARCHAR(255),
      host VARCHAR(255),
      user VARCHAR(255),
      password VARCHAR(255),
      port INT,
      folder VARCHAR(255),
      pamet_data VARCHAR(3),
      popup_daily_notes_after_login VARCHAR(3),
      name_preferred VARCHAR(255),
      show_not_reviewed_daily_logs_in_dashboard BOOLEAN,
      assigned_officer_can_be_changed_in_call_management BOOLEAN,
      print_label FLOAT,
      evidence_data VARCHAR(3),
      custom_fips BOOLEAN,
      created_by VARCHAR(255),
      created_time DATETIME,
      edited_by VARCHAR(255),
      edited_time DATETIME,
      deleted_by VARCHAR(255),
      deleted_time DATETIME,
      PRIMARY KEY (id),
      UNIQUE KEY id_UNIQUE (id)
    )`
    );
    if (!departmentTableCreationResult.status) {
      throw departmentTableCreationResult.error;
    }
  }

  let departments = departmentsResult.data || [];

  if (departments.length === 0) {
    for (const department of initialDepartments) {
      const addingDepartmentSql = `
      INSERT INTO sna.departments
      (
        name,
        path,
        ori,
        database_name,
        logo,
        address1,
        address2,
        phone,
        department_name,
        pointx,
        pointy,
        footer,
        baldwin,
        crash_submission,
        crash_submission_test,
        city_name,
        city_name2,
        cfs_name,
        county_code,
        ncic,
        fips,
        citation_ticket_prefix,
        court_code,
        ecs,
        chief_name,
        chief_title,
        new_oibrs,
        bmv_passwd,
        bmv_username,
        bmv_host,
        bmv_port,
        host,
        user,
        password,
        port,
        folder,
        pamet_data,
        popup_daily_notes_after_login,
        name_preferred,
        show_not_reviewed_daily_logs_in_dashboard,
        assigned_officer_can_be_changed_in_call_management,
        print_label,
        evidence_data,
        custom_fips
      )
      VALUES (?)
      `;

      const params = [
        [
          department.name,
          department.path,
          department.ori,
          department.database_name1_1,
          department.logo.split("/").slice(-1)[0],
          department.address1,
          department.address2,
          department.phone,
          department.department_name,
          department.pointx,
          department.pointy,
          department.footer,
          department.baldwin,
          department.crash_submission,
          department.crash_submission_test,
          department.city_name,
          department.city_name2,
          department.cfs_name,
          department.county_code,
          department.NCIC,
          department.fips,
          department.citation_ticket_prefix,
          department.court_code || department.court_no,
          department.ECS,
          department.chief_name,
          department.chief_title,
          department.new_oibrs,
          department.bmv_passwd,
          department.bmv_username,
          department.bmv_host,
          department.bmv_port,
          department.host,
          department.user,
          department.password,
          department.port,
          department.folder,
          department.pamet_data,
          department.popup_daily_notes_after_login,
          department.name_preferred,
          department.show_not_reviewed_daily_logs_in_dashboard_for_supervisor_approval,
          department.assigned_officer_can_be_changed_in_call_management,
          department.print_label,
          department.evidence_data,
          department.custom_fips,
        ],
      ];
      const additionResult = await SqlHelper.runSql(pool, addingDepartmentSql, params);

      if (!additionResult.status) {
        globalThis.logger.error(additionResult.error);
      } else {
        const departmentCreationResult = await createDepartmentDatabase(department.database_name1_1, department.path);

        if (!departmentCreationResult.status) {
          globalThis.logger.error(departmentCreationResult.message);
          throw departmentCreationResult.error;
        }

        const diagramImageCreationResult = await createCrashDiagramImages({
          path: department.path,
          name: department.name,
          database_name: department.database_name1_1,
        });

        if (!diagramImageCreationResult.status) {
          throw diagramImageCreationResult.error;
        }
      }
    }

    departmentsResult = await SqlHelper.runSql(
      pool,
      "SELECT * FROM sna.departments WHERE name='Peel9' deleted_time IS NULL"
    );

    if (!departmentsResult.status) {
      throw departmentsResult.error;
    }

    departments = departmentsResult.data;
  }

  const allSchemasResult = await SqlHelper.runSql(
    pool,
    `SELECT SCHEMA_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
   `
  );

  if (!allSchemasResult.status) {
    globalThis.logger.error(allSchemasResult.message);
    throw allSchemasResult.error;
  }

  for (const department of departments) {
    if (!allSchemasResult.data.some((schema) => schema.SCHEMA_NAME === department.database_name)) {
      const departmentCreationResult = await createDepartmentDatabase(department.database_name, department.path);

      if (!departmentCreationResult.status) {
        globalThis.logger.error(departmentCreationResult.message);
        throw departmentCreationResult.error;
      }
    }
  }

  departments.forEach((department) => {
    department.database_name_with_dot = department.database_name + ".";
    department.defaultCenter = [department.pointy, department.pointx];
    department.route = department.path + "/";
    department.logo = `/img/department_logos/${department.logo}`;
    department.evidence_due_day = department.evidence_due_day ?? 120;
  });

  globalThis.departments = departments;

  globalThis.departmentMap = departments.reduce((acc, val) => {
    acc[val.path.toLowerCase()] = val;
    return acc;
  }, {});

  globalThis.departmentNameMap = departments.reduce((acc, val) => {
    acc[val.name] = val;
    return acc;
  }, {});

  return departments;
}
