//#region BUTTONS HANDLERS
//#region ARREST BUTTONS HANDLER
function arrestEditHandler(data) {
  const link = generateLink("arrest", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("arrest"));
}

function arrestViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name)
    link = generateLink("arrest", "view", data, { incident_id: data.incident_id });
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

//#region VICTIM BUTTONS HANDLER
function victimEditHandler(data) {
  const link = generateLink("victim", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("victim"));
}

function victimViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("victim", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function victimDeleteHandler(data) {
  const link = generateLink("victim", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("victim"));
}

function victimCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", { ...data, source: "Victim" });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function victimSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("victim"));
}
//#endregion VICTIM BUTTONS HANDLER

//#region REPORTEE BUTTONS HANDLER
function reporteeEditHandler(data) {
  const link = generateLink("reportee", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("reportee"));
}

function reporteeViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("reportee", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function reporteeDeleteHandler(data) {
  const link = generateLink("reportee", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("reportee"));
}

function reporteeCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", { ...data, source: "Reportee" });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

//#endregion REPORTEE BUTTONS HANDLER

//#region INVOLVED INDIVIDUAL BUTTONS HANDLER
function involvedIndividualEditHandler(data) {
  const link = generateLink("reportee", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("involved_individual"));
}

function involvedIndividualViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("reportee", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function involvedIndividualDeleteHandler(data) {
  const link = generateLink("reportee", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("involved_individual"));
}

//#endregion INVOLVED INDIVIDUAL BUTTONS HANDLER

//#region WITNESS BUTTONS HANDLER
function witnessEditHandler(data) {
  const link = generateLink("witness", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("witness"));
}

function witnessViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("witness", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function witnessDeleteHandler(data) {
  const link = generateLink("witness", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("witness"));
}

function witnessCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", { ...data, source: "Witness" });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

//#endregion WITNESS BUTTONS HANDLER

//#region UOF SUBJECT BUTTONS HANDLER
function uofSubjectEditHandler(data) {
  const link = generateLink("uof_subject", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("uof_subject"));
}

function uofSubjectViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name) link = generateLink("uof_subject", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function uofSubjectDeleteHandler(data) {
  const link = generateLink("uof_subject", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("uof_subject"));
}

//#endregion UOF SUBJECT BUTTONS HANDLER

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

//#region VEHICLE BUTTONS HANDLER
function vehicleEditHandler(data) {
  const link = generateLink("master_vehicle", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vehicle"));
}

function vehicleViewHandler(data) {
  const link = generateLink("master_vehicle", "view", data);
  myPopupWin(link);
}

function vehicleDeleteHandler(data) {
  const link = generateLink("master_vehicle", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("vehicle"));
}

//#endregion VEHICLE BUTTONS HANDLER

//#region COURT MANAGEMENT BUTTONS HANDLER
function courtManagementEditHandler(data) {
  const link = generateLink("court_management", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function courtManagementDeleteHandler(data) {
  const link = generateLink("court_management", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("court_management"));
}

function courtManagementPaymentHandler(data) {
  const link = generateLink("court_management", "payment", data);
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function courtManagementAttachmentHandler(data) {
  const link = generateLink("attachment", "edit", { ...data, database: "court_attachments" });
  myPopupWin(link);
}

function courtManagementSealHandler(data) {
  const link = generateLink("court_management", "seal", { ...data, source: data.data_source });
  sealConfirm(link, null, () => callbackRefreshSummary("court_management"));
}

function courtManagementViewSourceHandler(data) {
  const link = generateLink("court_management", "view_source", { ...data, source: data.data_source });
  myPopupWin(link);
}

//#endregion COURT MANAGEMENT BUTTONS HANDLER

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
  const link = generateLink(data.type == "Person" ? "traffic_person" : "traffic_unit", "edit", {
    ...data,
    id: data.person_id,
  });
  myPopupWin(link, () => callbackRefreshSummary("traffic_crash"));
}

function trafficCrashViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name)
    link = generateLink(data.type == "Person" ? "traffic_person" : "traffic_unit", "view", {
      ...data,
      id: data.person_id,
    });
  else link = generateLink("edit_view_request", null, { ...data, id: data.person_id });

  myPopupWin(link);
}

function trafficCrashDeleteHandler(data) {
  const link = generateLink(data.type == "Person" ? "traffic_person" : "traffic_unit", "delete", {
    ...data,
    id: data.person_id,
  });
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

//#region CITATION WITNESS BUTTONS HANDLER
function trafficCitationWitnessEditHandler(data) {
  const link = generateLink("traffic_citation_witness", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("traffic_citation_witness"));
}

function trafficCitationWitnessViewHandler(data) {
  let link;
  if (data.department === globalVariables.department_name)
    link = generateLink("traffic_citation_witness", "view", data);
  else link = generateLink("edit_view_request", null, data);

  myPopupWin(link);
}

function trafficCitationWitnessDeleteHandler(data) {
  const link = generateLink("traffic_citation_witness", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("traffic_citation_witness"));
}

//#endregion CITATION WITNESS  BUTTONS HANDLER

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
  victimEditHandler,
  victimViewHandler,
  victimDeleteHandler,
  victimCourtManagementHandler,
  victimSealHandler,
  reporteeEditHandler,
  reporteeViewHandler,
  reporteeDeleteHandler,
  reporteeCourtManagementHandler,
  involvedIndividualEditHandler,
  involvedIndividualViewHandler,
  involvedIndividualDeleteHandler,
  witnessEditHandler,
  witnessViewHandler,
  witnessDeleteHandler,
  witnessCourtManagementHandler,
  uofSubjectEditHandler,
  uofSubjectViewHandler,
  uofSubjectDeleteHandler,
  propertyEditHandler,
  propertyViewHandler,
  propertyDeleteHandler,
  vehicleEditHandler,
  vehicleViewHandler,
  vehicleDeleteHandler,
  courtManagementEditHandler,
  courtManagementDeleteHandler,
  courtManagementPaymentHandler,
  courtManagementAttachmentHandler,
  courtManagementSealHandler,
  courtManagementViewSourceHandler,
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
  trafficCitationWitnessEditHandler,
  trafficCitationWitnessViewHandler,
  trafficCitationWitnessDeleteHandler,
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

const courtManagementRowCallback = (nRow, aData) => {
  if (aData.payload_amount > 0 && aData.grand_total_fine == 0) {
    $("td", nRow).addClass("court-green");
  }

  if (aData.grand_total_fine > 0) {
    $("td", nRow).addClass("court-pink");
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
          <div>Current Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-arrest"></div>
          <div>Arrest Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-arrest-address"></div>
          <div>Arrestee Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-incident-location"></div>
          <div>Incident/Offense Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-victim"></div>
          <div>Incident/Offense (Victim)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-victim-address"></div>
          <div>Victim Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-suspect"></div>
          <div>Incident/Offense (Suspect)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-suspect-address"></div>
          <div>Suspect Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-reportee"></div>
          <div>Incident/Offense (Reportee/Involved Individual)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-reportee-address"></div>
          <div>Reportee/Involved Individual Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-witness"></div>
          <div>Incident/Offense (Witness)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-witness-address"></div>
          <div>Witness Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-warrant-citation-arrest"></div>
          <div>Warrant-Citation Arrest Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-warrant-citation-arrestee-address"></div>
          <div>Warrant-Citation Arrestee Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-crash-person"></div>
          <div>Traffic Crash Location (Person)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-crash-owner"></div>
          <div>Traffic Crash Location (Unit Owner)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-crash-involved-person"></div>
          <div>Traffic Crash Involved Person Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-citation"></div>
          <div>Traffic Citation Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-traffic-citation-witness"></div>
          <div>Traffic Citation Witness Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-fir"></div>
          <div>FIR Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-fir-person-address"></div>
          <div>FIR Person Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-incident-vehicle"></div>
          <div>Vehicle Owner Address</div>
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
          <div class="my-custom-icon marker-uof-subject"></div>
          <div>Incident/Offense (UOF Subject)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-uof-subject-address"></div>
          <div>UOF Subject Address</div>
        </li>
        <li>
          <div class="my-custom-icon marker-daily-activity"></div>
          <div>Daily Activity</div>
        </li>
        <li>
          <div class="my-custom-icon marker-daily-activity-address"></div>
          <div>Daily Activity (Involved Individual Address)</div>
        </li>
        <li>
          <div class="my-custom-icon marker-permit"></div>
          <div>Permit Location</div>
        </li>
        <li>
          <div class="my-custom-icon marker-permit-address"></div>
          <div>Permit Person Address</div>
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

      if (d.data_source == "Incident/Offense (Arrest)") {
        marker_class_name = "marker-arrest";
      } else if (d.data_source == "Current Address") {
        marker_class_name = "marker-default";
      } else if (d.data_source == "Arrestee Address") {
        marker_class_name = "marker-arrest-address";
      } else if (d.data_source == "Incident/Offense Location") {
        marker_class_name = "marker-incident-location";
      } else if (d.data_source == "Incident/Offense (Victim)") {
        marker_class_name = "marker-victim";
      } else if (d.data_source == "Victim Address") {
        marker_class_name = "marker-victim-address";
      } else if (d.data_source == "Incident/Offense (Suspect)") {
        marker_class_name = "marker-suspect";
      } else if (d.data_source == "Suspect Address") {
        marker_class_name = "marker-suspect-address";
      } else if (d.data_source == "Incident/Offense (Reportee/Involved Individual)") {
        marker_class_name = "marker-reportee";
      } else if (d.data_source == "Reportee/Involved Individual Address") {
        marker_class_name = "marker-reportee-address";
      } else if (d.data_source == "Incident/Offense (Witness)") {
        marker_class_name = "marker-witness";
      } else if (d.data_source == "Witness Address") {
        marker_class_name = "marker-witness-address";
      } else if (d.data_source == "Warrant-Citation Arrest") {
        marker_class_name = "marker-warrant-citation-arrest";
      } else if (d.data_source == "Warrant-Citation Arrestee Address") {
        marker_class_name = "marker-warrant-citation-arrestee-address";
      } else if (d.data_source == "Traffic Crash Involved Person") {
        marker_class_name = "marker-traffic-crash-person";
      } else if (d.data_source == "Traffic Crash Unit Owner") {
        marker_class_name = "marker-traffic-crash-owner";
      } else if (d.data_source == "Traffic Crash Involved Person Address") {
        marker_class_name = "marker-traffic-crash-involved-person";
      } else if (d.data_source == "Traffic Citation") {
        marker_class_name = "marker-traffic-citation";
      } else if (d.data_source == "Traffic Citation Witness") {
        marker_class_name = "marker-traffic-citation-witness";
      } else if (d.data_source == "FIR") {
        marker_class_name = "marker-fir";
      } else if (d.data_source == "FIR Person Address") {
        marker_class_name = "marker-fir-person-address";
      } else if (d.data_source == "Vehicle Owner Address") {
        marker_class_name = "marker-incident-vehicle";
      } else if (d.data_source == "Evidence Recovery Address (Evidence Owner)") {
        marker_class_name = "marker-incident-evidence";
      } else if (d.data_source == "Property Recovery Address (Property Owner)") {
        marker_class_name = "marker-incident-property";
      } else if (d.data_source == "Incident/Offense (UOF Subject)") {
        marker_class_name = "marker-uof-subject";
      } else if (d.data_source == "UOF Subject Address") {
        marker_class_name = "marker-uof-subject-address";
      } else if (d.data_source == "Daily Activity") {
        marker_class_name = "marker-daily-activity";
      } else if (d.data_source == "Daily Activity (Involved Individual Address)") {
        marker_class_name = "marker-daily-activity-address";
      } else if (d.data_source == "Permit") {
        marker_class_name = "marker-permit";
      } else if (d.data_source == "Permit Person Address") {
        marker_class_name = "marker-permit-address";
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
//#endregion CUSTOM RENDERINGS

//#region Shared Tabs
const evidenceTab = getSharedTab("evidence", "master_name");
eventHandlers = { ...eventHandlers, ...evidenceTab.eventHandlers };

const trafficCitationTab = getSharedTab("traffic_citation", "master_name");
eventHandlers = { ...eventHandlers, ...trafficCitationTab.eventHandlers };

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "master_name");
eventHandlers = { ...eventHandlers, ...warrantCitationArrestTab.eventHandlers };

const firTab = getSharedTab("fir", "master_name");
eventHandlers = { ...eventHandlers, ...firTab.eventHandlers };
//#endregion

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh("master_name", source, reloadMasterTable ? highlightClickedRow : null);
}

//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return globalVariables.PRIVILEGE_MASTER_NAMES && globalVariables.PRIVILEGE_MASTER_NAMES[permissionType];
}

export const detailSummaryTabs = {
  arrest: { title: "Arrest", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  suspect: { title: "Suspect", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  victim: { title: "Victim", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  reportee: { title: "Reportee", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  involved_individual: { title: "Involved Individual", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  witness: { title: "Witness", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  uof_subject: { title: "UOF Subject", privilege: "PRIVILEGE_OFFENSE_NON_CRIMINAL" },
  evidence: evidenceTab,
  property: { title: "Property Owner" },
  vehicle: { title: "Vehicle" },
  court_management: {
    title: "Court Management",
    tableOptions: { fnRowCallback: courtManagementRowCallback },
    privilege: "PRIVILEGE_COURT_MANAGEMENT",
  },
  daily_log: { title: "Daily Activity", privilege: "PRIVILEGE_DAILY_ACTIVITY_DATABASE" },
  traffic_crash: {
    title: "Traffic Crash",
    tableOptions: { fnRowCallback: trafficCrashRowCallback },
    privilege: "PRIVILEGE_TRAFFIC_CRASH",
  },
  traffic_citation: trafficCitationTab,
  traffic_citation_witness: { title: "Citation Witness", privilege: "PRIVILEGE_TRAFFIC_CITATION_WARNING" },
  warrant_citation_arrest: warrantCitationArrestTab,
  fir: firTab,
  permit: { title: "Permit", privilege: "PRIVILEGE_PERMITS" },
  location: { title: "Location", alwaysShow: true, customRender: locationRender },
  all_history: { title: "All History", tableOptions: { order: [[4, "desc"]] } },
};

export const tableColumns = {
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
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
  victim: [
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
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
  reportee: [
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
    { data: "individual_type", title: "TYPE" },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "court_management", "progress"]),
    },
  ],
  involved_individual: [
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
    { data: "individual_type", title: "TYPE" },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "progress"]),
    },
  ],
  witness: [
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "court_management", "progress"]),
    },
  ],
  uof_subject: [
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
    { data: "Address", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "incident_user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "progress"]),
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
    { data: "lp_plate_number", title: "LICENSE PLATE", class: "master-vehicle-detail" },
    { data: "department_name", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "hourglass", "locked", "progress"]),
      responsivePriority: 0,
    },
  ],
  court_management: [
    { data: "id", visible: false, title: "" },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "court_date", title: "COURT DATE", responsivePriority: 1 },
    { data: "grand_total_fine", title: "BALANCE DUE", responsivePriority: 5 },
    { data: "payload_amount", title: "AMOUNT PAID", responsivePriority: 6 },
    { data: "bond_status", title: "BOND", responsivePriority: 9 },
    { data: "bond_amount", title: "BOND AMOUNT", responsivePriority: 10 },
    { data: "person_name", title: "DEFENDANT", responsivePriority: 2 },
    { data: "dob", title: "DOB", responsivePriority: 3 },
    { data: "data_source", title: "DATA SOURCE", responsivePriority: 4 },
    { data: "ordinance", title: "CHARGES", responsivePriority: 7 },
    { data: "court_officer", title: "OFFICER", responsivePriority: 8 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 8 },
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
        '    <option value="view_source" class="read-permission">View Source Case</option>   ' +
        "</select>",
    },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "print", "payment", "hourglass", "locked", "progress"]),
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
    { data: "person_type", title: "TYPE", responsivePriority: 3 },
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
  traffic_citation_witness: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "citation_no", title: "CITATION NO", responsivePriority: 1, data: (d) => d, render: incidentLinkRender },
    { data: "citation_date", title: "DATE", responsivePriority: 1 },
    { data: "Address", title: "ADDRESS", responsivePriority: 2 },
    { data: "Violation", title: "CHARGE", responsivePriority: 2 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    { data: "department", title: "DEPARTMENT", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons(["edit", "delete", "print", "progress"]),
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

  let viewUrl, transformedDataSource;

  if (data_source == "Incident/Offense (Arrest)") {
    transformedDataSource = "Incident";
  } else if (data_source == "Arrestee Address") {
    transformedDataSource = "Arrest";
  } else if (data_source == "Incident/Offense Location") {
    transformedDataSource = "Incident";
  } else if (data_source == "Incident/Offense (Victim)") {
    transformedDataSource = "Incident";
  } else if (data_source == "Victim Address") {
    transformedDataSource = "Victim";
  } else if (data_source == "Incident/Offense (Suspect)") {
    transformedDataSource = "Incident";
  } else if (data_source == "Suspect Address") {
    transformedDataSource = "Suspect";
  } else if (data_source == "Incident/Offense (Reportee/Involved Individual)") {
    transformedDataSource = "Incident";
  } else if (data_source == "Reportee/Involved Individual Address") {
    transformedDataSource = "Reportee";
  } else if (data_source == "Incident/Offense (Witness)") {
    transformedDataSource = "Incident";
  } else if (data_source == "Witness Address") {
    transformedDataSource = "Witness";
  } else if (data_source == "Warrant-Citation Arrest") {
    transformedDataSource = "Warrant-Citation Arrest";
  } else if (data_source == "Warrant-Citation Arrestee Address") {
    transformedDataSource = "Warrant-Citation Arrest";
  } else if (data_source == "Traffic Crash Involved Person") {
    transformedDataSource = "Traffic Crash";
  } else if (data_source == "Traffic Crash Unit Owner") {
    transformedDataSource = "Traffic Crash";
  } else if (data_source == "Traffic Crash Involved Person Address") {
    transformedDataSource = "Traffic Person";
  } else if (data_source == "Traffic Citation") {
    transformedDataSource = "Traffic Citation";
  } else if (data_source == "Traffic Citation Witness") {
    transformedDataSource = "Traffic Citation";
  } else if (data_source == "FIR") {
    transformedDataSource = "FIR";
  } else if (data_source == "FIR Person Address") {
    transformedDataSource = "FIR";
  } else if (data_source == "Evidence Recovery Address (Evidence Owner)") {
    transformedDataSource = "Evidence";
  } else if (data_source == "Property Recovery Address (Property Owner)") {
    transformedDataSource = "Property";
  } else if (data_source == "Incident/Offense (UOF Subject)") {
    transformedDataSource = "Incident";
  } else if (data_source == "UOF Subject Address") {
    transformedDataSource = "UOF";
  } else if (data_source == "Daily Activity") {
    transformedDataSource = "Daily Activity";
  } else if (data_source == "Daily Activity (Involved Individual Address)") {
    transformedDataSource = "Daily Activity";
  } else if (data_source == "Permit") {
    transformedDataSource = "Permit";
  } else if (data_source == "Permit Person Address") {
    transformedDataSource = "Permit";
  }

  if (data_source !== "Vehicle Owner Address")
    viewUrl = generateLink("edit_view_request", null, { ...data, data_source: transformedDataSource });
  else viewUrl = generateLink("master_vehicle", "view", data);

  if (viewUrl) myPopupWin(viewUrl);
  else console.error("view url not found");
});

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_MASTER_NAMES";
