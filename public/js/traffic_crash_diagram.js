/* MAP VARIABLES */
var flag = false;
let MAP_EDIT_ENABLED =
  document.getElementById("editForm").value ||
  document.getElementById("addForm").value ||
  document.getElementById("viewForm").value; // Set this to false for view only mode!
const CRASH_UNITS = [];


const crashDiagramStyles = document.createElement("style");

crashDiagramStyles.innerHTML = `
    img[template-image] {
        position:relative;
        z-index:-999999 !important;
    }
`;

document.head.appendChild(crashDiagramStyles);

/*
    Add units here and in the `public/leaflet1.6/images/units` folder, 
    don't forget to add the hover image as well. If not present, 
    simply clone the image and add "_hover" to the name of the clone.
    */
function dataPull() {
  $.ajax({
    type: "GET",
    url: "../traffic_images",
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        CRASH_UNITS.push({
          id: data[i].file_name,
          label: data[i].label,
          category: data[i].category,
          src: src_link + data[i].file_name,
          size: parseInt(data[i].size),
          id2: data[i].id + "101045986",
          colorRGB: [0, 0, 0],
        });
        if (i == data.length - 1) {
          flag = true;
        }
      }
    },
  });
}

if (typeof isScreenshot === "undefined") {
  dataPull();
}

const MAP_CONTAINER = "traffic_crash_diagram_map"; // Map container div id.
const CINCINNATI_LAT_LNG = [39.103, -84.512];

const carto_layer = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png",
  {
    attribution: `<a href="https://carto.com/location-data-services/basemaps/#/next" target="_blank" >Carto</a>`,
    maxNativeZoom: 18,
    maxZoom: 22,
  }
);

const empty_layer = L.tileLayer("/images/white_board.png", {
  attribution: "",
  maxNativeZoom: 22,
  maxZoom: 22,
});

const google_layer = L.tileLayer(
  "https://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
  {
    attribution: `<a href="https://www.google.com/maps" target="_blank" >Google</a>`,
    maxZoom: 22,
  }
);

const esri_layer = L.tileLayer(
  "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: `Powered by ESRI`,
    maxZoom: 22,
  }
);

const north = L.control({ position: "bottomright" });
north.onAdd = function (map) {
  var div = L.DomUtil.create("div", "info legend");
  div.innerHTML =
    '<img style="height:80px; width:60px;" src="/css/images/north.png">';
  return div;
};
const printer = L.easyPrint({
  //tileLayer: map_leo,
  sizeModes: ["Current", "A4Landscape", "A4Portrait"],
  filename: "Crash Diagram",
  exportOnly: true,
  hideControlContainer: false,
});

/* Initializing Map/Components */
const units_group = L.layerGroup([]);
const labels_group = L.layerGroup([]);
const drawing_group = L.layerGroup([]);
const map_leaflet = L.map(MAP_CONTAINER, {
  center: CINCINNATI_LAT_LNG,
  zoom: 12,
  zoomSnap: 0,
  wheelPxPerZoomLevel: 100, // Scrool Wheel Zoom -> More is less.
  zoomDelta: 0.5, // + - Button Zoom -> More is more.
  maxZoom: 22,
  closePopupOnClick: false,
  doubleClickZoom: false,
});

const baseMaps = {
  Google: google_layer,
  Esri: esri_layer,
  "No Map": empty_layer,
  "Carto Light": carto_layer,
};
const overlayMaps = {
  Units: units_group,
  Labels: labels_group,
  Other: drawing_group,
};
carto_layer.addTo(map_leaflet);
units_group.addTo(map_leaflet);
labels_group.addTo(map_leaflet);
drawing_group.addTo(map_leaflet);
north.addTo(map_leaflet);
L.control.layers(baseMaps, overlayMaps).addTo(map_leaflet);

/* Toolbar */
if (MAP_EDIT_ENABLED) {
  map_leaflet.pm.addControls({
    position: "topleft",

    // Don't use these features, they are unstable!
    cutPolygon: false,
    editMode: false,
  });
}
printer.addTo(map_leaflet);

/* Context Menu */
let context_menu = createContextMenu();
document.querySelector("body").append(context_menu);

/* Units Interface */
let add_unit = false;
let unit_categories = [];
createUnitSection();

/* Color Picker */
createColorPicker("#" + MAP_CONTAINER);
const colorPickerContainer = document.querySelector(".color-picker-container");

/* Rotation Variables */
let unit_to_rotate = null;
let unit_rotation_angle = null;
let rotation_angle_start = null;

/* Change Size Variables */
let unit_to_change_size = null;
let unit_size = null;
let size_mouseX_start = null;

/* Context Menu Clicked Unit */
let unit_active = null;

/* Popup Variables */
let popup_dragging = null;
popup_mousedown_latlng = null;
popup_dragging_offset = null;

/* The Map Data */
map_data_imported = false;
let units = [];
let labels = [];
const map_data = document.getElementById("geocollect"); // Input field that exports the data.
const old_map_data = document.getElementById("geocollect_update");
const dbLat = document.getElementById("lat");
const dbLng = document.getElementById("lng");

/* Download Button Listener */
let unit_section = document.querySelector(
  ".traffic_crash_diagram_unit_section"
);
let toolbar_container = document.querySelector(
  ".leaflet-control-container .leaflet-top.leaflet-left"
);
document.querySelectorAll("#leafletEasyPrint ~ ul a").forEach((element) => {
  element.addEventListener("click", (e) => {
    if (unit_section) unit_section.style.display = "none";
    if (toolbar_container) toolbar_container.style.display = "none";
  });
});

/* Map Listeners */
map_leaflet.on("layeradd", (e)=> {
    
    if (e.layer instanceof L.Marker){
        const category = e.layer.options.category || CRASH_UNITS.find(unit => unit.src === decodeURIComponent(e.layer._icon.src) )?.category;  
        
        if (category === "Templates") {
            e.layer._icon.setAttribute("template-image", true);
        }
    }
});

map_leaflet.on("pm:create", (e) => {
  if (add_unit) {
    const unit = e.marker;

    unit.addTo(units_group);

    units.push({
      id: unit._leaflet_id,
      iconUrl: unit.options.icon.options.iconUrl,
      iconSize: unit.options.icon.options.iconSize[0],
      rotationAngle: unit.options.rotationAngle,
      filter: unit.options.filter,
      latlng: unit._latlng,
      category: CRASH_UNITS.find(p => p.src === unit.options.icon.options.iconUrl )?.category
    });
    

    createUnitListeners(unit);

    add_unit = false;
    const default_icon = new L.Icon.Default();
    map_leaflet.pm.enableDraw("Marker", {
      snappable: true,
      tooltips: true,
      markerStyle: {
        icon: default_icon,
        draggable: true,
      },
    });
  } else {
    if (e.layer._mRadius) {
      e.layer.feature = e.layer.feature || {};
      e.layer.feature.type = e.layer.feature.type || "Feature";
      e.layer.feature.properties = e.layer.feature.properties || {};
      e.layer.feature.properties.mRadius = e.layer._mRadius;
    } else if (e.layer._radius) {
      e.layer.feature = e.layer.feature || {};
      e.layer.feature.type = e.layer.feature.type || "Feature";
      e.layer.feature.properties = e.layer.feature.properties || {};
      e.layer.feature.properties.radius = e.layer._radius;
    }

    e.layer.addTo(drawing_group);
  }
  map_leaflet.pm.disableDraw();

  resetAction();
});
map_leaflet.on("pm:remove", (e) => {
  drawing_group.removeLayer(e.layer);
  units_group.removeLayer(e.layer);

  let removeIndex = units.findIndex((unit) => unit.id == e.layer._leaflet_id);
  if (removeIndex != -1) units.splice(removeIndex, 1);

  resetAction();
});
map_leaflet.on("mousemove", async (e) => {
  if (unit_to_rotate) {
    if (!map_leaflet.hasLayer(unit_to_rotate)) return;

    let rotation_angle = (e.originalEvent.clientX % 360) - rotation_angle_start;
    unit_to_rotate.setRotationOrigin("center");
    unit_to_rotate.setRotationAngle(unit_rotation_angle + rotation_angle);

    units.find((unit) => unit.id == unit_to_rotate._leaflet_id).rotationAngle =
      unit_to_rotate.options.rotationAngle;
  }

  if (unit_to_change_size) {
    if (!map_leaflet.hasLayer(unit_to_change_size)) return;

    let mouse_move_amount = e.originalEvent.clientX - size_mouseX_start;

    const new_icon = await createLeafletIcon(
      unit_to_change_size.options.icon.options.iconUrl,
      unit_size + mouse_move_amount
    );

    unit_to_change_size.setIcon(new_icon);

    units.find((unit) => unit.id == unit_to_change_size._leaflet_id).iconSize =
      unit_to_change_size.options.icon.options.iconSize[0];
  }

  if (popup_dragging) {
    popup_dragging_offset = popup_dragging_offset || [
      popup_mousedown_latlng.lat - e.latlng.lat,
      popup_mousedown_latlng.lng - e.latlng.lng,
    ];

    popup_dragging.setLatLng([
      e.latlng.lat + popup_dragging_offset[0],
      e.latlng.lng + popup_dragging_offset[1],
    ]);
    labels.find(
      (label) =>
        "unit_label_" + label.unitID == popup_dragging.options.className
    ).latlng = popup_dragging.getLatLng();
  }

  if (unit_section) unit_section.style.display = "flex";
  if (toolbar_container) toolbar_container.style.display = "block";
});
map_leaflet.on("resize", () => {
  labels_group.eachLayer((layer) => layer.update());
  resetAction();
});

map_leaflet.on("contextmenu zoomend click dragstart moveend viewreset", (e) => {
  if (e.type == "dragstart" || e.type == "moveend" || e.type == "zoomend") {
    if (unit_section && unit_section.classList.contains("active")) {
      return;
    }
  }

  resetAction();
});
/*
var createLabelIcon = function(labelClass,labelText){
    return L.divIcon({ 
      className: 'leaflet-div-icon leaflet-editing-icon my-own-icon',
      html: labelText
    })
  }
  
L.marker(map_leaflet.getCenter(), {icon:createLabelIcon("textLabelclass","place 4"),draggable: true,editable:true}).addTo(map_leaflet);


*/
function uniqueID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "free" + Math.random().toString(36).substr(2, 9);
}
function freeLabel() {
  createPopup(map_leaflet.getCenter(), uniqueID());
}
/* Functions */
function setItemLocationInsideContainer(item, container, mouseEvent) {
  // This function allows right click menus or color pickers to appear within the selected container like the map viewport.

  const containerBoundingBox = container.getBoundingClientRect();

  const itemWidth = item.offsetWidth;
  const itemHeight = item.offsetHeight;

  const mouseX = mouseEvent.x;
  const mouseY = mouseEvent.y;

  let setLeft = 0;
  let setTop = 0;

  if (mouseX > containerBoundingBox.right - itemWidth) {
    setLeft = mouseX - itemWidth;
  } else setLeft = mouseX;
  if (mouseY > containerBoundingBox.bottom - itemHeight) {
    setTop = mouseY - itemHeight;
  } else setTop = mouseY;

  item.style.top = setTop + "px";
  item.style.left = setLeft + "px";
}

function addLi(menu, itemLabel, id) {
  let li = document.createElement("li");
  let text = document.createTextNode(itemLabel);
  li.appendChild(text);
  if (id) li.setAttribute("id", id);
  menu.appendChild(li);
  return li;
}

function createLeafletIcon(url, size) {

  return new Promise((res) => {
    const imgElement = document.createElement("img");
    imgElement.onload = () => {
      if (size < 15) size = 15;
      if (size > 250 && size < 1250) size = 250;
      if (size >= 1250) size = 1250;
      var icon;
      if (size == 1250) {
        icon = L.icon({
          iconUrl: url,
          iconSize: [1250, 700],
        });
      } else {
        icon = L.icon({
          iconUrl: url,
          iconSize: [size, (imgElement.height * size) / imgElement.width],
        });
      }

      res(icon);
    };

    imgElement.src = url;
  });
}

function createContextMenu() {
  let context_menu = document.createElement("ul");
  context_menu.setAttribute("id", "context_menu");

  addLi(context_menu, "Label").addEventListener("click", (e) => {
    const unitID = unit_active._leaflet_id;
    const unitLatLng = unit_active.getLatLng();

    let popup_exists = document.querySelector(".unit_label_" + unitID);
    if (popup_exists) {
      const MouseDownEvent = document.createEvent("HTMLEvents");
      MouseDownEvent.initEvent("mousedown");
      popup_exists.dispatchEvent(MouseDownEvent);

      map_leaflet.fire("mousemove", {
        latlng: unitLatLng,
      });
      context_menu.classList.remove("active");
      return;
    }

    let popup = createPopup(unitLatLng, unitID);

    labels.push({
      latlng: popup._latlng,
      unitID: unitID,
      content: popup._content,
    });

    context_menu.classList.remove("active");
  });
  addLi(context_menu, "Extra Label").addEventListener("click", (e) => {
    const unitID = uniqueID();
    const unitLatLng = map_leaflet.getCenter();

    let popup = createPopup(unitLatLng, unitID);

    labels.push({
      latlng: popup._latlng,
      unitID: unitID,
      content: popup._content,
    });

    context_menu.classList.remove("active");
  });
  addLi(context_menu, "Rotate").addEventListener("click", (e) => {
    e.stopPropagation();
    unit_active.fire("click", {
      originalEvent: e,
    });

    context_menu.classList.remove("active");
  });
  addLi(context_menu, "Change Size").addEventListener("click", (e) => {
    unitStartChangeSize(unit_active, e);

    context_menu.classList.remove("active");
  });
  addLi(context_menu, "Change Color").addEventListener("click", (e) => {
    colorPickerContainer.style.display = "inline-block";
    colorPickerContainer.style.position = "absolute";

    setItemLocationInsideContainer(
      colorPickerContainer,
      map_leaflet.getContainer(),
      e
    );

    e.stopPropagation();
    context_menu.classList.remove("active");
  });
  addLi(context_menu, "Remove").addEventListener("click", (e) => {
    let removeIndex = units.findIndex(
      (unit) => unit.id == unit_active._leaflet_id
    );
    if (removeIndex != -1) units.splice(removeIndex, 1);

    units_group.removeLayer(unit_active);
    unit_active.remove();

    context_menu.classList.remove("active");
    resetAction();
  });

  return context_menu;
}

function createUnitSection() {
  const map_container = document.querySelector("#" + MAP_CONTAINER);

  let unit_section = document.createElement("div");
  unit_section.classList.add("traffic_crash_diagram_unit_section");
  map_container.append(unit_section);

  let unit_selection = createUnitSelection();
  unit_section.append(unit_selection);
  function checkFlag() {
    if (flag == false) {
      window.setTimeout(
        checkFlag,
        100
      ); /* this checks the flag every 100 milliseconds*/
    } else {
      setTimeout(function () {
        addUnitsToUnitSelection(unit_selection);
      }, 1500);
    }
  }
  checkFlag();

  let unit_button = createUnitButton();
  unit_button.addEventListener("click", (e) => {
    e.stopPropagation();

    if (unit_section.classList.contains("active")) resetAction();
    else {
      resetAction();
      unit_section.classList.add("active");
    }
  });
  unit_section.append(unit_button);

  if (!MAP_EDIT_ENABLED) unit_section.remove();
}
function createUnitSelection() {
  let unit_selection = document.createElement("div");
  unit_selection.classList.add("traffic_crash_diagram_unit_selection");

  return unit_selection;
}

function addUnitsToUnitSelection(unit_selection) {
  CRASH_UNITS.forEach((unit) => {
    let unit_button = createUnitButton(unit);
    let unit_category = createUnitCategory(unit);
    unit_category.children[1].append(unit_button);

    unit_selection.append(unit_category);

    createUnitListener(unit);
  });

  function createUnitButton(unit) {
    let unit_node = document.createElement("button");
    unit_node.setAttribute("id", unit.id);
    unit_node.setAttribute("type", "button");
    unit_node.innerHTML = unit.label;
    unit_node.classList.add("unit_type");
    // unit_node.append(`<a href="../traffic_image_delete/${unit.file_name}"><span class="delete_image">X</span></a>`);

    let unit_image = document.createElement("img");
    unit_image.setAttribute("src", unit.src);
    unit_node.appendChild(unit_image);

    let unit_span = document.createElement("span");
    unit_span.style.color = "red";
    unit_span.innerHTML = "X";
    unit_span.classList.add("delete_image");
    //unit_span.setAttribute("href", "../traffic_image_delete/"+unit.id);
    unit_node.appendChild(unit_span);
    /*
        let unit_href = document.createElement("a");
        unit_href.setAttribute("href", "../traffic_image_delete/"+unit.file_name);
        unit_span.appendChild(unit_href);
*/
    // let newColor = getColorFilter(unit.colorRGB)
    // unit_image.style.filter = `invert(${newColor.invert}) sepia(${newColor.sepia}) saturate(${newColor.saturate}) hue-rotate(${newColor.hueRotate}) brightness(${newColor.brightness}) contrast(${newColor.contrast})`

    return unit_node;
  }

  $(".delete_image").click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    var id_image = $(this).closest("button").attr("id");
    $("#" + id_image).addClass("d-none");
    $("#file-1615576711727_stop_sign.png").remove();
    $.confirm({
      title: "This action will delete the image.",
      content: "Confirm to continue!",
      title: "",
      content: "Are you sure delete the image",
      buttons: {
        confirm: function (ev) {
          document.getElementById(id_image).remove();
          // $('button').addClass('d-none');
          $.ajax({
            type: "POST",
            url: "../traffic_image_delete/" + id_image,
            success: function (data) {},
          });
        },
        cancel: function () {
          //  $.alert('Canceled!');
        },
      },
    });
  });

  function createUnitCategory(unit) {
    const category_name = unit.category;
    const category_index = unit_categories.findIndex((category) => {
      return category.name === category_name;
    });

    var category_id;
    if (category_name == "Signs") {
      category_id = "sign_add";
    }
    if (category_name == "Units") {
      category_id = "unit_add";
    }
    if (category_name == "Templates") {
      category_id = "template_add";
    }

    if (category_index != -1) {
      return unit_categories[category_index].element;
    } else {
      let category_wrapper = document.createElement("div");
      category_wrapper.classList.add("traffic_crash_diagram_category_wrapper");

      let category_label = document.createElement("label");
      category_label.innerText = category_name + " (Add More)";
      category_label.id = category_id;
      category_label.classList.add("iframe");
      category_wrapper.append(category_label);

      let category_container = document.createElement("div");
      category_container.classList.add(
        "traffic_crash_diagram_category_container" + category_name
      );
      category_wrapper.append(category_container);

      unit_categories.push({
        name: category_name,
        element: category_wrapper,
      });
      return category_wrapper;
    }
  }
  function createUnitListener(unit) {
    document.getElementById(unit.id).addEventListener("click", async (e) => {
      e.stopPropagation();
      add_unit = true;
      const custom_icon = await createLeafletIcon(unit.src, unit.size);
      map_leaflet.pm.enableDraw("Marker", {
        snappable: false,
        tooltips: false,
        markerStyle: {
          icon: custom_icon,
          //filter: newColor
        },
      });
      resetAction();
    });
  }
}

function createUnitButton() {
  let unit_button = document.createElement("div");
  unit_button.classList.add("traffic_crash_diagram_unit_button");

  let arrow = document.createElement("span");
  arrow.classList.add("traffic_crash_diagram_arrow");

  let add_unit_span = document.createElement("span");
  add_unit_span.innerHTML = "Add Unit";
  add_unit_span.classList.add("traffic_crash_diagram_add_unit_text");

  unit_button.append(add_unit_span);
  unit_button.append(arrow);
  return unit_button;
}

function createUnitListeners(unit) {
  let dragging = false;

  unit.on("mousedown", () => {
    if (!unit_to_rotate) resetAction();
    dragging = true;
  });
  unit.on("mouseup", () => {
    dragging = false;
  });

  unit.on("mouseover", async (e) => {
    if (!dragging) {
      let hover_url = e.target.options.icon.options.iconUrl;

      if (!hover_url.includes("_hover"))
        hover_url = e.target.options.icon.options.iconUrl;

      const hover_icon = await createLeafletIcon(
        hover_url,
        e.target.options.icon.options.iconSize[0]
      );
      e.target.setIcon(hover_icon);
      e.target.dragging.enable();
      e.target.setAttribute;
    }
  });
  unit.on("mouseout", async (e) => {
    if (!dragging) {
      const icon = await createLeafletIcon(
        e.target.options.icon.options.iconUrl,
        e.target.options.icon.options.iconSize[0]
      );
      e.target.setIcon(icon);
    }
  });

  unit.on("click", (e) => {
    if (!unit_to_rotate) {
      unitStartRotation(e.target, e.originalEvent);
    } else resetAction();
  });
  unit.on("contextmenu", (e) => {
    resetAction();

    setItemLocationInsideContainer(
      context_menu,
      map_leaflet.getContainer(),
      e.originalEvent
    );
    unit_active = e.target;

    context_menu.classList.add("active");
  });

  unit.on("dragstart", (e) => {
    resetAction();
  });
  unit.on("dragend", (e) => {
    resetAction();
  });
  unit.on("drag", (e) => {
    units.find((unit) => unit.id == e.target._leaflet_id).latlng =
      e.target._latlng;
  });
}

function unitStopRotation() {
  unit_to_rotate = null;
  unit_rotation_angle = null;
  rotation_angle_start = null;
}
function unitStartRotation(unit, mouse_event) {
  unit.getPane().classList.add("mouse-rotating");
  map_leaflet.getContainer().classList.add("mouse-rotating");

  unit_to_rotate = unit;
  unit_rotation_angle = unit_to_rotate.options.rotationAngle % 360;
  rotation_angle_start = mouse_event.clientX % 360;
}

function unitStopChangeSize() {
  unit_to_change_size = null;
  unit_size = null;
  size_mouseX_start = null;
}
function unitStartChangeSize(unit, mouse_event) {
  unit.getPane().classList.add("mouse-rotating");
  map_leaflet.getContainer().classList.add("mouse-rotating");

  unit_to_change_size = unit;
  unit_size = unit_to_change_size.options.icon.options.iconSize[0];
  size_mouseX_start = mouse_event.clientX;
}

function createColorPicker() {
  if (!MAP_EDIT_ENABLED) return;

  $("body").append(`<input id="color-picker" value='#276cb8' />`);
  $("#color-picker").spectrum({
    type: "flat",
    showPalette: false,
    showAlpha: false,
    showButtons: false,
    allowEmpty: false,
    containerClassName: "color-picker-container",
    preferredFormat: "rgb",
    showInput: true,

    move: function (color) {
      if (unit_active) {
        let newColor = getColorFilter([
          color.toRgb().r,
          color.toRgb().g,
          color.toRgb().b,
        ]);
        unit_active.setFilter(newColor);

        units.find((unit) => unit.id == unit_active._leaflet_id).filter = {
          ...unit_active.options.filter,
        };
      }
    },
  });
  //$('#color-picker').spectrum("set", "hsv 0 100 100")
  //$("#color-picker").spectrum("option", "showInput", false);
  $(".color-picker-container").hide();
}
function getColorFilter(color) {
  let colorToConvert = new Color(color[0], color[1], color[2]);
  let solver = new Solver(colorToConvert);
  let result = null;
  do {
    result = solver.solve();
  } while (result.loss > 10.0);

  return {
    invert: Math.round(result.values[0]) + "%",
    sepia: Math.round(result.values[1]) + "%",
    saturate: Math.round(result.values[2]) + "%",
    hueRotate: Math.round((result.values[3] * 360) / 100) + "deg",
    brightness: Math.round(result.values[4]) + "%",
    contrast: Math.round(result.values[5]) + "%",
  };
}

function createPopup(latlng, id) {
  let popup = L.popup({
    className: "unit_label_" + id,
    offset: [0, 22],
    minWidth: 10,
    maxWidth: 240,
    draggable: true,
    editable: true,
  })
    .setContent(`Double-click to edit...`)
    .setLatLng(latlng)
    .addTo(map_leaflet);

  if (MAP_EDIT_ENABLED) createPopupListeners(popup, id);
  else {
    document
      .querySelectorAll("a.leaflet-popup-close-button")
      .forEach((element) => element.remove());
    document
      .querySelectorAll(".leaflet-popup-content")
      .forEach((element) => (element.style.marginRight = "8px"));
  }
  popup.addTo(labels_group);

  return popup;
}
async function createPopupListeners(popup, id) {
  const popupContainer = document.querySelector(".unit_label_" + id);

  popupContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    popup_dragging = popup;
    popup_mousedown_latlng = popup._latlng;
    popup_dragging_offset = null;
  });

  popupContainer.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    popup_dragging = null;
    popup_mousedown_latlng = null;
    popup_dragging_offset = null;
  });
  popupContainer.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    changePopupContent(popup, popupContainer);
  });
  
  popupContainer.childNodes[2].addEventListener("click", () => {
    labels_group.removeLayer(popup);

    const removeIndex = labels.findIndex((label) => label.unitID == id);
    if (removeIndex != -1) labels.splice(removeIndex, 1);

    resetAction();
  });
}
function changePopupContent(popup, popupContainer) {
  const text = document.createElement("textarea");
  text.value = popup.getContent();

  const closeButton = popupContainer.childNodes[2];
  closeButton.style.display = "none";

  const popupContent = popupContainer.childNodes[0].childNodes[0];
  popupContent.style.display = "none";

  popupContainer.childNodes[0].appendChild(text);
  text.classList.add("leaflet-popup-content");
  text.classList.add("leaflet-popup-content-textarea");
  text.style.width = "126px";
  text.focus();

  text.addEventListener("focusout", () => {
    popupContent.style.display = "block";
    closeButton.style.display = "block";
    popup.setContent(text.value);
    text.remove();
    popup.update();

    labels.find(
      (label) => "unit_label_" + label.unitID == popup.options.className
    ).content = popup.getContent();
  });
}

function resetAction(undoChanges = false) {
  if (!MAP_EDIT_ENABLED) return;

  unitStopRotation();
  unitStopChangeSize();
  unit_active = null;
  popup_dragging = null;
  context_menu.classList.remove("active");
  colorPickerContainer.style.display = "none";
  document
    .querySelectorAll(".mouse-rotating")
    .forEach((element) => element.classList.remove("mouse-rotating"));
  unit_section.classList.remove("active");

  exportMapData(undoChanges);
  importMapData(undoChanges);
}

function exportMapData(doNotExport = false) {
  if (map_data_imported && !doNotExport) {
    let object = [
      units,
      labels,
      drawing_group.toGeoJSON(),
      map_leaflet.getZoom(),
      map_leaflet.getCenter(),
    ];
    if (
      units.length === 0 &&
      labels.length === 0 &&
      drawing_group.toGeoJSON().features.length === 0
    ) {
      object.pop();
      object.pop();
    }
    map_data_string = JSON.stringify(object);
    map_data.value = map_data_string;

    if (!formDirtyInput) {
      if (old_map_data.value !== map_data.value) {
        setFormDirty();
      }
    }
  }
}
function importMapData(forceImport = false) {
  if ((map_data_imported || !map_data.value) && !forceImport) {
    map_data_imported = true;
    return;
  }
  map_data_imported = true;

  const map_data_object = JSON.parse(map_data.value);

  // UNITS
  units = map_data_object[0] || [];
  units_group.clearLayers();
  if (units)
    units.forEach(async (unit) => {
      const custom_icon = await createLeafletIcon(unit.iconUrl, unit.iconSize);

      let added_unit = L.marker(unit.latlng, {
        icon: custom_icon,
        rotationAngle: unit.rotationAngle,
        rotationOrigin: "center",
        //pmIgnore: true,
        filter: unit.filter,
        category: unit.category
      });
      added_unit._leaflet_id = unit.id;

      if (!map_leaflet.hasLayer(added_unit)) added_unit.addTo(units_group);

      if (MAP_EDIT_ENABLED) createUnitListeners(added_unit);
    });

  // LABELS
  labels = map_data_object[1] || [];
  labels_group.eachLayer((layer) => layer._container.remove());
  labels_group.clearLayers();
  if (labels)
    labels.forEach((label) => {
      const popup = createPopup(label.latlng, label.unitID);
      popup.setContent(label.content);
      popup.update();
    });

  // DRAWING
  drawing_group.clearLayers();
  L.geoJSON(map_data_object[2], {
    pointToLayer: function (feature, latlng) {
      if (feature.properties.mRadius)
        return L.circle(latlng, { radius: feature.properties.mRadius });
      else if (feature.properties.radius)
        return L.circleMarker(latlng, { radius: feature.properties.radius });
      else return L.marker(latlng);
    },
    onEachFeature: function (feature, layer) {
      layer.addTo(drawing_group);
    },
  });

  // MAP ZOOM
  const map_zoom = map_data_object[3] || map_leaflet.getZoom();
  // MAP CENTER
  const map_center = map_data_object[4] || map_leaflet.getCenter();

  map_leaflet.setView(map_center, map_zoom);
}

function setMapDataImported(value) {
  map_data_imported = value;
}
