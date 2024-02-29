//#region BUTTONS HANDLERS
//#region ARREST BUTTONS HANDLER
function arrestEditHandler(data) {
  const link = generateLink("arrest", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("arrest", true));
}
function arrestViewHandler(data) {
  const link = generateLink("arrest", "view", data);
  myPopupWin(link);
}

function arrestDeleteHandler(data) {
  const link = generateLink("arrest", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("arrest", true));
}

function arrestCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", {
    ...data,
    source: "Arrest",
  });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function arrestSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("arrest", true));
}

function arrestUnsealHandler(data) {
  const link = generateLink("unseal", null, { ...data, source: "incident" });
  showConfirm(
    "Unseal the Case?",
    "You will unseal the case and any related records in viparlink with this action!",
    link,
    { ...data, source: "incident" },
    () => callbackRefreshSummary("arrest", true)
  );
}
//#endregion ARREST BUTTONS HANDLER

//#region SUSPECT BUTTONS HANDLER
function suspectEditHandler(data) {
  const link = generateLink("suspect", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("suspect", true));
}

function suspectViewHandler(data) {
  const link = generateLink("suspect", "view", data);
  myPopupWin(link);
}

function suspectDeleteHandler(data) {
  const link = generateLink("suspect", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("suspect", true));
}

function suspectCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", {
    ...data,
    source: "Suspect",
  });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function suspectSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("suspect", true));
}

function suspectUnsealHandler(data) {
  const link = generateLink("unseal", null, { ...data, source: "incident" });
  showConfirm(
    "Unseal the Case?",
    "You will unseal the case and any related records in viparlink with this action!",
    link,
    { ...data, source: "incident" },
    () => callbackRefreshSummary("suspect", true)
  );
}
//#endregion SUSPECT BUTTONS HANDLER

//#region VICTIM BUTTONS HANDLER
function victimEditHandler(data) {
  const link = generateLink("victim", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("victim", true));
}

function victimViewHandler(data) {
  const link = generateLink("victim", "view", data);
  myPopupWin(link);
}

function victimDeleteHandler(data) {
  const link = generateLink("victim", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("victim", true));
}

function victimCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", {
    ...data,
    source: "Victim",
  });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

function victimSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("victim", true));
}

function victimUnsealHandler(data) {
  const link = generateLink("unseal", null, { ...data, source: "incident" });
  showConfirm(
    "Unseal the Case?",
    "You will unseal the case and any related records in viparlink with this action!",
    link,
    { ...data, source: "incident" },
    () => callbackRefreshSummary("victim", true)
  );
}
//#endregion VICTIM BUTTONS HANDLER

//#region REPORTEE BUTTONS HANDLER
function reporteeEditHandler(data) {
  const link = generateLink("reportee", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("reportee", true));
}

function reporteeViewHandler(data) {
  const link = generateLink("reportee", "view", data);
  myPopupWin(link);
}

function reporteeDeleteHandler(data) {
  const link = generateLink("reportee", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("reportee", true));
}

function reporteeCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", {
    ...data,
    source: "Reportee",
  });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

//#endregion REPORTEE BUTTONS HANDLER

//#region INVOLVED INDIVIDUAL BUTTONS HANDLER
function involvedIndividualEditHandler(data) {
  const link = generateLink("reportee", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("involved_individual", true));
}

function involvedIndividualViewHandler(data) {
  const link = generateLink("reportee", "view", data);
  myPopupWin(link);
}

function involvedIndividualDeleteHandler(data) {
  const link = generateLink("reportee", "delete", data);
  deletePopup(link, null, () =>
    callbackRefreshSummary("involved_individual", true)
  );
}

//#endregion INVOLVED INDIVIDUAL BUTTONS HANDLER

//#region WITNESS BUTTONS HANDLER
function witnessEditHandler(data) {
  const link = generateLink("witness", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("witness", true));
}

function witnessViewHandler(data) {
  const link = generateLink("witness", "view", data);
  myPopupWin(link);
}

function witnessDeleteHandler(data) {
  const link = generateLink("witness", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("witness", true));
}

function witnessCourtManagementHandler(data) {
  const link = generateLink("court_management", "send", {
    ...data,
    source: "Witness",
  });
  myPopupWin(link, () => callbackRefreshSummary("court_management"));
}

//#endregion WITNESS BUTTONS HANDLER

//#region UOF SUBJECT BUTTONS HANDLER
function uofSubjectEditHandler(data) {
  const link = generateLink("uof_subject", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("uof_subject", true));
}

function uofSubjectViewHandler(data) {
  const link = generateLink("uof_subject", "view", data);
  myPopupWin(link);
}

function uofSubjectDeleteHandler(data) {
  const link = generateLink("uof_subject", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("uof_subject", true));
}

function uofSubjectSealHandler(data) {
  const link = generateLink("seal", null, { ...data, source: "incident" });
  sealConfirm(link, null, () => callbackRefreshSummary("uof_subject", true));
}

function uofSubjectUnsealHandler(data) {
  const link = generateLink("unseal", null, { ...data, source: "incident" });
  showConfirm(
    "Unseal the Case?",
    "You will unseal the case and any related records in viparlink with this action!",
    link,
    { ...data, source: "incident" },
    () => callbackRefreshSummary("uof_subject", true)
  );
}

//#endregion UOF SUBJECT BUTTONS HANDLER

//#region UOF OFFICER BUTTONS HANDLER
function uofOfficerEditHandler(data) {
  const link = generateLink("uof_officer", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("uof_officer"));
}

function uofOfficerViewHandler(data) {
  const link = generateLink("uof_officer", "view", data);
  myPopupWin(link);
}

function uofOfficerDeleteHandler(data) {
  const link = generateLink("uof_officer", "delete", data);
  deletePopup(link, null, () => callbackRefreshSummary("uof_officer"));
}

//#endregion UOF OFFICER BUTTONS HANDLER

//#region PROPERTY BUTTONS HANDLER
function propertyEditHandler(data) {
  const link = generateLink("property", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("property", true));
}

function propertyViewHandler(data) {
  const link = generateLink("property", "view", data);
  myPopupWin(link);
}

function propertyDeleteHandler(data) {
  const link = generateLink("property", "delete", data);

  if (data.evidence_id && globalVariables.PRIVILEGE_EVIDENCE_PROPERTY.delete) {
    $.confirm({
      title: "Please confirm",
      content:
        "There is an evidence record linked with this property. This action will delete both. Do you want to continue?",
      buttons: {
        confirm: function () {
          $.ajax({
            type: "POST",
            url: link,
            data: { ...data, deleteEvidence: true },
            success: function () {
              callbackRefreshSummary("property", true);
            },
          });
        },
        cancel: function () {},
      },
    });
  } else {
    deletePopup(link, data, () => callbackRefreshSummary("property", true));
  }
}

function propertyGoToEvidenceHandler(data) {
  window.open(
    "./" +
      "evidence_database?search=" +
      data.evidence_no
  );
}

//#endregion PROPERTY BUTTONS HANDLER

//#region VEHICLE BUTTONS HANDLER
function vehicleEditHandler(data) {
  const link = generateLink("vehicle", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("vehicle"));
}

function vehicleViewHandler(data) {
  const link = generateLink("vehicle", "view", data);
  myPopupWin(link);
}

function vehicleDeleteHandler(data) {
  const link = generateLink("vehicle", "delete", data);
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
    "You will unseal the case and any related records in viparlink with this action!",
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

//#region LINKED INCIDENT BUTTONS HANDLER
function linkedIncidentEditHandler(data) {
  const link = generateLink("incident", "edit", data);
  myPopupWin(link, () => callbackRefreshSummary("linked_incident", true));
}

function linkedIncidentViewHandler(data) {
  const link = generateLink("incident", "view", data);
  myPopupWin(link);
}

function linkedIncidentDeleteHandler(data) {
  const link = generateLink("incident", "delete", data);
  deletePopup(link, null, () =>
    callbackRefreshSummary("linked_incident", true)
  );
}

function linkedIncidentApproveHandler(data) {
  const link = generateLink("incident", "approve", data);
  myPopupWin(link, () => callbackRefreshSummary("linked_incident", true));
}

function linkedIncidentUnlockHandler(data) {
  const link = generateLink("incident", "unlock", data);
  myPopupWin(link, () => callbackRefreshSummary("linked_incident", true));
}

function linkedIncidentCancelApproveHandler(data) {
  const link = generateLink("incident", "cancel_user_approve", data);

  $.confirm({
    title: "Cancel User Approval",
    content: "Confirm to continue!",
    content: ``,
    buttons: {
      confirm: function (ev) {
        $.post(link, { type: "incident" }).done(() => {
          $.alert("The user approval has been succesfully cancelled");
          callbackRefreshSummary("linked_incident", true);
        });
      },
      cancel: function () {
        //  $.alert('Canceled!');
      },
    },
  });
}

//#endregion LINKED INCIDENT BUTTONS HANDLER

//#endregion BUTTONS HANDLERS

export let eventHandlers = {
  arrestEditHandler,
  arrestViewHandler,
  arrestDeleteHandler,
  arrestCourtManagementHandler,
  arrestSealHandler,
  arrestUnsealHandler,
  suspectEditHandler,
  suspectViewHandler,
  suspectDeleteHandler,
  suspectCourtManagementHandler,
  suspectSealHandler,
  suspectUnsealHandler,
  victimEditHandler,
  victimViewHandler,
  victimDeleteHandler,
  victimCourtManagementHandler,
  victimSealHandler,
  victimUnsealHandler,
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
  uofSubjectSealHandler,
  uofSubjectUnsealHandler,
  uofOfficerEditHandler,
  uofOfficerViewHandler,
  uofOfficerDeleteHandler,
  propertyEditHandler,
  propertyViewHandler,
  propertyDeleteHandler,
  propertyGoToEvidenceHandler,
  vehicleEditHandler,
  vehicleViewHandler,
  vehicleDeleteHandler,
  courtManagementEditHandler,
  courtManagementDeleteHandler,
  courtManagementPaymentHandler,
  courtManagementAttachmentHandler,
  courtManagementSealHandler,
  courtManagementUnsealHandler,
  courtManagementViewSourceHandler,
  linkedIncidentEditHandler,
  linkedIncidentViewHandler,
  linkedIncidentDeleteHandler,
  linkedIncidentApproveHandler,
  linkedIncidentUnlockHandler,
  linkedIncidentCancelApproveHandler,
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

const propertyRowCallback = (nRow, aData) => {
  if (
    aData.evidence_id &&
    globalVariables.PRIVILEGE_EVIDENCE_PROPERTY.hasPermission
  ) {
    $(".summary-go-to-source", nRow)
      .removeClass("d-none")
      .attr("title", "Go to Evidence");
  }
};

//#endregion ROW CALLBACKS

//#region CUSTOM RENDERINGS
const locationRender = (mapItems, summaryContainer, id) => {
  summaryContainer.empty();
  summaryContainer.append(`
  <div class="summary_map">
    <div class="col-md-12">
      <div id="case_map_${id}" style="height:500px"></div>
    </div>
    <div class="clearfix"></div>
  </div>
  `);



  var drawMap = function (addControls) {
    let map_skin =
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    if ("{{darkMode}}" == "true") {
      map_skin =
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
    }

    const mapLink =
      '<a href="https://wiki.openstreetmap.org/wiki/Tile_servers</a>';
    var osm = L.tileLayer(map_skin, {
      attribution: "&copy; " + mapLink + " Contributors",
      maxZoom: 24,
    }).addTo(map);

    var defaultCenter = [+mapItems[0].pointy, +mapItems[0].pointx];

    var defaultZoom = 15;

    map.setView(defaultCenter, defaultZoom);
    if (addControls) {
      var layerscontrol = L.control.fullscreen().addTo(map);
      if ("{{darkMode}}" == "true") {
        L.control
          .layers(
            {
              "Dark Map": osm,
              OSM: L.tileLayer(
                "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              ),
              google: L.tileLayer(
                "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                {
                  attribution: "google",
                }
              ),
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
              "Dark Map": L.tileLayer(
                "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
              ),
              google: L.tileLayer(
                "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                {
                  attribution: "google",
                }
              ),
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

    var groupCoordinates = _.groupBy(mapItems, function (x) {
      return x.pointx.toString() + x.pointy.toString();
    });

    Object.keys(groupCoordinates).forEach((key) => {
      var groupMapItems = groupCoordinates[key];

      var linkedIncident = groupMapItems[0];

      //var circle = L.circleMarker([d["pointy"], d["pointx"]], {
      var circle = L.marker(
        [+linkedIncident["pointy"], +linkedIncident["pointx"]],
        {
          title: "Marker",
          className: "iframe",
          radius: 15,
          opacity: 1,
          fillOpacity: 0.75,
        }
      ).addTo(map);

      var popupContent = groupMapItems
        .map((mapItem) => {
          const incidentLink = `<a href="./view?search=${mapItem.incident_no}" target="_blank">${mapItem.incident_no}</a>`;

          return `<div class="more-detail-container">
            <strong><i>Linked Incident</i></strong> 
            <br/>
            ${mapItem.crime_name}
            <br/>
            ${incidentLink}
            <br/>
            ${mapItem.Address2}
            <br/>
            ${mapItem.date_time}
            <br/>
            <span style='font-weight:bold; color:blue; cursor: pointer;' class="more-details" data-id="${mapItem.id}">More Details...</span>
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

  var lats = mapItems.map((rec) => +rec["pointx"]);
  var lons = mapItems.map((rec) => +rec["pointy"]);

  map.fitBounds([
    [_.min(lons) - 0.002, _.min(lats) - 0.002],
    [_.max(lons) + 0.002, _.max(lats) + 0.002],
  ]);
};
//#endregion CUSTOM RENDERINGS

//Calling this function will start updating detail summary tabs.
function callbackRefreshSummary(source, reloadMasterTable) {
  DetailSummary.refresh(
    "incident",
    source,
    reloadMasterTable ? highlightClickedRow : null
  );
}

//checking privilege to decide to show or hide columns
function checkPrivilege(permissionType) {
  return (
    globalVariables.PRIVILEGE_OFFENSE_NON_CRIMINAL &&
    globalVariables.PRIVILEGE_OFFENSE_NON_CRIMINAL[permissionType]
  );
}

//#region SHARED TABS
const evidenceTab = getSharedTab("evidence", "incident");
eventHandlers = {...eventHandlers, ...evidenceTab.eventHandlers};

const trafficCrashTab = getSharedTab("traffic_crash", "incident");
eventHandlers = {...eventHandlers, ...trafficCrashTab.eventHandlers};

const trafficCitationTab = getSharedTab("traffic_citation", "incident");
eventHandlers = {...eventHandlers, ...trafficCitationTab.eventHandlers};

const warrantCitationArrestTab = getSharedTab("warrant_citation_arrest", "incident");
eventHandlers = {...eventHandlers, ...warrantCitationArrestTab.eventHandlers};

const firTab = getSharedTab("fir", "incident");
eventHandlers = {...eventHandlers, ...firTab.eventHandlers};

const arrestAttachmentTab = getSharedTab("arrest_attachment", "incident");
eventHandlers = {...eventHandlers, ...arrestAttachmentTab.eventHandlers};

const incidentAttachmentTab = getSharedTab("incident_attachment", "incident");
eventHandlers = {...eventHandlers, ...incidentAttachmentTab.eventHandlers};

const propertyAttachmentTab = getSharedTab("property_attachment", "incident");
eventHandlers = {...eventHandlers, ...propertyAttachmentTab.eventHandlers};

const printOutTab = getSharedTab("print_out", "incident");
eventHandlers = {...eventHandlers, ...printOutTab.eventHandlers};

const callManagementTab = getSharedTab("call_management", "incident");
eventHandlers = {...eventHandlers, ...callManagementTab.eventHandlers};

const callManagementUnitTab = getSharedTab("cad_unit", "incident");
eventHandlers = {...eventHandlers, ...callManagementUnitTab.eventHandlers};

const callManagementCommentTab = getSharedTab("cad_comment", "incident");
eventHandlers = {...eventHandlers, ...callManagementCommentTab.eventHandlers};

const narrativeTab = getSharedTab("narrative", "incident");
eventHandlers = {...eventHandlers, ...narrativeTab.eventHandlers};
//#endregion

export const detailSummaryTabs = {
  currentyear_diagnosiscodes: {title: "Current Year Diagnosis Codes"},
  previousyear_diagnosiscodes: {title: "Previous Year Diagnosis Codes"},
  billing_provider: {title: "Billing Provider"},
  service_lines: {title: "Service Lines"},
  submitter: {title:"Submitter"},
  secondary_payer: {title: "Secondary Payer"},
  claims: {title: "Claims"},
  witness: { title: "Witness" },
  uof_subject: { title: "UOF Subject" },
  uof_officer: { title: "UOF Officer" },
  evidence: evidenceTab,
  property: {
    title: "Property",
    tableOptions: { fnRowCallback: propertyRowCallback },
  },
  vehicle: { title: "Vehicle" },
  narrative: narrativeTab,
  arrest_attachment: {...arrestAttachmentTab, title : "Arrest Attachment"},
  incident_attachment: {...incidentAttachmentTab, title : "Incident Attachment" },
  property_attachment: {...propertyAttachmentTab, title : "Property Attachment"},
  court_management: {
    title: "Court Management",
    tableOptions: { fnRowCallback: courtManagementRowCallback },
    privilege: "PRIVILEGE_COURT_MANAGEMENT",
  },
  traffic_crash: trafficCrashTab,
  traffic_citation: trafficCitationTab,
  warrant_citation_arrest: warrantCitationArrestTab,
  fir: firTab,
  linked_incident: { title: "Linked Incident" },
  linked_incident_on_map: {
    title: "Linked Incident On Map",
    customRender: locationRender,
  },
  call_management: callManagementTab,
  cad_unit: callManagementUnitTab,
  cad_comment: callManagementCommentTab,
  print_out: printOutTab,
};

// generateRandomLetters if sensitive mode is enabled.
function generateRandomLetters() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomString = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomString += letters.charAt(randomIndex);
    }
    return randomString;
  }

export const tableColumns = {
  arrest: [
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
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "hourglass",
        "locked",
        "court_management",
        "progress",
        "seal",
        "unseal",
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
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "dob", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
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
        "unseal",
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
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "dob", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
    { data: "victim_type", title: "TYPE" },
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
        "unseal",
      ]),
    },
  ],
  currentyear_diagnosiscodes: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    }},
    { data: "DiagnosisCode", title: "DIAGNOSIS CODE" },
    { data: "Description", title: "DESCRIPTION" },
    { data: "MinOfUASI_HCC", title: "HCC"},
    { data: "serviceYear", title: "SERVICE YEAR"}
  ],
  previousyear_diagnosiscodes: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    }},
    { data: "DiagnosisCode", title: "DIAGNOSIS CODE" },
    { data: "Description", title: "DESCRIPTION" },
    { data: "MinOfUASI_HCC", title: "HCC"},
    { data: "serviceYear", title: "SERVICE YEAR"}
  ],
  billing_provider: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    }},
    { data: "OrganizationName", title: "ORGANIZATION NAME" },
    { data: "Address", title: "ADDRESS" },
    { data: "City", title: "CITY" },
    { data: "State", title: "STATE" },
    { data: "PostalCode", title: "POSTAL CODE" },
    { data: "CommunicationContact", title: "COMMUNICATION CONTACT" },
    { data: "Telephone", title: "TELEPHONE" },
    { data: "transaction_date", title: "TRANSACTION DATE" },
  ],
  service_lines: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    }},
    { data: "sv1_cpt_code_info", title: "CPT CODE" },
    { data: "service_charge_amount", title: "AMOUNT" },
    { data: "sv1_basis_for_measurement", title: "MEASUREMENT" },
    { data: "sv1_quantity", title: "QUANTITY" },
    { data: "sv1_diagnosis_code_pointer", title: "DIAGNOSIS CODE POINTER" },
    { data: "initial_date", title: "DATE" },
    { data: "rendering_provider_name", title: "RENDERING PROVIDER" },
  ],
  submitter: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    }},
    { data: "OrganizationName", title: "ORGANIZATION NAME" },
    { data: "CommunicationContact", title: "COMMUNICATION CONTACT" },
    { data: "TelephoneNumber", title: "TELEPHONE NUMBER" },
    { data: "FaxNumber", title: "FAX NUMBER" },
    { data: "Email", title: "EMAIL" },
  ],
  secondary_payer: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    }},
    { data: "LastName", title: "LAST NAME" },
    { data: "FirstName", title: "FIRST NAME" },
    { data: "MiddleName", title: "MIDDLE NAME" },
    { data: "RelationshipToInsured", title: "RELATIONSHIP TO INSURED" },
    { data: "MonetaryAmount", title: "MONETARY AMOUNT" },
    { data: "transaction_date", title: "TRANSACTION DATE" },
  ],
  claims: [
    { data: "subscriber_id", title: "PATIENT ID", render: function (data, type, row) {

      if (globalVariables.sensitiveMode == 1) {
        return generateRandomLetters();
      }
      return data;
    } },
    { data: "id", title: "CLAIM ID"},
    { data: "ClaimAmount", title: "CLAIM AMOUNT" },
    { data: "PlaceofService", title: "PLACE OF SERVICE" },
    { data: "PlaceofServiceCode", title: "PLACE OF SERVICE CODE" },
    { data: "ProviderSignatureIndicator", title: "PROVIDER SIGNATURE INDICATOR" },
    { data: "ProviderAcceptAssignment", title: "PROVIDER ACCEPT ASSIGNMENT" },
    { data: "ProviderBenefitsAssignmentCertification", title: "PROVIDER BENEFITS ASSIGNMENT" },
    { data: "ReleaseofInformationCode", title: "RELEASE OF INFORMATION CODE" },
    { data: "AutoAccident", title: "AUTO ACCIDENT" },
    { data: "Employment", title: "EMPLOYMENT" },
    { data: "OtherAccident", title: "OTHER ACCIDENT" },
    { data: "AdmissionDate", title: "ADMISSION DATE" },
    { data: "PregnancyDate", title: "PREGNANCY DATE" },
    { data: "DischargeDate", title: "DISCHARGE DATE" },
  ],
  involved_individual: [
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
    { data: "individual_type", title: "TYPE" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "hourglass",
        "locked",
        "progress",
      ]),
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
    { data: "person_name", title: "NAME", class: "master-name-detail" },
    { data: "dob", title: "DOB" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
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
  uof_subject: [
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
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "seal",
        "hourglass",
        "locked",
        "progress",
        "unseal",
      ]),
    },
  ],
  uof_officer: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
    },
    { data: "person_name", title: "NAME" },
    { data: "age", title: "AGE" },
    { data: "race", title: "RACE" },
    { data: "sex", title: "SEX" },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "hourglass",
        "locked",
        "progress",
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
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "hourglass",
        "locked",
        "progress",
        "go_to_source",
      ]),
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
    {
      data: "lp_plate_number",
      title: "LICENSE PLATE",
      class: "master-vehicle-detail",
    },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "hourglass",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ],
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
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "payment",
        "hourglass",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ],
  linked_incident: [
    { data: "id", visible: false, title: "" },
    {
      data: null,
      visible: checkPrivilege("read"),
      title: "",
      defaultContent: createSummaryButtons(["view"]),
      responsivePriority: 0,
    },
    { data: "incident_no", title: "INCIDENT NO", responsivePriority: 1 },
    { data: "crime_name", title: "INCIDENT TYPE", responsivePriority: 1 },
    { data: "date_time", title: "INCIDENT DATE", responsivePriority: 1 },
    { data: "Address2", title: "ADDRESS", responsivePriority: 1 },
    { data: "orc_no", title: "ORC#", responsivePriority: 3 },
    { data: "user", title: "OFFICER", responsivePriority: 3 },
    {
      data: null,
      width: "60px",
      title: "FUNCTIONS",
      defaultContent: createSummaryButtons([
        "edit",
        "delete",
        "print",
        "approve",
        "hourglass",
        "unlock",
        "locked",
        "progress",
      ]),
      responsivePriority: 0,
    },
  ],
};


//Providing the function to get approval data for selected master table rows.
//Returned object will be used to decide to show or hide approval, locked, unlock, hourglass, progress, edit, delete buttons.
export const getApprovalData = (rowData) => {
  let userApproved = rowData[6],
    supervisorApproved = rowData[7],
    theUser = rowData[8],
    approveRequestOfficerID = rowData[11],
    reports_to = rowData[14],
    locked = true,
    ownCase = false,
    ownApproval = false;

  if (theUser == globalVariables.user) ownCase = true;
  if (approveRequestOfficerID == globalVariables.user_id) ownApproval = true;
  if (!supervisorApproved) locked = false;

  return {
    ownCase,
    ownApproval,
    userApproved,
    supervisorApproved,
    isSupervisor: globalVariables.isSupervisor,
    isPowerAdmin: globalVariables.isPowerAdmin,
    hasUserRole: globalVariables.hasUserRole,
    reports_to,
    employee_id: globalVariables.user_id,
    locked,
    theUser,
  };
};

$(document).on("click", ".more-details", function () {
  const id = $(this).attr("data-id");

  myPopupWin(generateLink("incident", "view", { id }));
});

//Related privilege name for the master table. Read,write,delete and seal permissions will be decided regarding this relatedPrivilege.
export const relatedPrivilege = "PRIVILEGE_OFFENSE_NON_CRIMINAL";
