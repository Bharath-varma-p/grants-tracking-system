//#region BUTTON HANDLERS

//#region CHECK LOGS BUTTONS HANDLER
function vacationWatchCheckLogsEditHandler(data) {
  const link = generateLink("vacation_watch_check_logs", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vacation_watch_check_logs", true));
}

function vacationWatchCheckLogsViewHandler(data) {
  let link;
  link = generateLink("vacation_watch_check_logs", "view", data);

  myPopupWin(link);
}

function vacationWatchCheckLogsDeleteHandler(data) {
  const link = generateLink("vacation_watch_check_logs", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vacation_watch_check_logs", true));
}

//#endregion CHECK LOGS BUTTONS HANDLER

//#region PERSON BUTTONS HANDLER
function vacationWatchPersonEditHandler(data) {
  const link = generateLink("vacation_watch_person", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vacation_watch_person", true));
}

function vacationWatchPersonViewHandler(data) {
  const link = generateLink("vacation_watch_person", "view", data);
  myPopupWin(link);
}

function vacationWatchPersonDeleteHandler(data) {
  const link = generateLink("vacation_watch_person", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vacation_watch_person", true));
}

//#endregion PERSON BUTTONS HANDLER

//#region CHECK LIST BUTTON HANDLERS
function vacationWatchCheckListSave({ data, e }) {
  const link = generateLink("vacation_watch_check_list", "save", data);

  $.ajax({
    type: "POST",
    url: link,
    data: {
      list_items: data,
    },
    success: function (data) {
      callbackRefreshSummary("vacation_watch_check_list", true);
      $(e.target).hide();
      $.alert("Check list saved");
    },
  });
}

function vacationWatchCheckListDeleteHandler(data) {
  const link = generateLink("vacation_watch_check_list", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vacation_watch_check_list", true));
}

function vacationWatchCheckListCheckBoxHandler({ data, row }) {
  data["is_checked"] === "true" ? (data["is_checked"] = "false") : (data["is_checked"] = "true");
  row.data(data).draw();
  $("#save_check_list").show();
}

function vacationWatchCheckListResetCheckMarks({ data, e }) {
  const link = generateLink("vacation_watch_check_list", "reset", data[0]);
  resetListPopup(link, null, () => callbackRefreshSummary("vacation_watch_check_list", true));
}

//#endregion CHECK LIST BUTTON HANDLERS
//#region VEHICLE BUTTONS HANDLER
function vacationWatchVehicleEditHandler(data) {
  const link = generateLink("vacation_watch_vehicle", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vacation_watch_vehicle", true));
}

function vacationWatchVehicleViewHandler(data) {
  const link = generateLink("vacation_watch_vehicle", "view", data);
  myPopupWin(link);
}

function vacationWatchVehicleDeleteHandler(data) {
  const link = generateLink("vacation_watch_vehicle", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vacation_watch_vehicle", true));
}

//#endregion VEHICLE BUTTONS HANDLER

//#region BUSINESS BUTTONS HANDLER
function vacationWatchBusinessEditHandler(data) {
  const link = generateLink("vacation_watch_business", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vacation_watch_business"));
}

function vacationWatchBusinessViewHandler(data) {
  const link = generateLink("vacation_watch_business", "view", data);
  myPopupWin(link);
}

function vacationWatchBusinessDeleteHandler(data) {
  const link = generateLink("vacation_watch_business", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vacation_watch_business"));
}
//#endregion BUSINESS BUTTONS HANDLER
//#endregion BUTTON HANDLERS

export let eventHandlers = {
  vacationWatchCheckLogsDeleteHandler,
  vacationWatchCheckLogsEditHandler,
  vacationWatchCheckLogsViewHandler,
  vacationWatchPersonDeleteHandler,
  vacationWatchPersonEditHandler,
  vacationWatchPersonViewHandler,
  vacationWatchBusinessEditHandler,
  vacationWatchBusinessViewHandler,
  vacationWatchBusinessDeleteHandler,
  vacationWatchCheckListSave,
  vacationWatchCheckListDeleteHandler,
  vacationWatchCheckListCheckBoxHandler,
  vacationWatchCheckListResetCheckMarks,
  vacationWatchVehicleDeleteHandler,
  vacationWatchVehicleEditHandler,
  vacationWatchVehicleViewHandler,
};

//#region DRAW CALLBACKS

const vacationWatchCheckListDrawCallback = (oSettings) => {
  if ($("#save_check_list").length == 0) {
    $("#" + oSettings.sTableId).before(
      `<button type="button" class="btn btn-primary" id="save_check_list" style="display: none;margin-right: 30px">Save Changes</button>`
    );
  }
  if ($("#reset_check_list").length == 0) {
    $("#" + oSettings.sTableId).before(
      `<button type="button" class="btn btn-danger" id="reset_check_list">Reset Check Marks</button>`
    );
  }
};

//#endregion DRAW CALLBACKS

//#region ROW CALLBACKS

const vacationWatchCheckListRowCallback = (nRow, aData) => {
  if (aData.is_checked && aData.is_checked == "true") {
    $(".checkbox", nRow).prop("checked", true);
  }
};

//#endregion ROW CALLBACKS

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("vacation_watch", source, reloadMasterTable ? highlightClickedRow : null);
}
//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return globalVariables.PRIVILEGE_VACATION_WATCH && globalVariables.PRIVILEGE_VACATION_WATCH[permissionType];
}

const attachmentTab = getSharedTab("attachment", "vacation_watch");
eventHandlers = { ...eventHandlers, ...attachmentTab.eventHandlers };

export const detailSummaryTabs = {
  vacation_watch_check_logs: { title: "Check Logs" },
  vacation_watch_person: { title: "Person" },
  vacation_watch_business: { title: "Business" },
  vacation_watch_check_list: {
    title: "Check List",
    tableOptions: {
      fnDrawCallback: vacationWatchCheckListDrawCallback,
      fnRowCallback: vacationWatchCheckListRowCallback,
    },
  },
  vacation_watch_vehicle: { title: "Vehicle" },
  attachment: attachmentTab,
};

export const tableColumns = {
  vacation_watch_check_logs: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "check_date", title: "Check Date" },
    { data: "officer_name", title: "Officer" },
    { data: "type", title: "Disposition" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "print"]),
    },
  ],
  vacation_watch_person: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "person_type", title: "Person Type" },
    { data: "phone", title: "PHONE" },
    { data: "email", title: "EMAIL" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
    },
  ],
  vacation_watch_business: [
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
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
    },
  ],
  vacation_watch_vehicle: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "lp_plate_number", title: "LICENSE PLATE #" },
    { data: "vehicle_make", title: "VEHICLE MAKE" },
    { data: "vehicle_model", title: "VEHICLE MODEL" },
    { data: "vehicle_year", title: "VEHICLE YEAR" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
    },
  ],
  vacation_watch_check_list: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("write"),
      title: "CHECK",
      defaultContent: createSummaryButtons(["check_box"]),
    },
    { data: "is_checked", visible: false },
    { data: "name", title: "ITEM NAME" },
    {
      data: null,
      class: "mw-25",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["delete"]),
    },
  ],
};

$(document).on("click", "#reset_check_list", (e) => {
  const table = $(e.target).siblings(".datatable").eq(0);
  const source = table.attr("data-source");
  const data = table.DataTable().rows().data().toArray();
  if (source == "vacation_watch_check_list") vacationWatchCheckListResetCheckMarks({ data, e });
});
$(document).on("click", "#save_check_list", (e) => {
  const table = $(e.target).siblings(".datatable").eq(0);
  const source = table.attr("data-source");
  const data = table.DataTable().rows().data().toArray();
  if (source == "vacation_watch_check_list") vacationWatchCheckListSave({ data, e });
});

$(document).on("click", ".checkbox", (e) => {
  const { source, data, row } = getSummaryRowData(e);
  if (source == "vacation_watch_check_list") vacationWatchCheckListCheckBoxHandler({ data, row });
});

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_VACATION_WATCH";
