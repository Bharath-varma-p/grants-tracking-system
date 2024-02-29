/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const property_codes = [
  { label: "Exchange mediums", heading: "1", value: null },
  { label: "Money ", heading: "0", value: "1" },
  { label: "Credit/debit card ", heading: "0", value: "2" },
  { label: "Negotiable instruments ", heading: "0", value: "3" },
  { label: "Other exchange mediums documents", heading: "0", value: "4" },
  { label: "Non-negotiable instruments ", heading: "0", value: "5" },
  { label: "Personal  (identity)  papers  ", heading: "0", value: "6" },
  { label: "Documents/personal or business ", heading: "0", value: "62" },
  { label: "Other documents valuables", heading: "0", value: "7" },
  { label: "Jewelry/precious metals ", heading: "0", value: "8" },
  {
    label: "Art objects, antiques, and other precious items ",
    heading: "0",
    value: "9",
  },
  { label: "Other valuables personal effects", heading: "0", value: "10" },
  { label: "Clothing/furs ", heading: "0", value: "11" },
  { label: "Purses/handbags/wallets", heading: "0", value: "12" },
  {
    label: "Other personal effects household items",
    heading: "0",
    value: "13",
  },
  { label: "Household items", heading: "0.2", value: "14" },
  { label: "Equipment", heading: "1", value: null },
  { label: "Drug/narcotic equipment", heading: "0", value: "15" },
  { label: "Gambling equipment ", heading: "0", value: "16" },
  { label: "Computer hardware/software ", heading: "0", value: "17" },
  { label: "Office equipment ", heading: "0", value: "18" },
  {
    label: "Stereo equipment, tv, and radio (not vehicle) ",
    heading: "0",
    value: "19",
  },
  { label: "Recordings ", heading: "0", value: "20" },
  {
    label: "Sports equipment (all except bicycles and firearms) ",
    heading: "0",
    value: "21",
  },
  { label: "Photographic/optical equipment ", heading: "0", value: "22" },
  { label: "Farm equipment ", heading: "0", value: "23" },
  {
    label: "Heavy construction/industrial equipment ",
    heading: "0",
    value: "24",
  },
  { label: "Building supplies for construction ", heading: "0", value: "25" },
  { label: "Tools ", heading: "0", value: "26" },
  { label: "Vehicle parts or accessories ", heading: "0", value: "27" },
  { label: "Aircraft parts or accessories ", heading: "0", value: "57" },
  { label: "School supplies ", heading: "0", value: "28" },
  { label: "Artistic supplies or accessories ", heading: "0", value: "58" },
  {
    label: "Camping/hunting/fishing equipment/supplies ",
    heading: "0",
    value: "59",
  },
  { label: "Law enforcement equipment ", heading: "0", value: "67" },
  { label: "Lawn/yard/garden equipment ", heading: "0", value: "68" },
  { label: "Logging equipment ", heading: "0", value: "69" },
  { label: "Medical/medical lab equipment ", heading: "0", value: "70" },
  { label: "Musical instruments ", heading: "0", value: "72" },
  { label: "Portable electronic communications ", heading: "0", value: "73" },
  {
    label: "Watercraft equipment/parts/accessories ",
    heading: "0",
    value: "74",
  },
  { label: "Other equipment ", heading: "0.2", value: "29" },
  { label: "Consumable items", heading: "1", value: null },
  { label: "Alcohol ", heading: "0", value: "30" },
  { label: "Drugs/narcotics", heading: "0", value: "31" },
  { label: "Chemicals", heading: "0", value: "60" },
  { label: "Crops ", heading: "0", value: "61" },
  { label: "Explosives ", heading: "0", value: "63" },
  { label: "Fuel", heading: "0", value: "65" },
  { label: "Consumable goods ", heading: "0", value: "32" },
  { label: "Animals", heading: "1", value: null },
  { label: "Livestock  ", heading: "0", value: "33" },
  { label: "Household pets ", heading: "0.2", value: "34" },
  { label: "Vehicles", heading: "1", value: null },
  { label: "Aircraft ", heading: "0", value: "35" },
  { label: "Automobiles ", heading: "0", value: "36" },
  { label: "Bicycles ", heading: "0", value: "37" },
  { label: "Buses ", heading: "0", value: "38" },
  { label: "Trucks ", heading: "0", value: "39" },
  { label: "Trailers ", heading: "0", value: "40" },
  { label: "Watercraft ", heading: "0", value: "41" },
  { label: "Recreational vehicles ", heading: "0", value: "42" },
  { label: "Other motor vehicles ", heading: "0", value: "43" },
  { label: "Weapons", heading: "1", value: null },
  { label: "Firearms ", heading: "0", value: "44" },
  { label: "Other weapons ", heading: "0", value: "45" },
  { label: "Firearm accessories ", heading: "0.2", value: "64" },
  { label: "Structures", heading: "1", value: null },
  { label: "Single occupancy dwellings ", heading: "0", value: "46" },
  { label: "Other dwellings ", heading: "0", value: "47" },
  { label: "Commercial/business ", heading: "0", value: "48" },
  { label: "Industrial/manufacturing ", heading: "0", value: "49" },
  { label: "Public/community  ", heading: "0", value: "50" },
  { label: "Storage ", heading: "0", value: "51" },
  { label: "Other  structure  ", heading: "0.2", value: "52" },
  { label: "Other", heading: "1", value: null },
  { label: "Merchandise ", heading: "0", value: "53" },
  { label: "Identity-intangible ", heading: "0", value: "66" },
  { label: "Metals, non-precious ", heading: "0", value: "71" },
  { label: "Other property ", heading: "0", value: "54" },
  { label: "Pending inventory ", heading: "0", value: "55" },
  { label: "Special categories ", heading: "0.2", value: "56" },
  { label: "Unknown", heading: "1", value: null },
  { label: "Unknown", heading: "0.2", value: "0" },
];

const drug_data = [
  { label: "OPIATES AND SYNTHETIC NARCOTICS", heading: 1, value: null },
  { label: "Heroin", heading: 0, value: 1 },
  { label: "Morphine", heading: 0, value: 2 },
  { label: "Codeine", heading: 0, value: 3 },
  { label: "Opium", heading: 0, value: 4 },
  { label: "Methadone", heading: 0, value: 5 },
  { label: "Hydrocodone", heading: 0, value: 6 },
  { label: "Darvon (Propoxyphene)", heading: 0, value: 7 },
  {
    label: "Other Synthetic Narcotics including Demerol, Dihydromorphinone (Dilaudid), and Percodan",
    heading: 0.2,
    value: 8,
  },
  { label: "COCAINE", heading: 1, value: null },
  { label: "Crack", heading: 0, value: 9 },
  { label: "All Other Cocoa Derivatives", heading: 0.2, value: 10 },
  { label: "STIMULANTS", heading: 1, value: null },
  { label: "Amphetamines/Methamphetamines", heading: 0, value: 11 },
  {
    label: "Stimulants including Apidex-P, Fastine, Ionamin, and Tenuate",
    heading: 0,
    value: 12,
  },
  {
    label: "Other Stimulants including Methylphenidate (Ritalin), Phenmetrazine (Preludin), Benzedrine, and Didrex",
    heading: 0.2,
    value: 13,
  },
  { label: "DEPRESSANTS", heading: 1, value: null },
  { label: "Methaqualone, Quaaludes", heading: 0, value: 14 },
  { label: "Barbiturates", heading: 0, value: 15 },
  {
    label: "Tranquilizers including Chlordiazepoxide (Librium), Diazepam (Valium), and Pentazocine (Talwin)",
    heading: 0,
    value: 16,
  },
  {
    label: "Tranquilizers including Glutethimide and Doriden",
    heading: 0.2,
    value: 17,
  },
  { label: "HALLUCINOGENS", heading: 1, value: null },
  { label: "PCP (Angel Dust)", heading: 0, value: 18 },
  { label: "LSD (Acid)", heading: 0, value: 19 },
  { label: "Other Hallucinogens", heading: 0.2, value: 20 },
  { label: "CANNABIS", heading: 1, value: null },
  { label: "Marijuana", heading: 0, value: 21 },
  { label: "Hashish", heading: 0, value: 22 },
  {
    label: "Other Cannabis derivatives including Hash Oil and THC",
    heading: 0.2,
    value: 23,
  },
  { label: "PRESCRIPTION DRUGS", heading: 1, value: null },
  {
    label: "Antidepressants including Elavil, Triavil, and Trofranil",
    heading: 0,
    value: 24,
  },
  { label: "Prozac", heading: 0, value: 25 },
  { label: "Soma", heading: 0.2, value: 26 },
  { label: "HARMFUL INTOXICANTS", heading: 1, value: null },
  {
    label: "Glue or Aerosol Vapors (Aromatic Hydrocarbons) 28",
    heading: 0,
    value: 27,
  },
  { label: "Other", heading: 0, value: 29 },
  { label: "Unknown", heading: 0.2, value: 99 },
];

const drug_quantity = [
  { label: "WEIGHT", heading: 1, value: null },
  { label: "Gram", heading: 0, value: "GM" },
  { label: "Kilogram", heading: 0, value: "KG" },
  { label: "Ounce LB", heading: 0.2, value: "OZ" },
  { label: "Pound", heading: 1, value: "LB" },
  { label: "CAPACITY", heading: 1, value: null },
  { label: "Milliliter", heading: 0, value: "ML" },
  { label: "Liter", heading: 0, value: "LT" },
  { label: "Fluid Ounce", heading: 0, value: "FO" },
  { label: "Gallon", heading: 0.2, value: "GL" },
  { label: "UNITS", heading: 1, value: null },
  { label: "Dosage Units (capsules, pills, tablets)", heading: 0, value: "DU" },
  { label: "Number of Plants", heading: 0.2, value: "NP" },
  { label: "OTHER", heading: 1, value: null },
  { label: "Drug Not Seized", heading: 0, value: "NS" },
  { label: "Not Reported*", heading: 0.2, value: "XX" },
];

function property_codes_init() {
  const a = [];

  for (let i = 0; i < property_codes.length; i++) {
    if (property_codes[i].heading.toString()[0] == 1) {
      a.push('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
    }
    if (property_codes[i].heading.toString()[0] == 0) {
      if (property_codes[i].value == "31") {
        a.push(
          '<option class="option25" id="otuzbir" value="' +
            property_codes[i].value +
            '">' +
            property_codes[i].value +
            " - " +
            property_codes[i].label +
            "</option>"
        );
      }
      if (property_codes[i].value == "15") {
        a.push(
          '<option class="option25" id="onbes" value="' +
            property_codes[i].value +
            '">' +
            property_codes[i].value +
            " - " +
            property_codes[i].label +
            "</option>"
        );
      }

      if (property_codes[i].value != "15" && property_codes[i].value != "31") {
        a.push(
          '<option class="option25" value="' +
            property_codes[i].value +
            '">' +
            property_codes[i].value +
            " - " +
            property_codes[i].label +
            "</option>"
        );
      }
    }
    if (property_codes[i].heading.toString()[2] == 2) {
      a.push("</optgroup>");
    }
  }

  const div = document.getElementById("bir");
  div.innerHTML += a;

  $("#bir").selectpicker("refresh");
}

function drug_type_init() {
  const b = [];

  b.push(' <option class="option" style="margin-top: -50px;"></option>');

  for (let i = 0; i < drug_data.length; i++) {
    if (drug_data[i].heading.toString()[0] == 1) {
      b.push('<optgroup class="heading_style" label="' + drug_data[i].label + '">');
    }
    if (drug_data[i].heading.toString()[0] == 0) {
      b.push('<option class="option25" value="' + drug_data[i].value + '">' + drug_data[i].label + "</option>");
    }
    if (drug_data[i].heading.toString()[2] == 2) {
      b.push("</optgroup>");
    }
  }

  const div = document.getElementById("drug_type");
  div.innerHTML += b;

  $("#drug_type").selectpicker("refresh");
}

function drug_quantity_init() {
  const c = [];

  c.push(' <option class="option" style="margin-top: -50px;"></option>');

  for (let i = 0; i < drug_quantity.length; i++) {
    if (drug_quantity[i].heading.toString()[0] == 1) {
      c.push('<optgroup class="heading_style" label="' + drug_quantity[i].label + '">');
    }
    if (drug_quantity[i].heading.toString()[0] == 0) {
      c.push('<option class="option25" value="' + drug_quantity[i].value + '">' + drug_quantity[i].label + "</option>");
    }

    if (drug_quantity[i].heading.toString()[2] == 2) {
      c.push("</optgroup>");
    }
  }

  const div = document.getElementById("drug_measure");
  div.innerHTML += c;

  $("#drug_measure").selectpicker("refresh");
}

function isDrugOffense(orc_no) {
  if (!orc_no) {
    return false;
  }

  const orcFirstSeven = orc_no.substring(0, 7);

  return (
    orc_no === "2921.36A2" ||
    orcFirstSeven === "2925.02" ||
    orcFirstSeven === "2925.03" ||
    orcFirstSeven === "2925.04" ||
    orcFirstSeven === "2925.05" ||
    orcFirstSeven === "2925.06" ||
    orcFirstSeven === "2925.11" ||
    orcFirstSeven === "2925.13" ||
    orcFirstSeven === "2925.14" ||
    orcFirstSeven === "2925.24" ||
    orcFirstSeven === "2925.31" ||
    orcFirstSeven === "2925.32" ||
    orcFirstSeven === "2925.33" ||
    orcFirstSeven === "2925.36" ||
    orcFirstSeven == "4729.51"
  );
}

function oibrs_property() {
  if (
    orc_no.substring(0, 7) == "2905.01" ||
    orc_no.substring(0, 7) == "2905.02" ||
    orc_no.substring(0, 7) == "2905.03" ||
    orc_no.substring(0, 7) == "2905.05" ||
    orc_no.substring(0, 7) == "2911.11" ||
    orc_no.substring(0, 7) == "2913.51" ||
    orc_no.substring(0, 7) == "2921.02" ||
    orc_no.substring(0, 7) == "2921.21" ||
    orc_no.substring(0, 7) == "2921.23" ||
    orc_no.substring(0, 7) == "2911.12" ||
    orc_no.substring(0, 7) == "2911.13" ||
    orc_no.substring(0, 7) == "2903.03" ||
    orc_no.substring(0, 7) == "2903.05"
  ) {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append(
        '<option value="1">None</option><option value="5">Stolen/Etc.</option><option value="7">Recovered</option><option value="U">Unknown</option>'
      );
    }
  }

  if (orc_no.substring(0, 7) == "2913.51") {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append('<option value="1">None</option><option value="7">Recovered</option>');
    }
  }

  if (
    orc_no.substring(0, 7) == "2911.11" ||
    orc_no.substring(0, 7) == "2911.12" ||
    orc_no.substring(0, 7) == "2911.13" ||
    larceny_type == "240"
  ) {
    $("#bir").empty();

    const a = $("#bir");

    for (let i = 0; i < property_codes.length; i++) {
      if (
        property_codes[i].value != "46" &&
        property_codes[i].value != "47" &&
        property_codes[i].value != "48" &&
        property_codes[i].value != "49" &&
        property_codes[i].value != "50" &&
        property_codes[i].value != "51" &&
        property_codes[i].value != "52"
      ) {
        if (property_codes[i].heading.toString()[0] == 1) {
          a.append('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
        }
        if (property_codes[i].heading.toString()[0] == 0) {
          a.append(
            '<option class="option25" value="' +
              property_codes[i].value +
              '">' +
              property_codes[i].value +
              " - " +
              property_codes[i].label +
              "</option>"
          );
        }
        if (property_codes[i].heading.toString()[2] == 2) {
          a.append("</optgroup>");
        }
      }
    }
  }

  if (orc_no.substring(0, 7) == "2915.02") {
    $("#bir").empty();

    const a = $("#bir");

    for (let i = 0; i < property_codes.length; i++) {
      if (property_codes[i].value != "16") {
        if (property_codes[i].heading.toString()[0] == 1) {
          a.append('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
        }
        if (property_codes[i].heading.toString()[0] == 0) {
          a.append(
            '<option class="option25" value="' +
              property_codes[i].value +
              '">' +
              property_codes[i].value +
              " - " +
              property_codes[i].label +
              "</option>"
          );
        }
        if (property_codes[i].heading.toString()[2] == 2) {
          a.append("</optgroup>");
        }
      }
    }
  }

  if (larceny_type == "23A" || larceny_type == "23B" || larceny_type == "23C") {
    $("#bir").empty();
    const a = $("#bir");

    for (let i = 0; i < property_codes.length; i++) {
      if (
        property_codes[i].value != "23" ||
        property_codes[i].value != "24" ||
        property_codes[i].value != "33" ||
        property_codes[i].value != "35" ||
        property_codes[i].value != "36" ||
        property_codes[i].value != "37" ||
        property_codes[i].value != "38" ||
        property_codes[i].value != "39" ||
        property_codes[i].value != "40" ||
        property_codes[i].value != "41" ||
        property_codes[i].value != "42" ||
        property_codes[i].value != "43" ||
        property_codes[i].value != "46" ||
        property_codes[i].value != "47" ||
        property_codes[i].value != "48" ||
        property_codes[i].value != "49" ||
        property_codes[i].value != "50" ||
        property_codes[i].value != "51" ||
        property_codes[i].value != "52"
      ) {
        if (property_codes[i].heading.toString()[0] == 1) {
          a.append('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
        }
        if (property_codes[i].heading.toString()[0] == 0) {
          a.append(
            '<option class="option25" value="' +
              property_codes[i].value +
              '">' +
              property_codes[i].value +
              " - " +
              property_codes[i].label +
              "</option>"
          );
        }
        if (property_codes[i].heading.toString()[2] == 2) {
          a.append("</optgroup>");
        }
      }
    }

    const div = document.getElementById("bir");
    div.innerHTML += a;
  }

  if (larceny_type == "23D" || larceny_type == "23E" || larceny_type == "23F") {
    $("#bir").empty();
    const a = $("#bir");

    for (let i = 0; i < property_codes.length; i++) {
      if (
        property_codes[i].value != "36" ||
        property_codes[i].value != "38" ||
        property_codes[i].value != "39" ||
        property_codes[i].value != "40" ||
        property_codes[i].value != "42" ||
        property_codes[i].value != "43" ||
        property_codes[i].value != "46" ||
        property_codes[i].value != "47" ||
        property_codes[i].value != "48" ||
        property_codes[i].value != "49" ||
        property_codes[i].value != "50" ||
        property_codes[i].value != "51" ||
        property_codes[i].value != "52"
      ) {
        if (property_codes[i].heading.toString()[0] == 1) {
          a.append('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
        }
        if (property_codes[i].heading.toString()[0] == 0) {
          a.append(
            '<option class="option25" value="' +
              property_codes[i].value +
              '">' +
              property_codes[i].value +
              " - " +
              property_codes[i].label +
              "</option>"
          );
        }
        if (property_codes[i].heading.toString()[2] == 2) {
          a.append("</optgroup>");
        }
      }
    }

    const div = document.getElementById("bir");
    div.innerHTML += a;
  }

  if (larceny_type == "23G") {
    $("#bir").empty();
    const a = $("#bir");

    for (let i = 0; i < property_codes.length; i++) {
      if (property_codes[i].value != "27" || property_codes[i].value != "55") {
        if (property_codes[i].heading.toString()[0] == 1) {
          a.append('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
        }
        if (property_codes[i].heading.toString()[0] == 0) {
          a.append(
            '<option class="option25" value="' +
              property_codes[i].value +
              '">' +
              property_codes[i].value +
              " - " +
              property_codes[i].label +
              "</option>"
          );
        }
        if (property_codes[i].heading.toString()[2] == 2) {
          a.append("</optgroup>");
        }
      }
    }

    const div = document.getElementById("bir");
    div.innerHTML += a;
  }

  if (larceny_type == "23H") {
    $("#bir").empty();
    const a = $("#bir");

    for (let i = 0; i < property_codes.length; i++) {
      if (
        property_codes[i].value != "36" ||
        property_codes[i].value != "38" ||
        property_codes[i].value != "39" ||
        property_codes[i].value != "42" ||
        property_codes[i].value != "43"
      ) {
        if (property_codes[i].heading.toString()[0] == 1) {
          a.append('<optgroup class="heading_style" label="' + property_codes[i].label + '">');
        }
        if (property_codes[i].heading.toString()[0] == 0) {
          a.append(
            '<option class="option25" value="' +
              property_codes[i].value +
              '">' +
              property_codes[i].value +
              " - " +
              property_codes[i].label +
              "</option>"
          );
        }
        if (property_codes[i].heading.toString()[2] == 2) {
          a.append("</optgroup>");
        }
      }
    }

    const div = document.getElementById("bir");
    div.innerHTML += a;
  }

  if (
    orc_no.substring(0, 7) == "2905.11" ||
    orc_no.substring(0, 7) == "2905.12" ||
    orc_no.substring(0, 6) == "2907.3" ||
    orc_no.substring(0, 7) == "2909.29" ||
    orc_no.substring(0, 7) == "2913.00" ||
    orc_no.substring(0, 7) == "2913.02" ||
    orc_no.substring(0, 8) == "2913.04B" ||
    orc_no.substring(0, 8) == "2913.041" ||
    orc_no.substring(0, 7) == "2913.05" ||
    orc_no.substring(0, 7) == "2913.06" ||
    orc_no.substring(0, 7) == "2913.21" ||
    orc_no.substring(0, 8) == "2913.02E" ||
    orc_no.substring(0, 7) == "2913.34" ||
    orc_no.substring(0, 7) == "2913.40" ||
    orc_no.substring(0, 8) == "2913.401" ||
    orc_no.substring(0, 7) == "2913.41" ||
    orc_no.substring(0, 8) == "2913.421" ||
    orc_no.substring(0, 7) == "2913.43" ||
    orc_no.substring(0, 7) == "2913.44" ||
    orc_no.substring(0, 8) == "2913.441" ||
    orc_no.substring(0, 7) == "2913.45" ||
    orc_no.substring(0, 7) == "2913.21" ||
    orc_no.substring(0, 7) == "2913.46" ||
    orc_no.substring(0, 7) == "2913.47" ||
    orc_no.substring(0, 7) == "2913.48" ||
    orc_no.substring(0, 7) == "2913.49" ||
    orc_no.substring(0, 7) == "2913.72" ||
    orc_no.substring(0, 7) == "2915.05" ||
    orc_no.substring(0, 7) == "2921.12" ||
    orc_no.substring(0, 7) == "2921.13" ||
    orc_no.substring(0, 7) == "2921.15" ||
    orc_no.substring(0, 7) == "2921.41" ||
    orc_no.substring(0, 7) == "2921.51" ||
    orc_no.substring(0, 7) == "2921.52" ||
    orc_no.substring(0, 7) == "2925.23" ||
    orc_no.substring(0, 7) == "4549.42" ||
    orc_no.substring(0, 7) == "4549.43" ||
    orc_no.substring(0, 7) == "4549.44" ||
    orc_no.substring(0, 7) == "4549.45" ||
    orc_no.substring(0, 7) == "4549.46" ||
    orc_no.substring(0, 7) == "4549.62" ||
    orc_no.substring(0, 7) == "4729.61" ||
    orc_no.substring(0, 7) == "2911.01" ||
    orc_no.substring(0, 7) == "2911.02" ||
    orc_no == "2913.00" ||
    orc_no.substring(0, 9) == "2923.1211"
  ) {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append('<option value="5">Stolen/Etc.</option><option value="7">Recovered</option>');
    }
  }

  if (orc_no.substring(0, 7) == "2909.02" || orc_no.substring(0, 7) == "2909.03") {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append('<option value="2">Burned</option>');
    }
  }

  if (
    orc_no.substring(0, 7) == "2915.02" ||
    orc_no.substring(0, 7) == "2915.03" ||
    orc_no.substring(0, 7) == "2915.04" ||
    orc_no.substring(0, 8) == "2915.05B" ||
    orc_no.substring(0, 7) == "2915.06" ||
    orc_no.substring(0, 7) == "2915.07" ||
    orc_no.substring(0, 8) == "2915.081" ||
    orc_no.substring(0, 8) == "2915.082" ||
    orc_no.substring(0, 7) == "2915.09" ||
    orc_no.substring(0, 8) == "2915.091" ||
    orc_no.substring(0, 8) == "2915.092" ||
    orc_no.substring(0, 8) == "2915.094" ||
    orc_no.substring(0, 7) == "2915.10" ||
    orc_no.substring(0, 7) == "2915.11" ||
    orc_no.substring(0, 7) == "2915.12" ||
    orc_no.substring(0, 7) == "2915.13"
  ) {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append('<option value="6">Seized</option>');
    }
  }

  if (isDrugOffense(orc_no)) {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append('<option value="1">None</option><option value="6">Seized</option>');
    }
  }

  if (orc_no.substring(0, 7) == "2925.12" || orc_no.substring(0, 7) == "2925.14") {
    $("#otuzbir").prop("disabled", true);
  }

  if (orc_no.substring(0, 7) == "2925.12") {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append('<option value="1">None</option><option value="6">Seized</option>');
    }
  }

  if (orc_no.substring(0, 7) == "2925.22" || orc_no.substring(0, 7) == "2925.37") {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append(
        '<option value="3">Counterfeited/Forged</option><option value="6">Seized</option><option value="7">Recovered</option>'
      );
    }
  }

  if (
    orc_no.substring(0, 7) == "2909.08" ||
    orc_no.substring(0, 7) == "2909.09" ||
    orc_no.substring(0, 8) == "2909.101" ||
    orc_no.substring(0, 7) == "2913.30" ||
    orc_no.substring(0, 7) == "2913.31" ||
    orc_no.substring(0, 7) == "2913.32" ||
    orc_no.substring(0, 7) == "2913.33"
  ) {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").append(
        '<option value="3">Counterfeited/Forged</option><option value="6">Seized</option><option value="7">Recovered</option>'
      );
    }
  }

  if (
    orc_no.substring(0, 7) == "2909.07" ||
    orc_no.substring(0, 7) == "2909.10" ||
    orc_no.substring(0, 7) == "2911.31" ||
    orc_no.substring(0, 7) == "2911.32" ||
    orc_no.substring(0, 7) == "4511.17" ||
    orc_no.substring(0, 7) == "2909.05" ||
    orc_no.substring(0, 7) == "2909.06"
  ) {
    $("#property_type").empty();
    if (attempted_completed == "A") {
      $("#property_type").append('<option value="1">None</option><option value="U">Unknown</option>');
    } else {
      $("#property_type").empty();
      $("#property_type").append('<option value="4">Destroyed/Damaged/Vandalized</option>');
    }
  }

  $("#property_type").selectpicker("refresh");
  $("#bir").selectpicker("refresh");

  checkRequiredFields();
}

function drugDivCanBeShown() {
  return (
    isDrugOffense(orc_no) &&
    (($("#property_type").val() == "1" && attempted_completed == "A") ||
      ($("#property_type").val() == "6" && attempted_completed == "C") ||
      $("#bir").val() == "31")
  );
}

function vehicleDivCanBeShown() {
  const propertyType = $("#bir").val() || "";
  return ["36", "38", "39", "42", "43"].includes(propertyType.toString());
}

function checkDrugFields() {
  if (drugDivCanBeShown()) {
    $("#drug_div").show();
  } else {
    $("#drug_div").hide();
    $("#drug_type").val("");
    $("#drug_quantity").val("");
    $("#drug_measure").val("");
  }

  if (isDrugOffense(orc_no)) {
    if ($("#property_type").val() == "1") {
      $("#drug_measure").empty();
      $("#drug_measure").append('<option class="option25" value="NS">Not Seized</option>');
      $("#drug_quantity").prop("readonly", true);
      $("#drug_quantity").val("0");
      $("#onbes").prop("readonly", true);
    } else {
      $("#onbes").prop("disabled", false);
      $("#drug_quantity").prop("readonly", false);
      $("#drug_quantity").val("");
      drug_quantity_init();
      $("#drug_measure").val("");
      $("#drug_measure").prop("readonly", false);
    }
  }

  $("#drug_measure").selectpicker("refresh");
  $("#drug_type").selectpicker("refresh");
}

function checkVehicleFields() {
  if (vehicleDivCanBeShown()) {
    $("#stolen_div").show();
    $("#monor_no_div").show();
    $("#name_search_vehicle").show();
  } else {
    $("#stolen_div").hide();
    $("#monor_no_div").hide();
    $("#name_search_vehicle").hide();
    $("#vehicle_specs").hide();
    $("#stolen").selectpicker("val", "");
    $("#search_input_vehicle").val("");
    $("#monor_no").selectpicker("val", "");
    $("#plate").selectpicker("val", "");
    $("#register").val("");
    $("#reg_year").val("");
    $("#plate").val("");
    $("#veh_year").val("");
    $("#plate").val("");
    $("#make").val("");
    $("#model").val("");
    $("#color").val("");
    $("#monor_no").val("");
    $("#stolen").val("");
    $("#towed_by").val("");
    $("#towed_address").val("");
    $("#vehicle_VIN").val("");
    $("#name_hide_vehicle").hide();
  }
}

function checkRequiredFields() {
  if ($("#property_type").val() == "7") {
    // IF type of loss is recovered
    if (typeof "pageIsReadOnly" !== "undefined" && !pageIsReadOnly) {
      $("#date_recovered").prop("required", true);
    }

    $("#lbl-date-recovered").addClass("required");
    $("#date_recovered_div").show();
  } else {
    $("#date_recovered").prop("required", false);
    $("#lbl-date-recovered").removeClass("required");
    $("#date_recovered_div").hide();
  }

  let propertyValueShouldBeDisabled = false;

  const selectedDescription = $("#bir.selectpicker").val();

  if (isDrugOffense(orc_no) && $("#property_type").val() == "6" && attempted_completed == "C") {
    propertyValueShouldBeDisabled = true;
    $("#prop_value").val("");
    $("#prop_value").prop("required", false);
    $("#prop_class").removeClass("required");
  } else {
    $("#prop_value").prop("required", true);
    $("#prop_class").addClass("required");
  }

  if (selectedDescription?.some((p) => ["2", "5", "6", "62", "66"].includes(p))) {
    $("#prop_value").val(0);
    propertyValueShouldBeDisabled = true;
  }

  $("#prop_value").prop("readonly", propertyValueShouldBeDisabled);

  if (typeof isReadOnlyPropertyValue !== "undefined" && isReadOnlyPropertyValue) {
    $("#prop_value").prop("readonly", true).prop("required", false).prev().removeClass("required");
  }
}

function checkPropertyFields() {
  checkDrugFields();
  checkVehicleFields();
  checkRequiredFields();
}

$("#bir.selectpicker").change(function () {
  if (document.getElementById("nibrs")?.value == "Y") {
    checkPropertyFields();
  }
  $(".selectpicker").selectpicker("refresh");
});

$("#nibrs").change(function () {
  if (document.getElementById("nibrs")?.value == "Y") {
    $("#property_type").empty();
    oibrs_property();
  }
  if (document.getElementById("nibrs")?.value == "N") {
    $("#property_type").empty();
    $("#property_type").append(
      '<option value="1">None</option>option value="2">Burned</option><option value="3">Counterfeited/Forged</option><option value="4">Destroyed/Damaged/Vandalized</option><option value="5">Stolen/Etc.</option>	<option value="7">Recovered</option><option value="U">Unknown</option>'
    );
    $("#property_type").selectpicker("refresh");
  }

  checkRequiredFields();
});

$("#property_type").change(function () {
  if (document.getElementById("nibrs")?.value == "Y") {
    $("#bir").selectpicker("val", "");
  }
  checkPropertyFields();
});
