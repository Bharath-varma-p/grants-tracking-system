//#region BUTTON HANDLERS

//#region VEHICLE BUTTONS HANDLER
function vehicleEditHandler(data) {
  const link = generateLink("fir", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vehicle"));
}

function vehicleViewHandler(data) {
  const link = generateLink("fir", "view", data);
  myPopupWin(link);
}

//#endregion VEHICLE BUTTONS HANDLER

//#endregion BUTTON HANDLERS

export let eventHandlers = {
  vehicleEditHandler,
  vehicleViewHandler,
};

//#region Shared Tabs
const evidenceTab = getSharedTab("evidence", "fir");
eventHandlers = { ...eventHandlers, ...evidenceTab.eventHandlers };

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "fir");
eventHandlers = { ...eventHandlers, ...warrantCitationArrestTab.eventHandlers };

const firTab = getSharedTab("fir", "fir");
eventHandlers = { ...eventHandlers, ...firTab.eventHandlers };

const attachmentTab = getSharedTab("attachment", "fir");
eventHandlers = { ...eventHandlers, ...attachmentTab.eventHandlers };

const narrativeTab = getSharedTab("narrative", "fir");
eventHandlers = { ...eventHandlers, ...narrativeTab.eventHandlers };

const callManagementTab = getSharedTab("call_management", "fir");
eventHandlers = { ...eventHandlers, ...callManagementTab.eventHandlers };

const callManagementUnitTab = getSharedTab("cad_unit", "fir");
eventHandlers = { ...eventHandlers, ...callManagementUnitTab.eventHandlers };

const callManagementCommentTab = getSharedTab("cad_comment", "fir");
eventHandlers = { ...eventHandlers, ...callManagementCommentTab.eventHandlers };

//#endregion

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("fir", source, reloadMasterTable ? highlightClickedRow : null);
}

export const detailSummaryTabs = {
  fir: firTab,
  attachment: attachmentTab,
  vehicle: { title: "Vehicle" },
  narrative: narrativeTab,
  evidence: evidenceTab,
  warrant_citation_arrest: warrantCitationArrestTab,
  call_management: callManagementTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab,
};

export const tableColumns = {
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
    {
      data: "lp_plate_number",
      title: "LICENSE PLATE",
      class: "master-vehicle-detail",
    },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit"]),
      responsivePriority: 0,
    },
  ],
};

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_FIR";
