//#region BUTTONS HANDLERS

//#region PERSON BUTTONS HANDLER
function permitPersonEditHandler(data) {
  const link = generateLink("permit", "person_edit", data);
  myPopupWin(link, () => callbackRefreshSummary("permit_person", true));
}

function permitPersonViewHandler(data) {
  const link = generateLink("permit", "person_view", data);
  myPopupWin(link);
}

function permitPersonDeleteHandler(data) {
  const link = generateLink("permit", "person_delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("permit_person", true));
}

//#endregion PERSON BUTTONS HANDLER

//#region VEHICLE BUTTONS HANDLER
function permitVehicleEditHandler(data) {
  const link = generateLink("permit", "vehicle_edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vehicle"));
}

function permitVehicleViewHandler(data) {
  const link = generateLink("permit", "vehicle_view", data);
  myPopupWin(link);
}

function permitVehicleDeleteHandler(data) {
  const link = generateLink("permit", "vehicle_delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vehicle"));
}
//#endregion VEHICLE BUTTONS HANDLER

//#region BUSINESS BUTTONS HANDLER
function permitBusinessEditHandler(data) {
  const link = generateLink("permit", "business_edit", data);
  myPopupWin(link, () => callbackRefreshSummary("business"));
}

function permitBusinessViewHandler(data) {
  const link = generateLink("permit", "business_view", data);
  myPopupWin(link);
}

function permitBusinessDeleteHandler(data) {
  const link = generateLink("permit", "business_delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("business"));
}
//#endregion BUSINESS BUTTONS HANDLER

//#endregion BUTTONS HANDLERS

export let eventHandlers = {
  permitPersonEditHandler,
  permitPersonViewHandler,
  permitPersonDeleteHandler,
  permitBusinessEditHandler,
  permitBusinessViewHandler,
  permitBusinessDeleteHandler,
  permitVehicleEditHandler,
  permitVehicleDeleteHandler,
  permitVehicleViewHandler
};

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh(
    "permit",
    source,
    reloadMasterTable ? highlightClickedRow : null
  );
}

//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return (
    globalVariables.PRIVILEGE_PERMITS &&
    globalVariables.PRIVILEGE_PERMITS[permissionType]
  );
}

//#region Shared Tabs
const attachmentTab = getSharedTab("permit_attachments", "permit");
eventHandlers = {...eventHandlers, ...attachmentTab.eventHandlers};
//#endregion


export const detailSummaryTabs = {
  permit_person: { title: "Person" },
  permit_business: { title: "Business" },
  permit_vehicle: { title: "Vehicle" },
  permit_attachments: attachmentTab,
};

export const tableColumns = {
  permit_person: [
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
  permit_business: [
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
  permit_vehicle: [
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


//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_PERMITS";
