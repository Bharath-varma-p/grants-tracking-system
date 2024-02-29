//#region BUTTONS HANDLERS
//#region INVOLVED CASES BUTTONS HANDLER
function involvedCasesGoToSourcehandler(data) {
  const link = data.detailURI;
  myPopupWin(link, () => callbackRefreshSummary("master_name_solve_search"));
}
//#endregion INVOLVED CASES BUTTONS HANDLER
//#endregion BUTTONS HANDLERS
export let eventHandlers = { involvedCasesGoToSourcehandler };
//#region ROW CALLBACKS

const involvedCasesCallback = (nRow, aData) => {
  if (aData.detailURI) {
    $(".summary-go-to-source", nRow).removeClass("d-none").attr("title", "Go to details");
  }
};

//#endregion ROW CALLBACKS

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("master_name_solve_search", source, reloadMasterTable ? highlightClickedRow : null);
}

export const detailSummaryTabs = {
  solve_search_involved_cases: { title: "Involved Cases", tableOptions: { fnRowCallback: involvedCasesCallback } },
  solve_search_person_other_data: { title: "Other Data" },
};

export const tableColumns = {
  solve_search_involved_cases: [
    {
      data: "caseNumber",
      title: "Case Number",
    },
    {
      data: "agencyName",
      title: "Agency Name",
    },
    {
      data: "pointOfContactName",
      title: "Point of Contact Name",
    },
    {
      data: "pointOfContactEmail",
      title: "Point of Contact Email",
    },
    {
      data: "pointOfContactPhone",
      title: "Point of Contact Phone",
    },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["go_to_source"]),
    },
  ],
  solve_search_person_other_data: [
    {
      data: "Title",
      title: "Title",
    },
    {
      data: "Value",
      title: "Value",
    },
  ],
};

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_MASTER_NAMES";
