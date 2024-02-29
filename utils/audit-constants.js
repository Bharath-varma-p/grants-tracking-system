// #region AUDIT LOGS ACTION CONSTANTS
exports.PAGE_VISIT = "Page Visit";
exports.SUCCESS_LOGIN = "Success Login";
exports.FAIL_LOGIN = "Failed Login";
exports.SUCCESS_OTP = "Success OTP";
exports.FAIL_OTP = "Failed OTP";
exports.LOGOUT = "User Logout";
exports.USER_CREATE = "User Account - Created";
exports.USER_INACTIVATE = "User Account - Inactivated";
exports.USER_ACTIVATE = "User Account - Reactivated";
exports.USER_DELETE = "User Account - Deleted";
exports.USER_RESTORE = "User Account - Restore";
exports.USER_EDIT = "User Account - Edited";
exports.USER_PASSWORD_RESET_REQ = "Pwd Reset - Request";
exports.USER_PASSWORD_RESET_REQ_FAIL = "Pwd Reset - Request Fail";
exports.USER_PASSWORD_RESET_TOKEN_FAIL = "Pwd Reset - Token Fail";
exports.USER_PASSWORD_RESET_SUCCESS = "Pwd Reset - Success";
exports.USER_PASSWORD_RESET_FAIL = "Pwd Reset - Fail";
exports.USER_EMAIL_RESET_REQ = "Email Reset - Request";
exports.USER_EMAIL_RESET_SUCCESS = "Email Reset - Success";
exports.USER_EMAIL_TOKEN_FAIL = "Email Reset - Fail";
exports.USER_QR_RESET = "User Account - QR Code Reset";
exports.USER_NEW_QR_CODE = "User Account - New QR Code";
exports.ADD_TRAINING = "User Account - Training Added";
exports.PRIVILEGE_CONFIGURE = "User Account - Privilege Configured";
exports.ATTACHMENT_DELETE = "Attachment Delete";
exports.NEW_ATTACHMENT = "New Attachment";
exports.NEW_STATUS = "New Status";
exports.STATUS_DELETE = "Status Delete";
exports.STATUS_UPDATE = "Status Update";
exports.ADD_PERSON = "Add Person";
exports.DELETE_PERSON = "Delete Person";
exports.UPDATE_PERSON = "Update Person";
exports.ADD_VEHICLE = "Add Vehicle";
exports.DELETE_VEHICLE = "Delete Vehicle";
exports.UPDATE_VEHICLE = "Update Vehicle";
exports.ADD_BUSINESS = "Add Business";
exports.DELETE_BUSINESS = "Delete Business";
exports.UPDATE_BUSINESS = "Update Business";
exports.APPROVE_REQUEST = "Approve Request";
exports.APPROVED_BEFORE_USER_REQUEST = "Approved Before User Request";
exports.SUPERVISOR_APPROVED = "Supervisor Approved";
exports.DISAPPROVED = "Disapproved";
exports.APPROVE_REQUEST_CANCELED = "Approve Request Canceled";
exports.CASE_UNLOCK = "Case Unlock";
// #region BUTTON HANDLE ACTION CONSTANTS BY PAGES
exports.ARROW_BUTTON = "Arrow Button";
exports.EDIT_BUTTON = "Edit Button";
// #region DASHBOARD PAGE BUTTONS & COMPONENTS
exports.GET_DAILY_NOTES = "Get Daily Notes";
exports.UPDATE_DAILY_NOTES = "Update Daily Notes";
exports.SEND_DAILY_NOTES = "Send Daily Notes";
exports.CREATE_CALENDAR_EVENT = "Calendar Event Created";
exports.DELETE_CALENDAR_EVENT = "Calendar Event Deleted";
exports.UPDATE_CALENDAR_EVENT = "Calendar Event Updated";
exports.STATS_INTERVAL_CHANGE = "Stats Interval Change";
exports.COMPLETE_ASSIGNED_CASE = "Assigned Case Complete";
exports.USER_SUMMARY_COMPONENT = "User Summary Component";
// #endregion DASHBOARD PAGE

// #region MASTER NAME PAGE BUTTONS
exports.OTHER_DEPT_RECORD_VIEW = "Other Dept Record View";
exports.SAME_DEPT_RECORD_VIEW = "Record View From Master Search - Names";
// #endregion MASTER NAME

// #endregion BUTTON HANDLE ACTION CONSTANTS BY PAGES

/// CASE CREATIONS
exports.CASE_CREATION = "Case Creation";
exports.NEW_PERMIT = "New Permit";
exports.NEW_VEHICLE_MAINTENANCE = "New Vehicle Maintenance";

exports.PERSON_CREATE = "Master Search - Person Creation";
exports.VEHICLE_CREATE = "Master Search - Vehicle Creation";
exports.BUSINESS_CREATE = "Master Search - Business Creation";
/// CASE UPDATES
exports.CASE_UPDATE = "Case Update";

exports.BUSINESS_UPDATE = "Master Search - Business Update";
exports.VEHICLE_UPDATE = "Master Search - Vehicle Update";
exports.PERSON_UPDATE = "Master Search - Person Update";
/// CASE DELETES
exports.CASE_DELETE = "Case Delete";
exports.PERMIT_DELETE = "Permit Delete";
exports.VEHICLE_MAINTENANCE_DELETE = "Vehicle Maintenance Delete";
exports.TRAINING_DELETE = "User Account - Training Delete";

exports.PERSON_DELETE = "Master Search - Person Delete";
exports.VEHICLE_DELETE = "Master Search - Vehicle Delete";
exports.BUSINESS_DELETE = "Master Search - Business Delete";

// CASE RESTORES
exports.CASE_RESTORE = "Case Restore";
exports.PERSON_RESTORE = "Master Search - Person Restore";
exports.VEHICLE_RESTORE = "Master Search - Vehicle Restore";
exports.BUSINESS_RESTORE = "Master Search - Business Restore";
// #endregion AUDIT LOGS ACTION CONSTANTS

// #region AUDIT LOGS PAGE NAME CONSTANTS

/// USE _PAGE @ the end of the variable name
exports.LOGIN_PAGE = "User Login Page";
exports.OTP_PAGE = "User OTP Page";
exports.LOGOUT_PAGE = "User Logout Page";
exports.PASSWORD_RESET_PAGE = "User Password Reset Page";
exports.QR_CODE_REGISTER_PAGE = "User QR Code Register Page";
exports.EMAIL_RESET_PAGE = "User Email Reset Page";
exports.DARK_MODE_PAGE = "User Dark Mode Page";
exports.ADMIN_PANEL_PAGE = "Admin Panel Page";
exports.DASHBOARD_PAGE = "Dashboard Page";
exports.DAILY_ACTIVITY_PAGE = "Daily Activity";
exports.DAILY_LOG_DATABASE_PAGE = "Daily Activity Log Database";
exports.CFS_PAGE = "CFS Page";
exports.CALL_MANAGEMENT_PAGE = "Call Management Page";
exports.OFFENSE_NON_CRIMINAL_PAGE = "RMS Offense/Non-Criminal";
exports.TRAFFIC_CRASH_PAGE = "RMS Traffic Crash";
exports.TRAFFIC_CITATION_PAGE = "RMS Traffic Citation";
exports.WARRANT_CITATION_PAGE = "RMS Warrant Citation Arrest";
exports.FIR_PAGE = "RMS FIR";
exports.CASE_MANAGEMENT_PAGE = "Case Management Page";
exports.MASTER_NAME_PAGE = "Master Search - Names";
exports.MASTER_VEHICLE_PAGE = "Master Search - Vehicles";
exports.MASTER_BUSINESS_PAGE = "Master Search - Business";
exports.AGENCY_SEARCH_PAGE = "Agency Only - Agency Search";
exports.AGENCY_VICTIM_PAGE = "Agency Only - Victim";
exports.AGENCY_SUSPECT_PAGE = "Agency Only - Suspect";
exports.AGENCY_ARREST_PAGE = "Agency Only - Arrest";
exports.AGENCY_PROPERTY_PAGE = "Agency Only - Property";
exports.EVIDENCE_PROPERTY_PAGE = "Evidence & Property";
exports.EVIDENCE_PROPERTY_PAMET_PAGE = "Pamet Evidence & Property";
exports.COURT_MANAGEMENT_PAGE = "Court Management";
exports.CO_OFFENDING_NETWORK_PAGE = "Analytics Co-offending Network";
exports.PRIVILEGE_MY_PATIENTS = "My Patients";
exports.USER_DASHBOARDS_PAGE = "Analytics User Dashboards";
exports.BUILD_YOUR_OWN_CHARTS_PAGE = "Analytics Build Your Own Charts";
exports.PLACE_AND_PEOPLE_PAGE = "Analytics Place & People";
exports.PERMIT_PAGE = "Miscallaneous - Permits";
exports.VEHICLE_MAINTENANCE_PAGE = "Miscallaneous - Vehicle Maintenance";
exports.TOW_MANAGEMENT_PAGE = "Miscallaneous - Tow Management";
exports.VACATION_WATCH = "Miscallaneous - Vacation Watch";
exports.STORAGE_USAGE_PAGE = "System Admin - Storage Usage";
exports.TRAININGS_PAGE = "System Admin - Trainings";
exports.EMPLOYEES_PAGE = "System Admin - Employees";
exports.USER_ACTIVITY_PAGE = "System Admin - User Activity";
exports.APPROVAL_CONFIGURATION_PAGE = "System Admin - Approval Configuration";
exports.MUNICIPALLY_CODES_PAGE = "System Admin - Municipally Codes";
exports.LOCAL_TRAFFIC_CODES_PAGE = "System Admin - Local Traffic Codes";
exports.PRIVILEGE_SETTINGS_PAGE = "System Admin - Privilege Settings";
exports.OIBRS_SUBMISSION_PAGE = "System Admin - OIBRS Data Submission";
exports.LOCATOR_DATABASE_PAGE = "System Admin - Locator Database";
exports.AUDIT_LOGS_PAGE = "System Admin - Audit Logs";
exports.HELP_DESK_PAGE = "Contact - Support";
exports.HOW_TO_PAGE = "How-to Page";
exports.WHATS_NEW_PAGE = "What's New Page";
exports.PRIVILEGES_PAGE = "Root - Privileges";
exports.ROLES_PAGE = "Root - Roles";
exports.USERS_PAGE = "Root - Users";
exports.ADMIN_TASKS_PAGE = "Root - Admin Tasks";
exports.DEPARTMENTS_PAGE = "Root - Departments Page";
exports.MIGRATIONS_PAGE = "Root - Migrations";
exports.ONLINE_USERS_PAGE = "Active on Peel9";
exports.QUICK_CHART_REPORTS_PAGE = "Quick Reports - Charts";
exports.QUICK_COMPARE_STATS_PAGE = "Quick Reports - Compare Stats";
exports.QUICK_INCIDENT_WITH_DETAILS_PAGE = "Quick Reports - Incident With Details";
exports.AUDIT_LOG_DETAILS = "Audit Logs - More Details";
// #endregion AUDIT LOGS PAGE NAME CONSTANTS
