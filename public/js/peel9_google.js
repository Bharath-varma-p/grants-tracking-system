//'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apikey=4JWuq6LvM8XFEQCe_YE6LvG4UISGAZ8YINPqoWGiiIA&query=Pariser+1+Berl',
const API_KEY = "z-JFiY0qHEb1mPDau7UTtLuGB1V-ltNMgzUq1N2xUVg";

const defaultCenter = globalVariables.defaultCenter; //Current department center coordinates

let searchCoordinate = "39.103119,-84.512016"; //Cincinnati Center

if (defaultCenter && defaultCenter[0] && defaultCenter[1]) {
  searchCoordinate = defaultCenter[0] + "," + defaultCenter[1];
}

var apiParams = `&apiKey=${API_KEY}&in=countryCode:USA&at=${searchCoordinate}&limit=5&lang=en`;

function getLongAddress(address) {
  const shortAddress = getShortAddress(address);

  return (
    (shortAddress ? shortAddress + ", " : "") +
    (address.city ? address.city + ", " : "") +
    (address.state ? address.state + " " : "") +
    (address.zip_code ? address.zip_code + " " : "")
  )
    .trim()
    .replace(/,$/g, "")
    .trim();
}

function getShortAddress(address) {
  let shortAddress = "";

  if (address.lid_name) {
    shortAddress =
      address.lid_name +
      ", " +
      (address.st_number ? address.st_number + " " : "") +
      (address.st_name ? address.st_name + " " : "") +
      (address.milePost ? address.milePost + " " : "");
  } else {
    shortAddress =
      (address.st_number ? address.st_number + " " : "") +
      (address.FullName ? address.FullName + ", " : "") +
      (address.st_name ? address.st_name + " " : "") +
      (address.milePost ? address.milePost + " " : "");
  }

  return shortAddress.trim().replace(/,$/g, "").trim();
}

function parseFromLocatorDatabaseAddress(address) {
  return {
    ...address,
    state: getStateCode(address.state),
    country: "United States",
  };
}

function parseFromApiAddress(address) {
  return {
    county: address.county,
    city: address.city,
    state: address.stateCode,
    zip_code: address.postalCode ? address.postalCode.split("-")[0] : "",
    st_number: address.houseNumber,
    st_name: address.street || (address.streets ? address.streets.join(" & ") : ""),
    country: address.countryName,
  };
}

function checkCautionPlaces(address) {
  $.ajax({
    type: "POST",
    url: "../cautionPlaces",
    data: {
      pointx: address.pointx,
      pointy: address.pointy,
      check: "yes",
      address: getShortAddress(address),
    },
    success: function (data) {
      if (data[0]) {
        $("#address_alert").empty();
        $("#address_alert").append(
          '<button class="btn btn-warning" type="button" data-toggle="modal" data-toggle="tooltip" data-placement="top" title="' +
            data[0].reasonFor +
            '" data-target="#edit" data-title">  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>  Caution Indicator</button>'
        );
      }
    },
  });
}

function findAddressPartsFromApi(locationId) {
  return new Promise((resolve, reject) => {
    $.getJSON("https://autocomplete.search.hereapi.com/v1/lookup", {
      apiKey: API_KEY,
      id: locationId,
    })
      .done(function (data) {
        resolve({
          coords: data.position,
          address: parseFromApiAddress(data.address),
        });
      })
      .fail(reject);
  });
}

var locatorDatabase = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    dataType: "json",
    rateLimitBy: "debounce",
    rateLimitWait: 600,
    url: "../peel9_locator_search?query=%QUERY",
    replace: function (url, uriEncodedQuery) {
      const addressType = $("#not_found").val();
      return (
        url.replace("%QUERY", encodeURIComponent(uriEncodedQuery)) +
        "&type=" +
        encodeURIComponent(addressType || "lids")
      );
    },
    filter: function (addresses) {
      return $.map(addresses, function (address) {
        return {
          value: getLongAddress(address),
          values: [parseFromLocatorDatabaseAddress(address)],
          fromLocatorDatabase: true,
        };
      });
    },
  },
  limit: 15,
});

var geocodeApiSearch = new Bloodhound({
  datumTokenizer: function (datum) {
    return Bloodhound.tokenizers.whitespace(datum.value);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    dataType: "json",
    rateLimitBy: "debounce",
    rateLimitWait: 600,
    //delay: 250,
    url:
      "https://autocomplete.search.hereapi.com/v1/autosuggest?q=%QUERY" +
      apiParams,
    filter: function (data) {
      if (!data.items) return [];

      // Map the remote source JSON array to a JavaScript object array
      return $.map(data.items, function (d) {
        return {
          value: d.address.label,
          id: d.id,
          values: [d.address.label],
        };
      });
    },
  },
});

// Initialize the Bloodhound suggestion engine

geocodeApiSearch.initialize();

locatorDatabase.initialize();

// Instantiate the Typeahead UI
$(
  "#google_search .typeahead, #interviewed_adress_search .typeahead, #google_search_incident .typeahead, #google_search_suspect .typeahead, #google_search_employer .typeahead"
).typeahead(
  null,
  {
    displayKey: "value",
    source: locatorDatabase.ttAdapter(),
  },
  {
    displayKey: "value",
    source: geocodeApiSearch.ttAdapter(),
  }
);

function fillAddressInputs(datum, customFill, shouldInitMap = true) {
  const addressPromise = datum.fromLocatorDatabase
    ? Promise.resolve({ address: datum.values[0] })
    : findAddressPartsFromApi(datum.id);

  addressPromise.then(({ address, coords }) => {
    const shortAddress = getShortAddress(address);
    const longAddress = getLongAddress(address);

    if (coords) {
      address.pointx = coords.lng;
      address.pointy = coords.lat;
    }

    customFill({
      address,
      shortAddress,
      longAddress,
    });

    if (shouldInitMap) {
      initMapPeel9();
    }

    checkCautionPlaces(address);
  });
}

function fillLongAdress(selector, longAddress) {
  const longAddressInput = $(selector);
  if (longAddressInput.length === 0) return;
  longAddressInput.val(longAddress).data("selected-val", longAddress);
  longAddressInput.valid();
}

$("input.typeahead").on("typeahead:selected", function (e, datum) {
  if ($(this).attr("address-should-be-selected") === "true") {
    $(this).data("selected-val", getLongAddress(datum.values[0])).valid();
  }
});

$("#google_search .typeahead").on("typeahead:selected", function (e, datum) {
  fillAddressInputs(datum, ({ address, shortAddress, longAddress }) => {
    $("#addrs").val(shortAddress);
    if ($("#addrs").attr("address-should-be-selected") === "true") {
      $("#addrs").data("selected-val", shortAddress);
    }
    fillLongAdress("input#uc", longAddress);
    fillLongAdress("#owner_address_log", longAddress);
    $("#addrs22").val(shortAddress);
    $("#state22").val(address.state);
    $("#county22").val(address.county);
    $("#zip22").val(address.zip_code);
    $("#city22").val(address.city);
    $("#lat").val(address.pointy);
    $("#lng").val(address.pointx);
    $("#lat22").val(address.pointy);
    $("#lng22").val(address.pointx);
    $("#locality").val(address.city);
    $("#neighborhood").val(address.neighborhood);
    $("#nghbd22").val(address.neighborhood);
    $("#administrative_area_level_1").val(address.state);
    $("#administrative_area_level_2").val(address.county);
    $("#postal_code").val(address.zip_code);
  });
});

$("#interviewed_adress_search .typeahead").on(
  "typeahead:selected",
  function (e, datum) {
    fillAddressInputs(datum, ({ address, shortAddress, longAddress }) => {
      $("#addrs21").val(shortAddress);
      fillLongAdress("#interviewed_adress", longAddress);
      $("#state21").val(address.state);
      $("#county21").val(address.county);
      $("#zip21").val(address.zip_code);
      $("#neighborhood21").val(address.neighborhood);
      $("#city21").val(address.city);
      $("#country21").val(address.country);
      $("#lat").val(address.pointy);
      $("#lng").val(address.pointx);
      $("#lat21").val(address.pointy);
      $("#lng21").val(address.pointx);
    });
  }
);

$("#google_search_incident .typeahead").on(
  "typeahead:selected",
  function (e, datum) {
    fillAddressInputs(datum, ({ address, shortAddress, longAddress }) => {
      $("#addrs").val(shortAddress);
      $("#country").val(address.country);
      $("#lat").val(address.pointy);
      $("#lng").val(address.pointx);
      $("#locality").val(address.city);
      $("#neighborhood").val(address.neighborhood);
      $("#administrative_area_level_1").val(address.state);
      $("#administrative_area_level_2").val(address.county);
      $("#postal_code").val(address.zip_code);
      fillLongAdress("input#uc", longAddress);
    });
  }
);

$("#google_search_suspect .typeahead").on(
  "typeahead:selected",
  function (e, datum) {
    fillAddressInputs(
      datum,
      ({ address, shortAddress, longAddress }) => {
        $("#addrs2").val(shortAddress);
        $("#country2").val(address.country);
        $("#lat2").val(address.pointy);
        $("#lng2").val(address.pointx);
        $("#city2").val(address.city);
        $("#state2").val(address.state).selectpicker("refresh");
        $("#county2").val(address.county);
        $("#zip2").val(address.zip_code);
        fillLongAdress("#interviewed_adress", longAddress);
      },
      false
    );
  }
);

$("#google_search_employer .typeahead").on(
  "typeahead:selected",
  function (e, datum) {
    fillAddressInputs(datum, ({ longAddress }) => {
      fillLongAdress("#employer_address", longAddress);
    });
  }
);

function initMapPeel9() {
  var get_center = {
    lat: parseFloat(document.getElementById("lat").value),
    lng: parseFloat(document.getElementById("lng").value),
  };
  var get_center2 = [
    parseFloat(document.getElementById("lat").value),
    parseFloat(document.getElementById("lng").value),
  ];

  if (document.getElementById("map")) {
    if (marker) {
      map.removeLayer(marker);
    }
    var marker = L.marker(get_center2, {
      title: "Mile Post",
    }).addTo(map);
    map.setView(get_center2, 19);
  }

  if (document.getElementById("map_asil")) {
    if (marker) {
      map.removeLayer(marker);
    }
    var marker = L.marker(get_center2, {
      title: "Mile Post",
    }).addTo(map);
    map.setView(get_center2, 19);
  }
}

function addMap() {
  let map_skin =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png";

  if ("{{darkMode}}" == "true") {
    map_skin =
      "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png";
  }

  mapLink = '<a href="https://wiki.openstreetmap.org/wiki/Tile_servers</a>';
  var osm = L.tileLayer(map_skin, {
    attribution: "&copy; " + mapLink + " Contributors",
    maxZoom: 24,
  }).addTo(map);
  var layerscontrol = L.control.fullscreen().addTo(map);
  L.control
    .layers(
      {
        Base: osm,
        Gray: L.tileLayer(
          "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        ),
        Satellite: L.tileLayer(
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Powered by Esri",
          }
        ),
      },
      {},
      {},
      { position: "topleft", collapsed: false }
    )
    .addTo(map);
}
