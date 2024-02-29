//#region BUTTONS HANDLERS
//#region VEHICLE BUTTONS HANDLER
function incidentVehicleEditHandler(data) {
  const link = generateLink("vehicle", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("incident_vehicle"));
}

function incidentVehicleViewHandler(data) {
  const link = generateLink("vehicle", "view", data);
  myPopupWin(link);
}

function incidentVehicleDeleteHandler(data) {
  const link = generateLink("vehicle", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("incident_vehicle"));
}

//#endregion VEHICLE BUTTONS HANDLER

//#region ARREST BUTTONS HANDLER
function arrestEditHandler(data) {
  const link = generateLink("arrest", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("arrest"));
}

function arrestViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name)
    link = generateLink("arrest", "view", { id: data.id }, { incident_id: data.incident_id });
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function arrestDeleteHandler(data) {
  const link = generateLink("arrest", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("arrest"));
}

function arrestCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", { ...data, source: "Arrest" });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function arrestSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("arrest"));
}
//#endregion ARREST BUTTONS HANDLER

//#region SUSPECT BUTTONS HANDLER
function suspectEditHandler(data) {
  const link = generateLink("suspect", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("suspect"));
}

function suspectViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("suspect", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function suspectDeleteHandler(data) {
  const link = generateLink("suspect", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("suspect"));
}

function suspectCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", { ...data, source: "Suspect" });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function suspectSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("suspect"));
}
//#endregion SUSPECT BUTTONS HANDLER

//#region PROPERTY BUTTONS HANDLER
function propertyEditHandler(data) {
  const link = generateLink("property", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("property"));
}

function propertyViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("property", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function propertyDeleteHandler(data) {
  const link = generateLink("property", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("property"));
}

//#endregion PROPERTY BUTTONS HANDLER

//#region DAILY LOG BUTTONS HANDLER
function dailyActivityEditHandler(data) {
  const link = generateLink("daily_log", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("daily_log"));
}

function dailyActivityViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("daily_log", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function dailyActivityDeleteHandler(data) {
  const link = generateLink("daily_log", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("daily_log"));
}

//#endregion DAILY LOG BUTTONS HANDLER

//#region TRAFFIC CRASH BUTTONS HANDLER
function trafficCrashEditHandler(data) {
  const link = generateLink("traffic_unit", "edit", { ...data, id: data.unit_id });
  myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
}

function trafficCrashViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name)
    link = generateLink("traffic_unit", "view", { ...data, id: data.unit_id });
  else link = generateLink("edit_view_request", null, { ...data, id: data.unit_id });

  myPopupWin(link);
}

function trafficCrashDeleteHandler(data) {
  const link = generateLink("traffic_unit", "delete", { ...data, id: data.unit_id });
  deletePopup(link, null, () => callbackRefreshSummary("traffic_crash"));
}

function trafficCrashApproveHandler(data) {
  const link = generateLink("traffic_crash", "approve", data);
  myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
}

async function trafficCrashSubmissionHandler(data) {
  const isCustomFips = globalVariables.custom_fips;
  const fipsCode = data.fips_code;

  if (isCustomFips && !fipsCode) {
    $.alert("Please enter a FIPS code at traffic crash edit page");

    return;
  }

  const diagramCount = data.diagram_count;

  let crash_diagram_id = "";

  if (diagramCount > 1) {
    try {
      crash_diagram_id = await showCrashDiagramSelectModal(data.crash_no);
    } catch {
      return;
    }
  }

  const link = generateLink("traffic_crash", "submit", { ...data }, { crash_diagram: crash_diagram_id });
  myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
}

async function trafficCrashPrintHandler(data) {
  const diagramCount = data.diagram_count;

  let crash_diagram_id = "";

  if (diagramCount > 1) {
    try {
      crash_diagram_id = await showCrashDiagramSelectModal(data.crash_no);
    } catch {
      return;
    }
  }

  const link = generateLink("traffic_crash", "print", { ...data }, { crash_diagram: crash_diagram_id });
  myPopupWin(link);
}

function trafficCrashUnlockHandler(data) {
  const link = generateLink("traffic_crash", "unlock", data);
  myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
}

function trafficCrashCancelApproveHandler(data) {
  const link = generateLink("traffic_crash", "cancel_user_approve", data);

  $.confirm({
    title: "Cancel User Approval",
    content: "Confirm to continue!",
    content: ``,
    buttons: {
      confirm: function (ev) {
        $.post(link, { type: "traffic_crash" }).done(() => {
          $.alert("The user approval has been succesfully cancelled");
          callbackRefreshSummary("traffic_crash");
        });
      },
      cancel: function () {
        //  $.alert('Canceled!');
      },
    },
  });
}

//#endregion TRAFFIC CRASH BUTTONS HANDLER

//#region PERMIT BUTTONS HANDLER
function permitEditHandler(data) {
  const link = generateLink("permit", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("permit"));
}

function permitViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("permit", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function permitDeleteHandler(data) {
  const link = generateLink("permit", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("permit"));
}

//#endregion PERMIT BUTTONS HANDLER

//#region ALL SUMMARY BUTTONS HANDLER

function allHistoryViewHandler(data) {
  let link;

  if (data.data_source !== "Vehicle Owner") link = generateLink("edit_view_request", null, data);
  else link = generateLink("master_vehicle", "view", data);

  myPopupWin(link);
}

//#endregion ALL SUMMARY BUTTONS HANDLER

//#endregion BUTTONS HANDLERS

export let eventHandlers = {
  incidentVehicleEditHandler,
  incidentVehicleViewHandler,
  incidentVehicleDeleteHandler,
  arrestEditHandler,
  arrestViewHandler,
  arrestDeleteHandler,
  arrestCourtManagementHandler,
  arrestSealHandler,
  suspectEditHandler,
  suspectViewHandler,
  suspectDeleteHandler,
  suspectCourtManagementHandler,
  suspectSealHandler,
  propertyEditHandler,
  propertyViewHandler,
  propertyDeleteHandler,
  dailyActivityViewHandler,
  dailyActivityEditHandler,
  dailyActivityDeleteHandler,
  trafficCrashEditHandler,
  trafficCrashViewHandler,
  trafficCrashDeleteHandler,
  trafficCrashApproveHandler,
  trafficCrashSubmissionHandler,
  trafficCrashPrintHandler,
  trafficCrashUnlockHandler,
  trafficCrashCancelApproveHandler,
  permitViewHandler,
  permitEditHandler,
  permitDeleteHandler,
  allHistoryViewHandler,
};

//#region ROW CALLBACKS
const trafficCrashRowCallback = (nRow, aData) => {
  if (aData.report_items) {
    const isPrivateProperty = aData.report_items.split(",").some((p) => p == "PP");
    if (isPrivateProperty) $("#state_submission", nRow).hide();
  } else {
    $("#state_submission", nRow).removeClass("d-none");
  }

  if (aData.oh1_submission == 1) {
    if (globalVariables.crash_submission == "yes") {
      $("#state_submission2", nRow).removeClass("d-none");
      $("#state_submission", nRow).hide();
    }
  }
};

//#endregion ROW CALLBACKS

//#region CUSTOM RENDERINGS
const locationRender = (mapItems, summaryContainer, id) => {
  summaryContainer.empty();
  summaryContainer.append(`
  <div class="summary_map">
    <div class="col-md-10">
      <div id="case_map_${id}" style="height:500px"></div>
    </div>
    <div class="col-md-2">
      <ul id="map-marker-lejant" style="background-color: white;">
        <li>
          <div class="my-custom-icon marker-default"></div>
          <div>Owner Address</div>
        </li>  
        <li>
          <div class="my-custom-icon marker-arrest"></div>
          <div>Arrest Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-incident-location"></div>
          <div>Incident/Offense Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-suspect"></div>
          <div>Suspect</div>
        </li>
        <li>
          <div class="my-custom-icon marker-warrant-citation-arrest"></div>
          <div>Warrant-Citation Arrest Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-crash-owner"></div>
          <div>Traffic Unit</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-citation"></div>
          <div>Traffic Citation Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-fir"></div>
          <div>FIR Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-incident-evidence"></div>
          <div>Evidence Recovery Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-incident-property"></div>
          <div>Property Recovery Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-daily-activity"></div>
          <div>Daily Activity</div>
        </li>
        <li>
          <div class="my-custom-icon marker-permit"></div>
          <div>Permit Location</div>
        </li>
      </ul>
    </div>
    <div class="clearfix"></div>
  </div>
  `);

  var xf = null;
  xf = crossfilter(mapItems);

  var drawMap = function (addControls) {
    let map_skin = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    if ("{{darkMode}}" == "true") {
      map_skin = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
    }

    const mapLink = '<a href="https://wiki.openstreetmap.org/wiki/Tile_servers</a>';
    var osm = L.tileLayer(map_skin, {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 24,
    }).addTo(map);

    var defaultCenter = globalVariables.defaultCenter;

    var defaultZoom = 15;

    map.setView(defaultCenter, defaultZoom);
    if (addControls) {
      var layerscontrol = L.control.fullscreen().addTo(map);
      if ("{{darkMode}}" == "true") {
        L.control
          .layers(
            {
              "Dark Map": osm,
              OSM: L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"),
              google: L.tileLayer("https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}", {
                attribution: "google",
              }),
            },
            {},
            {},
            { position: "topleft", collapsed: false }
          )
          .addTo(map);
      } else {
        L.control
          .layers(
            {
              OSM: osm,
              "Dark Map": L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"),
              google: L.tileLayer("https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}", {
                attribution: "google",
              }),
            },
            {},
            {},
            { position: "topleft", collapsed: false }
          )
          .addTo(map);
      }
    } else {
      var layerscontrol = L.control.fullscreen().addTo(map);
      map.removeControl(layerscontrol);
    }

    /*
    circle = L.CircleMarker.extend({
      options: {
        setOpacity: 10,
      }
    });
    */

    var groupCoordinates = _.groupBy(mapItems, function (x) {
      return x.pointx.toString() + x.pointy.toString();
    });

    Object.keys(groupCoordinates).forEach((key) => {
      var groupMapItems = groupCoordinates[key];

      var marker_class_name = "marker-default";

      var d = groupMapItems[0];

      if (d.data_source == "Arrest") {
        marker_class_name = "marker-arrest";
      } else if (d.data_source == "Vehicle Owner Address") {
        marker_class_name = "marker-default";
      } else if (d.data_source == "Incident/Offense Location") {
        marker_class_name = "marker-incident-location";
      } else if (d.data_source == "Suspect") {
        marker_class_name = "marker-suspect";
      } else if (d.data_source == "Warrant-Citation Arrest") {
        marker_class_name = "marker-warrant-citation-arrest";
      } else if (d.data_source == "Traffic Crash Unit") {
        marker_class_name = "marker-traffic-crash-owner";
      } else if (d.data_source == "Traffic Citation") {
        marker_class_name = "marker-traffic-citation";
      } else if (d.data_source == "FIR") {
        marker_class_name = "marker-fir";
      } else if (d.data_source == "Evidence Recovery Address") {
        marker_class_name = "marker-incident-evidence";
      } else if (d.data_source == "Property Recovery Address") {
        marker_class_name = "marker-incident-property";
      } else if (d.data_source == "Daily Activity") {
        marker_class_name = "marker-daily-activity";
      } else if (d.data_source == "Permit") {
        marker_class_name = "marker-permit";
      }

      //var circle = L.circleMarker([d["pointy"], d["pointx"]], {
      var circle = L.marker([d["pointy"], d["pointx"]], {
        title: "Marker",
        className: "iframe",
        radius: 15,
        opacity: 1,
        fillOpacity: 0.75,
        icon: new L.DivIcon({
          className: "my-custom-icon " + marker_class_name,
          html: groupMapItems.length > 1 ? groupMapItems.length : "",
        }),
      }).addTo(map);

      var popupContent = groupMapItems
        .map((mapItem) => {
          let incident_no = mapItem.incident_no;
          if (incident_no && mapItem.department === globalVariables.department_name && mapItem.search_link) {
            incident_no = `<a href="${mapItem.search_link}?search=${incident_no}" target="_blank">${incident_no}</a>`;
          }

          return `<div class="more-detail-container">
            ${mapItem.object_name}
            <br/>
            <strong><i> ${mapItem.data_source}</i></strong> 
            ${
              mapItem.incident_no
                ? `
              <br/>
              ${incident_no}
            `
                : ""
            }
            <br/>
            ${mapItem.department}
            <br/>
            <span style='font-weight:bold; color:blue; cursor: pointer;' class="more-details iframe" data-id="${
              mapItem.id
            }" data-source="${mapItem.data_source}" data-incident-id="${mapItem.incident_id}" data-incident-no ="${
            mapItem.incident_no
          }" data-department="${mapItem.department}">More Details...</span>
        </div>
      `;
        })
        .join("");

      circle.on("mouseover", function (e) {
        //open popup;
        var popup = L.popup()
          .setLatLng(e.latlng)
          .setContent(
            `
              <div style="display:flex; overflow:auto"	>
                ${popupContent}
              </div>
            `
          )
          .openOn(map);
      });
    });
  };

  var map = L.map("case_map_" + id);
  drawMap(true);

  var lats = mapItems.map((rec) => rec["pointx"]);
  var lons = mapItems.map((rec) => rec["pointy"]);

  map.fitBounds([
    [_.min(lons) - 0.002, _.min(lats) - 0.002],
    [_.max(lons) + 0.002, _.max(lats) + 0.002],
  ]);

  //summaryContainer.removeClass("tablePanelBorder");
};

function vehicleNetworkRender(data, summaryContainer, id) {
  summaryContainer.append(`
    <div class="col-md-offset-3 col-md-6 col-sm-12" style="background-color:white; height:400px;" id="graph-chart">
    </div>
    <div class="clearfix"></div>
  `);

  (async () => {
    const { networkRender } = await import(`/js/detail-summary/master_vehicle_network.js`);
    networkRender(data);
  })();
}

//#endregion CUSTOM RENDERINGS

//#region Shared Tabs
const evidenceTab = getSharedTab("evidence", "master_vehicle");
eventHandlers = { ...eventHandlers, ...evidenceTab.eventHandlers };

const trafficCitationTab = getSharedTab("traffic_citation", "master_vehicle");
eventHandlers = { ...eventHandlers, ...trafficCitationTab.eventHandlers };

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "master_vehicle");
eventHandlers = { ...eventHandlers, ...warrantCitationArrestTab.eventHandlers };

const firTab = getSharedTab("fir", "master_vehicle");
eventHandlers = { ...eventHandlers, ...firTab.eventHandlers };
//#endregion

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("master_vehicle", source, reloadMasterTable ? highlightClickedRow : null);
}

//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return globalVariables.PRIVILEGE_MASTER_VEHICLES && globalVariables.PRIVILEGE_MASTER_VEHICLES[permissionType];
}

export const detailSummaryTabs = {
  arrest: { title: "Arrest", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  suspect: { title: "Suspect", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  evidence: evidenceTab,
  property: { title: "Property", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  incident_vehicle: { title: "Incident Vehicle", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  daily_log: { title: "Daily Activity", privilege: "PRIVILEGE_DAILY_ACTIVITY_DATABASE" },
  traffic_crash: {
    title: "Traffic Crash",
    tableOptions: { fnRowCallback: trafficCrashRowCallback },
    privilege: "PRIVILEGE_TRAFFIC_CRASH",
  },
  traffic_citation: trafficCitationTab,
  warrant_citation_arrest: warrantCitationArrestTab,
  fir: firTab,
  permit: { title: "Permit", privilege: "PRIVILEGE_PERMITS" },
  location: { title: "Location", alwaysShow: true, customRender: locationRender },
  network: { title: "Vehicle Network", alwaysShow: true, customRender: vehicleNetworkRender, doNotWriteCount: true },
  owner_history: { title: "Owner History", tableOptions: { order: [[0, "asc"]] } },
  all_history: { title: "All History", tableOptions: { order: [[4, "desc"]] } },
};

export const tableColumns = {
  incident_vehicle: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "crime_name", title: "INCIDENT TYPE", responsivePriority: 1 },
    { data: "date_time", title: "INCIDENT DATE", responsivePriority: 1 },
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "progress"]),
      responsivePriority: 0,
    },
  ],
  arrest: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "crime_name", title: "INCIDENT TYPE", responsivePriority: 1 },
    { data: "date_time", title: "INCIDENT DATE", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "dob", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "hourglass",
        "locked",
        "court_management",
        "progress",
        "seal",
      ]),
    },
  ],
  suspect: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "crime_name", title: "INCIDENT TYPE", responsivePriority: 1 },
    { data: "date_time", title: "INCIDENT DATE", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "dob", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
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
        "seal",
      ]),
    },
  ],
  property: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "date_recovered", title: "DATE RECOVERED" },
    { data: "property_type", title: "PROPERTY TYPE" },
    { data: "description", title: "DESCRIPTION" },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "progress"]),
      responsivePriority: 0,
    },
  ],
  daily_log: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "id", title: "DAILY LOG NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "user", title: "OFFICER", responsivePriority: 1 },
    { data: "description", title: "DESCRIPTION", responsivePriority: 2 },
    { data: "address2", title: "ADDRESS", responsivePriority: 2 },
    { data: "start_time", title: "START DATE", responsivePriority: 2 },
    { data: "end_time", title: "END DATE", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "print", "progress"]),
      responsivePriority: 0,
    },
  ],
  traffic_crash: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "crash_no", title: "CRASH NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "crash_date", title: "CRASH DATE", responsivePriority: 1 },
    { data: "Address", title: "ADDRESS", responsivePriority: 2 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "approve",
        "crash_submission",
        "crash_submitted",
        "hourglass",
        "unlock",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ],
  permit: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "incident_no", title: "PERMIT NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "permit_type", title: "PERMIT TYPE", responsivePriority: 1 },
    { data: "address2", title: "PERMIT ADDRESS", responsivePriority: 1 },
    { data: "start_time", title: "START DATE", responsivePriority: 2 },
    { data: "end_time", title: "EXPIRATION DATE", responsivePriority: 2 },
    { data: "revoked_date", title: "REVOKED DATE", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "progress"]),
      responsivePriority: 0,
    },
  ],
  owner_history: [
    { data: "id", visible: false, title: "" },
    { data: "owner_name", title: "FORMER OWNER", class: "master-name-detail" },
  ],
  all_history: [
    { data: "id", visible: false, title: "" },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 2, data: (d) => d, render: incidentLinkRender },
    { data: "data_source", title: "TYPE", responsivePriority: 2 },
    { data: "date_formatted", title: "CREATED DATE", responsivePriority: 1 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
  ],
};

$(document).on("click", ".more-details", function () {
  const id = $(this).attr("data-id");
  const data_source = $(this).attr("data-source");
  const incident_id = $(this).attr("data-incident-id");
  const incident_no = $(this).attr("data-incident-no");
  const department = $(this).attr("data-department");

  const data = {
    id,
    incident_id,
    incident_no,
    department,
  };

  let viewUrl,
    transformedDataSource = data_source;

  if (data_source == "Arrest") {
    transformedDataSource = "Incident";
  } else if (data_source == "Suspect") {
    transformedDataSource = "Incident";
  } else if (data_source == "Incident/Offense Location") {
    transformedDataSource = "Incident";
  } else if (data_source == "Traffic Crash Unit") {
    transformedDataSource = "Traffic Crash";
  } else if (data_source == "Evidence Recovery Address") {
    transformedDataSource = "Evidence";
  } else if (data_source == "Property Recovery Address") {
    transformedDataSource = "Property";
  }

  if (data_source !== "Vehicle Owner Address")
    viewUrl = generateLink("edit_view_request", null, { ...data, data_source: transformedDataSource });
  else viewUrl = generateLink("master_name", "view", data);

  if (viewUrl) myPopupWin(viewUrl);
  else console.error("view url not found");
});

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_MASTER_VEHICLES";
