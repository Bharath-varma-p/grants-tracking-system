//#region BUTTON HANDLERS

//#region CITATION WITNESS BUTTONS HANDLER
function trafficCitationWitnessEditHandler(data) {
  const link = generateLink("traffic_citation_witness", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("traffic_citation_witness"));
}

function trafficCitationWitnessViewHandler(data) {

  let link;
  link = generateLink("traffic_citation_witness", "view", data);

  myPopupWin(link);
}

function trafficCitationWitnessDeleteHandler(data) {
  const link = generateLink("traffic_citation_witness", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("traffic_citation_witness"));
}

//#endregion CITATION WITNESS  BUTTONS HANDLER

//#region TRAFFIC CITATION ARREST HANDLER

function trafficCitationArrestDeleteHandler (data) {
  const link = "/traffic_citation_arrest_delete" + data.id
  deletePopup(link, null, () => callbackRefreshSummary("traffic_citation_arrest"));
}

//#endregion

//#region COURT ATTACHMENTS

function courtAttachmentsViewHandler (data) {
  const link = "/traffic_citation_arrest_delete" + data.id
  deletePopup(link, null, () => callbackRefreshSummary("traffic_citation_arrest"));
}

//#endregion

//#endregion BUTTON HANDLERS

export let eventHandlers = {
  trafficCitationWitnessDeleteHandler,
  trafficCitationWitnessEditHandler,
  trafficCitationWitnessViewHandler,
  trafficCitationArrestDeleteHandler,
  courtAttachmentsViewHandler,
};

//#region Shared Tabs
const evidenceTab = getSharedTab("evidence", "traffic_citation");
eventHandlers = {...eventHandlers, ...evidenceTab.eventHandlers};

const trafficCrashTab = getSharedTab("traffic_crash", "traffic_citation");
eventHandlers = {...eventHandlers, ...trafficCrashTab.eventHandlers};

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "traffic_citation");
eventHandlers = {...eventHandlers, ...warrantCitationArrestTab.eventHandlers};

const firTab = getSharedTab("fir", "traffic_citation");
eventHandlers = {...eventHandlers, ...firTab.eventHandlers};

const attachmentTab = getSharedTab("traffic_citation_attachments", "traffic_citation");
eventHandlers = {...eventHandlers, ...attachmentTab.eventHandlers};

const printOutTab = getSharedTab("print_out", "traffic_citation");
eventHandlers = {...eventHandlers, ...printOutTab.eventHandlers};

const callManagementTab = getSharedTab("call_management", "traffic_citation");
eventHandlers = {...eventHandlers, ...callManagementTab.eventHandlers};

const callManagementUnitTab = getSharedTab("cad_unit", "traffic_citation");
eventHandlers = {...eventHandlers, ...callManagementUnitTab.eventHandlers};

const callManagementCommentTab = getSharedTab("cad_comment", "traffic_citation");
eventHandlers = {...eventHandlers, ...callManagementCommentTab.eventHandlers};

const narrativeTab = getSharedTab("narrative", "traffic_citation");
eventHandlers = {...eventHandlers, ...narrativeTab.eventHandlers};
//#endregion

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh(
    "traffic_citation",
    source,
    reloadMasterTable ? highlightClickedRow : null
  );
}
//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return (
    globalVariables.PRIVILEGE_TRAFFIC_CITATION_WARNING &&
    globalVariables.PRIVILEGE_TRAFFIC_CITATION_WARNING[permissionType]
  );
}

export const detailSummaryTabs = {
  traffic_citation_arrest: { title: "Arrest" },
  traffic_citation_witness: { title: "Witness" },
  print_out: printOutTab,
  court_attachments: { title: "Payments" },
  traffic_citation_attachments: attachmentTab,
  narrative: narrativeTab,
  evidence: evidenceTab,
  traffic_crash: trafficCrashTab,
  warrant_citation_arrest: warrantCitationArrestTab,
  fir: firTab,
  traffic_citations_court_edited: {
    title: "Case Development",
  },
  call_management: callManagementTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab
};

export const tableColumns = {
  traffic_citation_arrest: [
    { data: "id", visible: false, title: "" },
    { data: "arrest_date", title: "Date", class: "master-name-detail" },
    { data: "court_action", title: "Court Action" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "delete",
      ]),
    },
  ],
  court_attachments: [
    { data: "id", visible: false, title: "" },
    { data: "incident_no", title: "Incident No" },
    { data: "file_name", title: "Name" },
    { data: "edited_date", title: "Date" },
  ],
  traffic_citation_witness: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "date", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "witness_race", title: "RACE" },
    { data: "witness_sex", title: "SEX" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "hourglass",
        "locked",
        "court_management",
        "progress",
      ]),
    },
  ],
  traffic_citations_court_edited: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "court_date", title: "Court Date", responsivePriority: 1 },
    { data: "grand_total_fine", title: "Balance", responsivePriority: 1 },
    { data: "bond_status", title: "Bond", responsivePriority: 1 },
    { data: "bond_amount", title: "Bond Amount", responsivePriority: 1 },
    { data: "payload_amount", title: "Amount Paid", responsivePriority: 1 },
    { data: "ordinance", title: "Charges", responsivePriority: 1 },
    { data: "payment_method", title: "Payment Method", responsivePriority: 1 },
  ],
};



//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_TRAFFIC_CITATION_WARNING";
