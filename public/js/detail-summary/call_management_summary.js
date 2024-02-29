//#region BUTTONS HANDLERS

//#region INCIDENT BUTTONS HANDLER
function cmIncidentEditHandler(data) {
  const link = generateLink("incident", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("cm_incident"));
}

function cmIncidentViewHandler(data) {
  const link = generateLink("incident", "view", data);
  myPopupWin(link);
}

function cmIncidentDeleteHandler(data) {
  const link = generateLink("incident", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("cm_incident"));
}

//#endregion INCIDENT BUTTONS HANDLER

//#region INVOLVED INDIVIDUAL BUTTONS HANDLER
function cmDailyLogsEditHandler(data) {
  const link = generateLink("daily_log", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("cm_daily_logs"));
}

function cmDailyLogsViewHandler(data) {
  const link = generateLink("daily_log", "view", data);
  myPopupWin(link);
}

function cmDailyLogsDeleteHandler(data) {
  const link = generateLink("daily_log", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("cm_daily_logs"));
}

//#endregion INVOLVED INDIVIDUAL BUTTONS HANDLER

//#endregion BUTTONS HANDLERS

export let eventHandlers = {
  cmIncidentEditHandler,
  cmIncidentViewHandler,
  cmIncidentDeleteHandler,
  cmDailyLogsEditHandler,
  cmDailyLogsViewHandler,
  cmDailyLogsDeleteHandler,
};

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("call_management", source, reloadMasterTable ? highlightClickedRow : null);
}

//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return globalVariables.PRIVILEGE_CALL_MANAGEMENT && globalVariables.PRIVILEGE_CALL_MANAGEMENT[permissionType];
}

//#region Shared Tabs
const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "call_management");
eventHandlers = { ...eventHandlers, ...warrantCitationArrestTab.eventHandlers };

const firTab = getSharedTab("fir", "call_management");
eventHandlers = { ...eventHandlers, ...firTab.eventHandlers };

const trafficCitationTab = getSharedTab("traffic_citation", "call_management");
eventHandlers = { ...eventHandlers, ...trafficCitationTab.eventHandlers };

const trafficCrashTab = getSharedTab("traffic_crash", "call_management");
eventHandlers = { ...eventHandlers, ...trafficCrashTab.eventHandlers };

const callManagementUnitTab = getSharedTab("cad_unit", "traffic_crash");
eventHandlers = { ...eventHandlers, ...callManagementUnitTab.eventHandlers };

const callManagementCommentTab = getSharedTab("cad_comment", "traffic_crash");
eventHandlers = { ...eventHandlers, ...callManagementCommentTab.eventHandlers };
//#endregion

export const detailSummaryTabs = {
  cm_incident: { title: "Incident" },
  warrant_citation_arrest: warrantCitationArrestTab,
  fir: firTab,
  cm_daily_logs: { title: "Daily Activity" },
  traffic_citation: trafficCitationTab,
  traffic_crash: trafficCrashTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab,
};

export const tableColumns = {
  cm_incident: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    {
      data: "incident_no",
      title: "INCIDENT NO",
      data: (d) => d,
      render: (data) => {
        return `<a  href="${data.search_link}?search=${data.incident_no}" target="_blank">${data.incident_no}</a>`;
      },
    },
    { data: "report_type", title: "INCIDENT TYPE" },
    { data: "orc_no", title: "ORC #" },
    { data: "address", title: "ADDRESS" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
    },
  ],
  cm_daily_logs: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    {
      data: "id",
      title: "DAILY LOG NO",
      responsivePriority: 1,
      data: (d) => d,
      render: (data) => {
        return `<a href="${data.search_link}?search=${data.incident_no}" target="_blank">${data.incident_no}</a>`;
      },
    },
    { data: "user", title: "OFFICER", responsivePriority: 1 },
    { data: "description", title: "DESCRIPTION", responsivePriority: 2 },
    { data: "address2", title: "ADDRESS", responsivePriority: 2 },
    { data: "start_time", title: "START DATE", responsivePriority: 2 },
    { data: "end_time", title: "END DATE", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "print", "progress"]),
      responsivePriority: 0,
    },
  ],
};

$(document).on("click", "#unit_add_tabbed_view", (e) => {
  const table = $("#dc-table-chart").DataTable();
  const clicked_row_data = window.clicked_row_data;

  var windowLocation = "callManagement_unit/moreUnit_" + clicked_row_data[0] + "_" + clicked_row_data[1];
  myPopupWin(windowLocation, () => table.ajax.reload(highlightClickedRow, true));
});

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_CALL_MANAGEMENT";
