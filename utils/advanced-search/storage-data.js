const moment = require("moment");
const { ROLE_SUPERVISOR, ROLE_POWER_ADMIN } = require("../auth-constants");
const authHelper = require("../auth-helper");
const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

module.exports.storageDataAdvancedSearch = function (req, params) {
  const { department, departmentName, departments } = params;

  const showConfidentials = authHelper.hasRole(req, ROLE_SUPERVISOR) || authHelper.hasRole(req, ROLE_POWER_ADMIN);

  const parameters = [];

  const result = {
    where: "",
    join: "",
    parameters,
    table: "",
  };

  let storage_departments = [department];

  if (departmentName === "Peel9" || departmentName === "Demo") {
    storage_departments = departments;

    if (req.query.department) {
      storage_departments = req.query.department
        .split(",")
        .map((deptName) => departments.find((dept) => dept.name === deptName.trim()));
    }
  }

  const now = new Date();
  now.setTime(req.query.now);

  let start_date = "1900-01-01"; //Min date
  let end_date = moment(now).format(DATE_FORMAT);

  const isAllTime = req.query.interval === "alltime";

  if (req.query.interval === "24hrs") {
    start_date = moment(now).add(-1, "days").format(DATE_FORMAT);
  } else if (req.query.interval === "3days") {
    start_date = moment(now).add(-3, "days").format(DATE_FORMAT);
  } else if (req.query.interval === "1week") {
    start_date = moment(now).add(-7, "days").format(DATE_FORMAT);
  } else if (req.query.interval === "1month") {
    start_date = moment(now).add(-1, "months").format(DATE_FORMAT);
  } else if (req.query.interval === "3months") {
    start_date = moment(now).add(-3, "months").format(DATE_FORMAT);
  } else if (req.query.interval === "6months") {
    start_date = moment(now).add(-6, "months").format(DATE_FORMAT);
  } else if (req.query.interval === "1year") {
    start_date = moment(now).add(-1, "years").format(DATE_FORMAT);
  } else if (req.query.interval === "range") {
    if (req.query.start_date) {
      start_date = req.query.start_date;
    }

    if (req.query.end_date) {
      end_date = req.query.end_date;
    }
  }

  let storage_data_sources = [];

  if (req.query.data_source) {
    storage_data_sources = req.query.data_source.split(",");
  }

  if (storage_departments.length > 0) {
    const storageSelects = [];

    for (let i = 0; i < storage_departments.length; i++) {
      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Arrest") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(incident_no,4),'') AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Arrest' AS data_source, '${storage_departments[i].name}' as department,edited_date from  ${storage_departments[i].database_name_with_dot}arrest_attachments 
          WHERE
              ( ${showConfidentials} OR confidential = 0)
              AND 
              (
                  ? IS NULL
                  OR
                  edited_date BETWEEN ? AND ?
              )
              AND (
                  ? IS NULL 
                  OR 
                  left(incident_no,4) IN (?)
              )
              AND deleted IS NULL 
        `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Warrant-Citation Arrest") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(incident_no,4),'') AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Warrant-Citation Arrest' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}arrest_non_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            )
            AND (
                ? IS NULL 
                OR 
                left(incident_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Evidence") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(incident_no,4),'') AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Evidence' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}evidence_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                left(incident_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("FIR") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(incident_no,4),'') AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'FIR' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}fir_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                left(incident_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Incident") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(incident_no,4),'') AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Incident' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}incident_attachments
          WHERE
            ( ${showConfidentials} OR confidential = 0)
            AND 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                left(incident_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Mastername") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, master_name_id as incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Mastername' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}mastername_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Property") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(incident_no,4),'') AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Property' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}property_attachments
          WHERE
            ( ${showConfidentials} OR confidential = 0)
            AND  
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND (
                ? IS NULL 
                OR 
                left(incident_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Traffic Crash") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(crash_no,4),'') AS year, crash_no as incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Traffic Crash' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}traffic_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                left(crash_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length == 0 || storage_data_sources.indexOf("Traffic Citation") > -1) {
        storageSelects.push(`
          Select id, NULLIF(left(citation_no,4),'') AS year, citation_no as incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Traffic Citation' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}traffic_citation_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            )  
            AND 
            (
                ? IS NULL 
                OR 
                left(citation_no,4) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Vehicle Maintenance") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Vehicle Maintenance' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}maintenance_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Court") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Court' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}court_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length === 0 || storage_data_sources.indexOf("Daily Activity") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Daily Activity' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}daily_logs_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length == 0 || storage_data_sources.indexOf("Permit") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Permit' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}permit_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            )
            AND deleted IS NULL  
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length == 0 || storage_data_sources.indexOf("Trainings") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, vacation_watch_no as incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Vacation Watch' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}vacation_watch_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length == 0 || storage_data_sources.indexOf("Vacation Watch") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, vacation_watch_no as incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Vacation Watch' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}vacation_watch_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }

      if (storage_data_sources.length == 0 || storage_data_sources.indexOf("Master Business") > -1) {
        storageSelects.push(`
          Select id, year(edited_date) AS year, master_business_id as incident_no, path, orginal_name, Round((file_size/1000000),3) as file_size, 'Master Business' AS data_source, '${storage_departments[i].name}' as department,edited_date from ${storage_departments[i].database_name_with_dot}business_attachments
          WHERE 
            (
                ? IS NULL
                OR
                edited_date BETWEEN ? AND ?
            ) 
            AND 
            (
                ? IS NULL 
                OR 
                CAST(year(edited_date) AS CHAR(4)) IN (?)
            ) 
            AND deleted IS NULL 
          `);

        if (isAllTime) {
          parameters.push(...[null, start_date, end_date]);
        } else {
          parameters.push(...[0, start_date, end_date]);
        }

        if (req.query.year) {
          parameters.push(0);
          parameters.push(req.query.year.split(","));
        } else {
          parameters.push(null);
          parameters.push(null);
        }
      }
    }

    result.table = "(" + storageSelects.join(`UNION ALL`) + ") AS T ";
  }

  return result;
};
