//#region BUTTONS HANDLERS

//#region INVOLVED INDIVIDUAL BUTTONS HANDLER
function involvedIndividualEditHandler(data) {
  const link = generateLink("daily_log", "edit_involved_individual", data);
  myPopupWin(link, () => callbackRefreshSummary("involved_individual"));
}

function involvedIndividualViewHandler(data) {
  const link = generateLink("daily_log", "view_involved_individual", data);
  myPopupWin(link);
}

function involvedIndividualDeleteHandler(data) {
  const link = generateLink("daily_log", "delete_involved_individual", data);
  deletePopup(link, null, () => callbackRefreshSummary("involved_individual"));
}

//#endregion INVOLVED INDIVIDUAL BUTTONS HANDLER


//#region VEHICLE BUTTONS HANDLER
function vehicleEditHandler(data) {
  const link = generateLink("daily_log", "edit_vehicle", data);
  myPopupWin(link, () => callbackRefreshSummary("vehicle"));
}

function vehicleViewHandler(data) {
  const link = generateLink("daily_log", "view_vehicle", data);
  myPopupWin(link);
}

function vehicleDeleteHandler(data) {
  const link = generateLink("daily_log", "delete_vehicle", data);
  deletePopup(link, null, () => callbackRefreshSummary("vehicle"));
}
//#endregion VEHICLE BUTTONS HANDLER

//#region BUSINESS BUTTONS HANDLER
function businessEditHandler(data) {
  const link = generateLink("daily_log", "edit_business", data);
  myPopupWin(link, () => callbackRefreshSummary("business"));
}

function businessViewHandler(data) {
  const link = generateLink("daily_log", "view_business", data);
  myPopupWin(link);
}

function businessDeleteHandler(data) {
  const link = generateLink("daily_log", "delete_business", data);
  deletePopup(link, null, () => callbackRefreshSummary("business"));
}
//#endregion BUSINESS BUTTONS HANDLER

//#endregion BUTTONS HANDLERS

export let eventHandlers = {
  involvedIndividualEditHandler,
  involvedIndividualViewHandler,
  involvedIndividualDeleteHandler,
  businessEditHandler,
  businessViewHandler,
  businessDeleteHandler,
  vehicleEditHandler,
  vehicleViewHandler,
  vehicleDeleteHandler,
};

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {

  DetailSummary.refresh("daily_log",source, reloadMasterTable ? highlightClickedRow : null);
}

//checking privilege to decide to show or hide columns
function checkPrivilege (permissionType)  {

  return globalVariables.PRIVILEGE_DAILY_ACTIVITY_DATABASE && globalVariables.PRIVILEGE_DAILY_ACTIVITY_DATABASE[permissionType];
};

//#region Shared Tabs
const evidenceTab = getSharedTab("evidence", "daily_log");
eventHandlers = {...eventHandlers, ...evidenceTab.eventHandlers};

const trafficCitationTab = getSharedTab("traffic_citation", "daily_log");
eventHandlers = {...eventHandlers, ...trafficCitationTab.eventHandlers};

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "daily_log");
eventHandlers = {...eventHandlers, ...warrantCitationArrestTab.eventHandlers};

const firTab = getSharedTab("fir", "daily_log");
eventHandlers = {...eventHandlers, ...firTab.eventHandlers};

const attachmentTab = getSharedTab("attachment", "daily_log");
eventHandlers = {...eventHandlers, ...attachmentTab.eventHandlers};

const callManagementTab = getSharedTab("call_management", "daily_log");
eventHandlers = {...eventHandlers, ...callManagementTab.eventHandlers};

const callManagementUnitTab = getSharedTab("cad_unit", "daily_log");
eventHandlers = {...eventHandlers, ...callManagementUnitTab.eventHandlers};

const callManagementCommentTab = getSharedTab("cad_comment", "daily_log");
eventHandlers = {...eventHandlers, ...callManagementCommentTab.eventHandlers};

const narrativeTab = getSharedTab("narrative", "daily_log");
eventHandlers = {...eventHandlers, ...narrativeTab.eventHandlers};
//#endregion

export const detailSummaryTabs = {
  involved_individual: { title: "Involved Individual" },
  vehicle: { title: "Vehicle" },
  business: { title: "Business" },
  narrative: narrativeTab,
  evidence: evidenceTab,
  attachment: attachmentTab,
  warrant_citation_arrest: warrantCitationArrestTab,
  traffic_citation: trafficCitationTab,
  fir: firTab,
  call_management: callManagementTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab
};

export const tableColumns = {
  involved_individual: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "person_name", title: "NAME", class:"master-name-detail" },
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
  business: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "business_name", title: "BUSINESS" },
    { data: "business_address", title: "ADDRESS" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete","progress"]),
    },
  ],
  vehicle: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "vehicle_make", title: "MAKE" },
    { data: "vehicle_model", title: "MODEL" },
    { data: "vehicle_year", title: "YEAR" },
    { data: "vehicle_color", title: "COLOR" },
    { data: "lp_plate_number", title: "LICENSE PLATE", class:"master-vehicle-detail"  },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete","progress"]),
      responsivePriority: 0,
    },
  ],
};



//Providing the function to get approval data for selected master table rows.
//Returned object will be used to decide to show or hide approval, locked, unlock, hourglass, progress, edit, delete buttons.
export const getApprovalData = (rowData) => {

  return {};
};

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_DAILY_ACTIVITY_DATABASE";
