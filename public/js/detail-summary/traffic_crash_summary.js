//#region BUTTONS HANDLERS

//#region PERSON BUTTONS HANDLER
function trafficPersonEditHandler(data) {
  const link = generateLink("traffic_person", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("traffic_person", true));
}

function trafficPersonViewHandler(data) {
  const link = generateLink("traffic_person", "view", data);
  myPopupWin(link);
}

function trafficPersonDeleteHandler(data) {
  const link = generateLink("traffic_person", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("traffic_person", true));
}

//#endregion PERSON BUTTONS HANDLER

//#region UNIT BUTTONS HANDLER
function trafficUnitEditHandler(data) {
  const link = generateLink("traffic_unit", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("traffic_unit", true));
}

function trafficUnitViewHandler(data) {
  const link = generateLink("traffic_unit", "view", data);
  myPopupWin(link);
}

function trafficUnitDeleteHandler(data) {
  const link = generateLink("traffic_unit", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("traffic_unit", true));
}

//#endregion UNIT BUTTONS HANDLER

//#endregion BUTTONS HANDLERS

export let eventHandlers = {
  trafficPersonEditHandler,
  trafficPersonViewHandler,
  trafficPersonDeleteHandler,
  trafficUnitEditHandler,
  trafficUnitViewHandler,
  trafficUnitDeleteHandler,
};

//#region Shared Tabs
const evidenceTab = getSharedTab("evidence", "traffic_crash");
eventHandlers = {...eventHandlers, ...evidenceTab.eventHandlers};

const trafficCitationTab = getSharedTab("traffic_citation", "traffic_crash");
eventHandlers = {...eventHandlers, ...trafficCitationTab.eventHandlers};

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "traffic_crash");
eventHandlers = {...eventHandlers, ...warrantCitationArrestTab.eventHandlers};

const attachmentTab = getSharedTab("traffic_attachments", "traffic_crash");
eventHandlers = {...eventHandlers, ...attachmentTab.eventHandlers};

const callManagementTab = getSharedTab("call_management", "traffic_crash");
eventHandlers = {...eventHandlers, ...callManagementTab.eventHandlers};

const callManagementUnitTab = getSharedTab("cad_unit", "traffic_crash");
eventHandlers = {...eventHandlers, ...callManagementUnitTab.eventHandlers};

const callManagementCommentTab = getSharedTab("cad_comment", "traffic_crash");
eventHandlers = {...eventHandlers, ...callManagementCommentTab.eventHandlers};

const narrativeTab = getSharedTab("narrative", "traffic_crash");
eventHandlers = {...eventHandlers, ...narrativeTab.eventHandlers};
//#endregion

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh(
    "traffic_crash",
    source,
    reloadMasterTable ? highlightClickedRow : null
  );
}

//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return (
    globalVariables.PRIVILEGE_TRAFFIC_CRASH &&
    globalVariables.PRIVILEGE_TRAFFIC_CRASH[permissionType]
  );
}

export const detailSummaryTabs = {
  traffic_person: { title: "Person" },
  traffic_unit: { title: "Unit" },
  traffic_attachments: attachmentTab,
  narrative: narrativeTab,
  evidence: evidenceTab,
  traffic_citation: trafficCitationTab,
  warrant_citation_arrest: warrantCitationArrestTab,
  call_management: callManagementTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab
};

export const tableColumns = {
  traffic_person: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "dob", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
    },
  ],
  traffic_unit: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "unit_owner", title: "Owner", class: "master-name-detail"},
    { data: "lp_plate_number", title: "LICENSE PLATE" },
    { data: "vehicle_make", title: "MAKE" },
    { data: "vehicle_model", title: "MODEL" },
    { data: "vehicle_year", title: "VEH. YEAR" },
    { data: "lp_VIN", title: "VIN" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
    },
  ],
};

//Providing the function to get approval data for selected master table rows.
//Returned object will be used to decide to show or hide approval, locked, unlock, hourglass, progress, edit, delete buttons.
export const getApprovalData = (rowData) => {
  let userApproved = rowData[6],
    supervisorApproved = rowData[7],
    theUser = rowData[8],
    approveRequestOfficerID = rowData[10],
    saveProgress = rowData[11] == "1" || rowData[27] == "1",
    reports_to = rowData[22];
  let locked = true;
  let ownCase = false;
  let ownApproval = false;

  if (theUser == globalVariables.user) ownCase = true;
  if (approveRequestOfficerID == globalVariables.user_id) ownApproval = true;
  if (!supervisorApproved) locked = false;

  return {
    ownCase,
    ownApproval,
    userApproved,
    supervisorApproved,
    isSupervisor: globalVariables.isSupervisor,
    isPowerAdmin: globalVariables.isPowerAdmin,
    hasUserRole: globalVariables.hasUserRole,
    reports_to,
    employee_id: globalVariables.user_id,
    SaveProgress: saveProgress,
    locked,
    theUser,
  };
};

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_TRAFFIC_CRASH";
