//#region BUTTON HANDLERS

//#region COURT MANAGEMENT BUTTONS HANDLER
function courtManagementAttachmentHandler(data) {
  const link = generateLink("attachment", "edit", {
    ...data,
    database: "court_attachments",
  });
  myPopupWin(link);
}

function courtManagementSealHandler(data) {
  const link = generateLink("court_management", "seal", {
    ...data,
    source: data.data_source,
  });
  sealConfirm(link, null, () => callbackRefreshSummary("court_management"));
}

function courtManagementUnsealHandler(data) {
  const link = generateLink("court_management", "unseal", {
    ...data,
    source: data.data_source,
  });
  showConfirm(
    "Unseal the Case?",
    "You will unseal the case and any related records in Peel9 with this action!",
    link,
    null,
    () => callbackRefreshSummary("court_management")
  );
}

function courtManagementViewSourceHandler(data) {
  const link = generateLink("court_management", "view_source", {
    ...data,
    source: data.data_source,
  });
  myPopupWin(link);
}

//#endregion COURT MANAGEMENT BUTTONS HANDLER

//#endregion

export let eventHandlers = {
  courtManagementAttachmentHandler,
  courtManagementSealHandler,
  courtManagementUnsealHandler,
  courtManagementViewSourceHandler,
};

//#region ROW CALLBACKS

const courtManagementRowCallback = (nRow, aData) => {
  if (aData.payload_amount > 0 && aData.grand_total_fine == 0) {
    $("td", nRow).addClass("court-green");
  }

  if (aData.grand_total_fine > 0) {
    $("td", nRow).addClass("court-pink");
  }
};

//#endregion ROW CALLBACKS

//#region Shared Tabs

const evidenceTab = getSharedTab("evidence", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...evidenceTab.eventHandlers };

const printOutTab = getSharedTab("print_out", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...printOutTab.eventHandlers };

const arrestAttachmentTab = getSharedTab("attachment", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...arrestAttachmentTab.eventHandlers };

const narrativeTab = getSharedTab("narrative", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...narrativeTab.eventHandlers };

const firTab = getSharedTab("fir", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...firTab.eventHandlers };

const callManagementTab = getSharedTab("call_management", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...callManagementTab.eventHandlers };

const callManagementUnitTab = getSharedTab("cad_unit", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...callManagementUnitTab.eventHandlers };

const callManagementCommentTab = getSharedTab("cad_comment", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...callManagementCommentTab.eventHandlers };

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "warrant_citation_arrest");
eventHandlers = { ...eventHandlers, ...warrantCitationArrestTab.eventHandlers };

//#endregion

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("warrant_citation_arrest", source, reloadMasterTable ? highlightClickedRow : null);
}
//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return (
    globalVariables.PRIVILEGE_WARRANT_CITATION_ARREST &&
    globalVariables.PRIVILEGE_WARRANT_CITATION_ARREST[permissionType]
  );
}

export const detailSummaryTabs = {
  warrant_citation_arrest: warrantCitationArrestTab,
  evidence: evidenceTab,
  attachment: arrestAttachmentTab,
  narrative: narrativeTab,
  court_management: {
    title: "Court Management",
    tableOptions: { fnRowCallback: courtManagementRowCallback },
    privilege: "PRIVILEGE_COURT_MANAGEMENT",
  },
  fir: firTab,
  call_management: callManagementTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab,
  print_out: printOutTab,
};

export const tableColumns = {
  court_management: [
    { data: "id", visible: false, title: "" },
    { data: "court_date", title: "COURT DATE", responsivePriority: 1 },
    { data: "grand_total_fine", title: "BALANCE DUE", responsivePriority: 5 },
    { data: "payload_amount", title: "AMOUNT PAID", responsivePriority: 6 },
    { data: "bond_status", title: "BOND", responsivePriority: 9 },
    { data: "bond_amount", title: "BOND AMOUNT", responsivePriority: 10 },
    {
      data: "person_name",
      title: "DEFENDANT",
      responsivePriority: 2,
      class: "master-name-detail",
    },
    { data: "dob", title: "DOB", responsivePriority: 3 },
    { data: "data_source", title: "DATA SOURCE", responsivePriority: 4 },
    { data: "ordinance", title: "CHARGES", responsivePriority: 7 },
    { data: "court_officer", title: "OFFICER", responsivePriority: 8 },
    {
      data: null,
      sortable: false,
      visible: checkPrivilege("write") || checkPrivilege("read"),
      responsivePriority: 0,
      defaultContent:
        '<select class="styled-select select_summary">' +
        '    <option value="" selected disabled style="display: none;">Select</option>         ' +
        '    <option value="attachment" class="write-permission">Attachments</option>   ' +
        '    <option value="seal" class="seal-permission">Seal the Case</option>   ' +
        '    <option value="unseal" class="d-none unseal-permission">Unseal the Case</option>   ' +
        '    <option value="view_source" class="read-permission">View Source Case</option>   ' +
        "</select>",
    },
  ],
};

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_WARRANT_CITATION_ARREST";
