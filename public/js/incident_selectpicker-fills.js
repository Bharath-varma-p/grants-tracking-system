$("#almost_there").text("Peel9 preparing your form. Please hang tight");
function print_filter(filter) {
  var f = eval(filter);
  if (typeof f.length != "undefined") {
  } else {
  }
  if (typeof f.top != "undefined") {
    f = f.top(Infinity);
  } else {
  }
  if (typeof f.dimension != "undefined") {
    f = f
      .dimension(function (d) {
        return "";
      })
      .top(Infinity);
  } else {
  }
}

var loc_type_data = [
  { label: "RESIDENTIAL STRUCTURES", heading: 1, value: null },
  { label: "Single Family Home", heading: 0, value: "01" },
  { label: "Multiple Dwelling", heading: 0, value: "02" },
  { label: "Residential Facility", heading: 0, value: "03" },
  { label: "Other Residential", heading: 0, value: "04" },
  { label: "Garage/Shed", heading: 0.2, value: "05" },
  { label: "PUBLIC ACCESS BUILDINGS", heading: 1, value: null },
  { label: "Transit Facility", heading: 0, value: "06" },
  { label: "Government Office", heading: 0, value: "07" },
  { label: "School", heading: 0, value: "08" },
  { label: "College", heading: 0, value: "09" },
  { label: "Library", heading: 0, value: 67 },
  { label: "Church", heading: 0, value: 10 },
  { label: "Hospital", heading: 0, value: 11 },
  { label: "Jail/Prison", heading: 0, value: 12 },
  { label: "Parking Garage", heading: 0, value: 13 },
  { label: "Community Center", heading: 0, value: 68 },
  {
    label: "Other Public Access Building Commercial Services",
    heading: 0,
    value: 14,
  },
  { label: "COMMERCIAL SERVICES", heading: 1, value: null },
  { label: "Auto Shop", heading: 0, value: 15 },
  { label: "Financial Institution", heading: 0, value: 16 },
  { label: "Barber/Beauty Shop", heading: 0, value: 17 },
  { label: "Hotel/Motel", heading: 0, value: 18 },
  { label: "Dry Cleaners/Laundry", heading: 0, value: 19 },
  { label: "Professional Office", heading: 0, value: 20 },
  { label: "Doctor’s Office", heading: 0, value: 21 },
  { label: "Other Business Office", heading: 0, value: 22 },
  { label: "Recreation/Entertainment Center", heading: 0, value: 23 },
  { label: "Amusement Park", heading: 0, value: 54 },
  { label: "Rental Storage Facility", heading: 0, value: 24 },
  { label: "ATM Machine Separate from Bank", heading: 0, value: 56 },
  { label: "Daycare Facility", heading: 0, value: 59 },
  { label: "Other Commercial Service Location", heading: 0.2, value: 25 },
  { label: "RETAIL", heading: 1, value: null },
  { label: "Bar", heading: 0, value: 26 },
  { label: "Buy/Sell/Trade Shop", heading: 0, value: 27 },
  { label: "Restaurant", heading: 0, value: 28 },
  { label: "Gas Station", heading: 0, value: 29 },
  { label: "Auto Sales Lot", heading: 0, value: 30 },
  { label: "Jewelry Store", heading: 0, value: 31 },
  { label: "Clothing Store", heading: 0, value: 32 },
  { label: "Drugstore", heading: 0, value: 33 },
  { label: "Liquor Store", heading: 0, value: 34 },
  { label: "Shopping Mall", heading: 0, value: 35 },
  { label: "Sporting Goods", heading: 0, value: 36 },
  { label: "Grocery/Supermarket", heading: 0, value: 37 },
  { label: "Variety/Convenience Store", heading: 0, value: 38 },
  { label: "Department/Discount Store", heading: 0, value: 39 },
  { label: "Other Retail Store", heading: 0, value: 40 },
  { label: "Factory/Mill/Plant  ", heading: 0, value: 41 },
  { label: "Other Building", heading: 0.2, value: 42 },
  { label: "OUTSIDE", heading: 1, value: null },
  { label: "Yard", heading: 0, value: 43 },
  { label: "Construction Site", heading: 0, value: 44 },
  { label: "Lake/Waterway", heading: 0, value: 45 },
  { label: "Field/Woods", heading: 0, value: 46 },
  { label: "Street", heading: 0, value: 47 },
  { label: "Parking Lot", heading: 0, value: 48 },
  { label: "Park/Playground", heading: 0, value: 49 },
  { label: "Cemetery", heading: 0, value: 50 },
  { label: "Public Transit Vehicle", heading: 0, value: 51 },
  { label: "Other Vehicle", heading: 0, value: 70 },
  { label: "Camp/Campground", heading: 0, value: 57 },
  { label: "Rest Area", heading: 0, value: 64 },
  { label: "Other outside Location", heading: 0.2, value: 52 },
  { label: "OTHER", heading: 1, value: null },
  { label: "Abandoned/Condemned Structure", heading: 0, value: 53 },
  { label: "Arena/Stadium/Fairgrounds/Coliseum  ", heading: 0, value: 55 },
  { label: "Cargo Container", heading: 0, value: 58 },
  { label: "Dock/Wharf/Freight/Modal Terminal", heading: 0, value: 60 },
  { label: "Farm Facility", heading: 0, value: 61 },
  { label: "Gambling Facility/Casino/Race Track", heading: 0, value: 62 },
  { label: "Military Installation", heading: 0, value: 63 },
  { label: "Shelter-Mission/Homeless  ", heading: 0, value: 65 },
  { label: "Tribal Lands", heading: 0, value: 66 },
  { label: "Cyberspace", heading: 0, value: 69 },
  { label: "Other Location", heading: 0, value: 77 },
];

function residential_fill() {
  var $select;
  $select = $("select", {
    class: "selectpicker",
    "data-live-search": "true",
  });
  var b = [];

  b.push(' <option class="option" style="margin-top: 0px;"></option>');

  for (iw = 0; iw < loc_type_data.length; iw++) {
    if (loc_type_data[iw].heading.toString()[0] == 1) {
      b.push('<optgroup class="heading_style" label="' + loc_type_data[iw].label + '">');
    }
    if (loc_type_data[iw].heading.toString()[0] == 0) {
      b.push(
        '<option class="option25" value="' +
          loc_type_data[iw].value +
          '">' +
          loc_type_data[iw].value +
          " - " +
          loc_type_data[iw].label +
          "</option>"
      );
    }
    if (loc_type_data[iw].heading.toString()[2] == 2) {
      b.push("</optgroup>");
    }
  }

  var div = document.getElementById("locum");
  if (div) div.innerHTML += b;
  var divLocationType = document.getElementById("location_type");
  if (divLocationType) divLocationType.innerHTML += b;
  $("#locum").selectpicker("refresh");
  $("#location_type").selectpicker("refresh");
}

function clearence_fill() {
  var cas_clearence_data = [
    { label: "Death of Offender", value: "A" },
    { label: "Prosecution Declined", value: "B" },
    { label: "In Custody of Other Jurisdiction", value: "C" },
    { label: "Victim Refuses to Cooperate", value: "D" },
    { label: "Juvenile/No Custody", value: "E" },
    { label: "Cleared By Arrest – Adult", value: "F" },
    { label: "Cleared By Arrest – Juvenile", value: "G" },
    { label: "Warrant Issued", value: "H" },
    { label: "Investigation Pending", value: "I" },
    { label: "Closed", value: "J" },
    { label: "Unfounded", value: "K" },
    { label: "Unknown", value: "U" },
  ];
  var d = [];

  d.push(' <option disabled class="option" style="margin-top: 0px;"></option>');

  for (isi = 0; isi < cas_clearence_data.length; isi++) {
    d.push(
      '<option class="option25" value="' +
        cas_clearence_data[isi].value +
        '">' +
        cas_clearence_data[isi].value +
        " - " +
        cas_clearence_data[isi].label +
        "</option>"
    );
  }

  var div = document.getElementById("case_clearences");
  div.innerHTML += d;

  //fill the seelctpicker values

  $("#case_clearences .selectpicker").change(function () {
    var slecteditem4 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("case_clearences").value = slecteditem4;
  });

  $("#case_clearences").selectpicker("refresh");
}
var larceny_type_data = [
  { label: "Pocket-Picking", value: "23A" },
  { label: "Purse-Snatching", value: "23B" },
  { label: "Shoplifting", value: "23C" },
  { label: "Theft from Building", value: "23D" },
  { label: "Theft from Coin-Operated Machine or Device", value: "23E" },
  { label: "Theft from Motor Vehicle", value: "23F" },
  { label: "Theft of Motor Vehicle Parts or Accessories", value: "23G" },
  { label: "Motor Vehicle Theft", value: "240" },
  { label: "All Other Larceny", value: "23H" },
  { label: "Commercial Sex Acts", value: "64A" },
  { label: "Involuntary Servitude", value: "64B" },
];
function larceny_fill() {
  var e = [];
  $("#theft_codes_2").empty();
  $("#larceny_type_search").empty();
  e.push(' <option disabled class="option" style="margin-top: 0px;"></option>');

  for (izi = 0; izi < larceny_type_data.length; izi++) {
    if (larceny_type_data[izi].value == "64A" || larceny_type_data[izi].value == "64B") {
      e.push(
        '<option class="option25 commercial_acts" style="display:none" value="' +
          larceny_type_data[izi].value +
          '">' +
          larceny_type_data[izi].value +
          " - " +
          larceny_type_data[izi].label +
          "</option>"
      );
    }
    e.push(
      '<option class="option25 non_commercial" value="' +
        larceny_type_data[izi].value +
        '">' +
        larceny_type_data[izi].value +
        " - " +
        larceny_type_data[izi].label +
        "</option>"
    );
  }
  $("#theft_codes_2").html(e).selectpicker("refresh");
  $("#larceny_type_search").html(e).selectpicker("refresh");
}
var criminal_activity_data = [
  { label: "Buying/Receiving", value: "B" },
  { label: "Cultivating/Manufacturing/Publishing", value: "C" },
  { label: "Distributing/Selling", value: "D" },
  { label: "Exploiting Children", value: "E" },
  { label: "Other Gang", value: "G" },
  { label: "Juvenile Gang", value: "J" },
  { label: "No Gang Involvement", value: "N" },
  { label: "Operating/Promoting/Assisting", value: "O" },
  { label: "Possessing/Concealing", value: "P" },
  { label: "Transporting/Transmitting/Importing", value: "T" },
  { label: "Using/Consuming", value: "U" },
  { label: "Simple/Gross Neglect", value: "A" },
  { label: "Organized Abuse", value: "F" },
  { label: "Intentional Abuse and Torture", value: "I" },
  { label: "Animal Sexual Abuse (Bestiality)", value: "S" },
];
function criminal_fill() {
  var g = [];

  for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
    g.push(
      '<option class="option25" value="' +
        criminal_activity_data[ibi].value +
        '">' +
        criminal_activity_data[ibi].value +
        " - " +
        criminal_activity_data[ibi].label +
        "</option>"
    );
  }

  var div = document.getElementById("criminal_activity");
  div.innerHTML += g;
  $("#criminal_activity").selectpicker("refresh");
}
var type_of_weapon_data = [
  { label: "Firearm ", value: "11" },
  { label: "Handgun ", value: "12" },
  { label: "Automatic Handgun ", value: "12A" },
  { label: "Rifle", value: "13" },
  { label: "Fully Automatic Rifle", value: "13A" },
  { label: "Other Fully Automatic Firearm", value: "13B" },
  { label: "Shotgun", value: "14" },
  { label: "Other Firearm", value: "15" },
  { label: "Semi-Automatic Sporting Rifle", value: "15A" },
  { label: "Semi-Automatic Assault Firearm", value: "15B" },
  { label: "Machine Pistols", value: "15C" },
  { label: "Imitation Firearm", value: "16" },
  { label: "Simulated Firearm", value: "17" },
  { label: "BB and Pellet Guns", value: "18" },
  { label: "Knife/Cutting Instrument", value: "20" },
  { label: "Blunt Object", value: "30" },
  { label: "Motor Vehicle", value: "35" },
  { label: "Personal Weapons", value: "40" },
  { label: "Poison", value: "50" },
  { label: "Explosives", value: "60" },
  { label: "Fire/Incendiary Device", value: "65" },
  { label: "Drugs/Narcotics/Sleeping Pills", value: "70" },
  { label: "Other Weapon", value: "80" },
  { label: "Asphyxiation", value: "85" },
  { label: "None", value: "99" },
  { label: "Unknown", value: "U" },
];
function weapon_fill() {
  var x = [];
  // x.push(' <option disabled class="option" style="margin-top: 0px;"></option>');
  for (ib = 0; ib < type_of_weapon_data.length; ib++) {
    x.push(
      '<option class="option25" value="' +
        type_of_weapon_data[ib].value +
        '">' +
        type_of_weapon_data[ib].value +
        " - " +
        type_of_weapon_data[ib].label +
        "</option>"
    );
  }

  var div = document.getElementById("weapon_type");
  div.innerHTML += x;

  //fill the seelctpicker values
  $("#weapon_type").selectpicker("val", "{{weapon_type_2}}");
  $("#weapon_type_div .selectpicker").change(function () {
    var targets3 = [];
    $.each($(this).find("option:selected"), function () {
      targets3.push($(this).val());
    });
    document.getElementById("weapon_type_2").value = targets3;
  });

  $("#weapon_type").selectpicker("refresh");
}

function hate_fill() {
  var hate_type_data = [
    { label: "Race/Ethnicity/Ancestry Bias", heading: 1, value: null },
    { label: "Anti-White", heading: 0, value: 11 },
    { label: "Anti-Black or African American", heading: 0, value: 12 },
    { label: "Anti-American Indian or Alaskan Native", heading: 0, value: 13 },
    { label: "Anti-Asian", heading: 0, value: 14 },
    { label: "Anti-Multiple Races, Gro3up", heading: 0, value: 15 },
    {
      label: "Anti-Native Hawaiian or Other Pacific Islander",
      heading: 0,
      value: 16,
    },
    { label: "Anti-Arab", heading: 0, value: 31 },
    { label: "Anti-Hispanic or Latino", heading: 0, value: 32 },
    { label: "Anti-Other Race/Ethnicity/Ancestry", heading: 0.2, value: 33 },
    { label: "Religious Bias", heading: 1, value: null },
    { label: "Anti-Jewish", heading: 0, value: 21 },
    { label: "Anti-Catholic", heading: 0, value: 22 },
    { label: "Anti-Protestant", heading: 0, value: 23 },
    { label: "Anti-Islamic (Moslem)", heading: 0, value: 24 },
    { label: "Anti-Other Religion", heading: 0, value: 25 },
    { label: "Anti-Multiple Religions, Group", heading: 0, value: 26 },
    { label: "Anti-Atheism/Agnosticism", heading: 0, value: 27 },
    { label: "Anti-Mormon", heading: 0, value: 28 },
    { label: "Anti-Jehovah’s Witness", heading: 0, value: 29 },
    {
      label: "Anti-Eastern Orthodox (Greek, Russian, etc.)",
      heading: 0,
      value: 81,
    },
    { label: "Anti-Other Christian", heading: 0, value: 82 },
    { label: "Anti-Buddhist", heading: 0, value: 83 },
    { label: "Anti-Hindu", heading: 0, value: 84 },
    { label: "Anti-Sikh", heading: 0.2, value: 85 },
    { label: "Sexual Orientation Bias", heading: 1, value: null },
    { label: "Anti-Male Homosexual (Gay)", heading: 0, value: 41 },
    { label: "Anti-Female Homosexual (Lesbian)", heading: 0, value: 42 },
    {
      label: "Anti-Homosexual (Gay and Lesbian), Bisexual, or Transgender (Mixed Group)",
      heading: 0,
      value: 43,
    },
    { label: "Anti-Heterosexual", heading: 0, value: 44 },
    { label: "Anti-Bisexual", heading: 0, value: 45 },
    {
      label: "Other Bias Incident (e.g. Anti-AIDS victim)",
      heading: 0.2,
      value: 50,
    },
    { label: "Disability Bias", heading: 1, value: null },
    { label: "Anti-Physical Disability", heading: 0, value: 51 },
    { label: "Anti-Mental Disability", heading: 0.2, value: 52 },
    { label: "Gender Bias", heading: 1, value: null },
    { label: "Anti-Male", heading: 0, value: 61 },
    { label: "Anti-Female", heading: 0.2, value: 62 },
    { label: "Gender Identity Bias", heading: 1, value: null },
    { label: "Anti-Transgender", heading: 0, value: 71 },
    { label: "Anti-Gender Non-Conforming", heading: 0, value: 72 },
  ];

  var fo = [];
  for (iz = 0; iz < hate_type_data.length; iz++) {
    if (hate_type_data[iz].heading.toString()[0] == 1) {
      fo.push('<optgroup class="heading_style" label="' + hate_type_data[iz].label + '">');
    }
    if (hate_type_data[iz].heading.toString()[0] == 0) {
      fo.push(
        '<option class="option25" value="' +
          hate_type_data[iz].value +
          '">' +
          hate_type_data[iz].value +
          " - " +
          hate_type_data[iz].label +
          "</option>"
      );
    }
    if (hate_type_data[iz].heading.toString()[2] == 2) {
      fo.push("</optgroup>");
    }
  }

  var div = document.getElementById("hate_type");
  div.innerHTML += fo;
  $("#hate_type_div .selectpicker").change(function () {
    var slecteditem6_1 = $(this).find("option:selected").val(); //attr('id');

    document.getElementById("hate_type_2").value = slecteditem6_1;
  });
  $("#hate_type").selectpicker("refresh");
}

function entry_fill() {
  var entry_tfa_codes_data = [
    { label: "Motor Running/Keys Left in Car", value: "01" },
    { label: "Unlocked", value: "02" },
    { label: "Duplicate Key Used", value: "03" },
    { label: "Window Broken", value: "04" },
    { label: "Towed", value: "05" },
    { label: "Hot Wire", value: "06" },
    { label: "Slim Jim/Coat Hanger", value: "07" },
    { label: "Tumblers Removed", value: "08" },
    { label: "Column Peeled", value: "09" },
    { label: "Ignition Peeled", value: "10" },
    { label: "Unknown", value: "U" },
  ];

  $(document).ready(function () {
    if (
      $("#entry_method_2").val() == "01" ||
      $("#entry_method_2").val() == "02" ||
      $("#entry_method_2").val() == "03" ||
      $("#entry_method_2").val() == "04" ||
      $("#entry_method_2").val() == "05" ||
      $("#entry_method_2").val() == "06" ||
      $("#entry_method_2").val() == "07" ||
      $("#entry_method_2").val() == "08" ||
      $("#entry_method_2").val() == "09" ||
      $("#entry_method_2").val() == "10" ||
      $("#entry_method_2").val() == "U"
    ) {
      $("#entry_method_div").show();
      $("#forced_div").show();
    } else {
      $("#entry_method_div").hide();
      $("#forced_div").hide();

      $("#entry_method").selectpicker("val", "");
      $("#forced").selectpicker("val", "");
    }
  });
}

function modus_fill() {
  var method_of_operation_data = [
    { label: "ACCOMPLICE", heading: 1, value: null },
    { label: "Accomplice Drives Car ", heading: 0, value: "01" },
    { label: "Accomplice Takes Part in Crime ", heading: 0.2, value: "02" },
    { label: "ALARM DISABLING", heading: 1, value: null },
    { label: "Alarm Cut ", heading: 0, value: "03" },
    { label: "Alarm Disconnected ", heading: 0, value: "04" },
    { label: "Animal with Suspect ", heading: 0, value: "05" },
    { label: "Bound and Gagged Victim ", heading: 0.2, value: "06" },
    { label: "CAR RELATED", heading: 1, value: null },
    { label: "Car - Abandoned ", heading: 0, value: "07" },
    { label: "Car - Disables Victim's ", heading: 0, value: "08" },
    { label: "Car - Hides in Victim's ", heading: 0, value: "09" },
    { label: "Car - Takes Victim's ", heading: 0, value: 10 },
    { label: "Car - Takes Victim's Keys ", heading: 0.2, value: 11 },
    { label: "GUN", heading: 1, value: null },
    { label: "Carries Gun ", heading: 0.2, value: 12 },
    { label: "ENTRY MODE", heading: 1, value: null },
    { label: "Disturbs Very Little ", heading: 0, value: 13 },
    { label: "Familiar With Premises ", heading: 0, value: 16 },
    { label: "Fingerprints - Avoids ", heading: 0, value: 17 },
    { label: "Gentlemanly ", heading: 0, value: 18 },
    { label: "Handcuffed Victim ", heading: 0, value: 19 },
    { label: "Impersonates Officer ", heading: 0, value: 20 },
    { label: "Neatly Dressed ", heading: 0, value: 21 },
    { label: "Pretended to be Delivery Man ", heading: 0, value: 22 },
    { label: "Pretended to be Lost ", heading: 0, value: 23 },
    { label: "Profane Language ", heading: 0, value: 24 },
    { label: "Ransacks Premises ", heading: 0, value: 25 },
    { label: "Rings Doorbell or Knocks ", heading: 0, value: 26 },
    { label: "Safe Broken Into ", heading: 0, value: 27 },
    { label: "Safe Carried Away ", heading: 0, value: 28 },
    { label: "Says Nothing ", heading: 0, value: 29 },
    { label: "Solicited Information ", heading: 0, value: 30 },
    { label: "Solicited Subscription ", heading: 0, value: 31 },
    { label: "Stole Key ", heading: 0.2, value: 32 },
    { label: "TAKING", heading: 1, value: null },
    { label: "Takes Only Jewelry ", heading: 0, value: 33 },
    { label: "Takes Only Money ", heading: 0, value: 34 },
    { label: "Takes Only Special Items ", heading: 0, value: 35 },
    { label: "Telephones Victim ", heading: 0, value: 36 },
    { label: "Telephone Wire Cut ", heading: 0.2, value: 37 },
    { label: "USING", heading: 1, value: null },
    { label: "Used Auto ", heading: 0, value: 38 },
    { label: "Used Bike ", heading: 0, value: 39 },
    { label: "Used Light ", heading: 0, value: 40 },
    { label: "Used Matches ", heading: 0, value: 41 },
    { label: "Used Other Illumination ", heading: 0, value: 42 },
    { label: "Used Motorcycle ", heading: 0, value: 43 },
    { label: "Used Narcotics ", heading: 0, value: 44 },
    { label: "Used Tobacco", heading: 0.2, value: 45 },
    { label: "WEARING", heading: 1, value: null },
    { label: "Wore Gloves ", heading: 0, value: 46 },
    { label: "Wore Silk Stocking ", heading: 0, value: 47 },
    { label: "Wore Ski Mask ", heading: 0, value: 48 },
    { label: "Wore Other Mask ", heading: 0, value: 49 },
    { label: "Wore Wig ", heading: 0.2, value: 88 },
    { label: "SHOPLIFTING", heading: 1, value: null },
    { label: "Shoplifting - Large Purse ", heading: 0, value: 52 },
    { label: "Shoplifting - Under Coat ", heading: 0, value: 53 },
    { label: "Shoplifting - Under Dress ", heading: 0, value: 54 },
    { label: "Shoplifting - Inside Pants ", heading: 0, value: 55 },
    { label: "Shoplifting - Booster Box ", heading: 0, value: 56 },
    { label: "Shoplifting - Used Container ", heading: 0, value: 57 },
    { label: "Shoplifting - Price Switch ", heading: 0, value: 58 },
    { label: "Shoplifting - Wears Item ", heading: 0, value: 59 },
    { label: "Shoplifting - General ", heading: 0.2, value: 60 },
    { label: "CHECKS/CREDIT", heading: 1, value: null },
    { label: "Uses Bad Checks - NSF ", heading: 0, value: 61 },
    { label: "Bad Checks - Closed Account ", heading: 0, value: 62 },
    { label: "Bad Checks - Stolen ", heading: 0, value: 63 },
    { label: "Credit Cards - Stolen ", heading: 0, value: 64 },
    { label: "Credit Cards - Over Limit ", heading: 0, value: 65 },
    { label: "Alters Currency/Checks/Money Order ", heading: 0.2, value: 66 },
    { label: "OTHER", heading: 1, value: null },
    { label: "Does Not Take Jewelry ", heading: 0, value: 14 },
    { label: "Does Not Take Money ", heading: 0, value: 15 },
    { label: "Acts as Prostitute or John ", heading: 0, value: 68 },
    { label: "Threatens Victim ", heading: 0, value: 70 },
    { label: "Uses Ropes ", heading: 0, value: 71 },
    { label: "Writes Threatening Letter ", heading: 0, value: 73 },
    { label: "Defecates on Premises ", heading: 0, value: 75 },
    { label: "Sexual Fetishist ", heading: 0, value: 80 },
    { label: "Lures Victim with Money/Candy/Food ", heading: 0, value: 85 },
    { label: "Uses Obscene Material ", heading: 0, value: 86 },
    { label: "Impersonates Family Member ", heading: 0, value: 87 },
    { label: "Works Alone ", heading: 0, value: 50 },
    { label: "Lures Victim - Newspaper Ads ", heading: 0, value: 51 },
    { label: "Other", heading: 0.2, value: 89 },
  ];
  var f = [];

  for (ici = 0; ici < method_of_operation_data.length; ici++) {
    if (method_of_operation_data[ici].heading.toString()[0] == 1) {
      f.push('<optgroup class="heading_style" label="' + method_of_operation_data[ici].label + '">');
    }
    if (method_of_operation_data[ici].heading.toString()[0] == 0) {
      f.push(
        '<option class="option25" value="' +
          method_of_operation_data[ici].value +
          '">' +
          method_of_operation_data[ici].value +
          " - " +
          method_of_operation_data[ici].label +
          "</option>"
      );
    }
    if (method_of_operation_data[ici].heading.toString()[2] == 2) {
      f.push("</optgroup>");
    }
  }

  var div = document.getElementById("method_of_operation");
  div.innerHTML += f;

  $("#method_of_operation").selectpicker("val", "{{ method_of_operation_2 }}");
}

function criminalActivityFillGJN() {
  $("#criminal_activity").empty();
  var a = $("#criminal_activity");
  for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
    if (
      criminal_activity_data[ibi].value == "G" ||
      criminal_activity_data[ibi].value == "J" ||
      criminal_activity_data[ibi].value == "N"
    ) {
      a.append(
        '<option class="option25" value="' +
          criminal_activity_data[ibi].value +
          '">' +
          criminal_activity_data[ibi].value +
          " - " +
          criminal_activity_data[ibi].label +
          "</option>"
      );
    }
  }
  $("#criminal_activity_div").show();
}

function weaponFillExcluding_17_99() {
  $("#weapon_type").empty();
  var b = $("#weapon_type");
  for (ib = 0; ib < type_of_weapon_data.length; ib++) {
    if (type_of_weapon_data[ib].value != "99" && type_of_weapon_data[ib].value != "17") {
      b.append(
        '<option class="option25" value="' +
          type_of_weapon_data[ib].value +
          '">' +
          type_of_weapon_data[ib].value +
          " - " +
          type_of_weapon_data[ib].label +
          "</option>"
      );
    }
  }
}

function select_divs() {
  $(".selectpicker").change(function () {
    if (
      ($("#bir").val().substring(0, 7) == "2911.11" && ($("#locum").val() == "18" || $("#locum").val() == "24")) ||
      ($("#bir").val().substring(0, 7) == "2911.12" && ($("#locum").val() == "18" || $("#locum").val() == "24")) ||
      ($("#bir").val().substring(0, 7) == "2911.13" && ($("#locum").val() == "18" || $("#locum").val() == "24"))
    ) {
      $("#premise_div").show();
    } else {
      $("#premise_div").hide();
      $("#premise").selectpicker("val", "");
    }
  });
  $("#case_clearences .selectpicker").change(function () {
    var slecteditem4 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("case_clearences").value = slecteditem4;
  });
  $("#loc_type_div .selectpicker").change(function () {
    var slecteditem_5 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("locum2").value = slecteditem_5;
  });

  $("#premise_div .selectpicker").change(function () {
    var slecteditem_4 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("premise_2").value = slecteditem_4;
  });

  $("#iki .selectpicker").change(function () {
    var slecteditem = $(this).find("option:selected").val(); //attr('id');
    var slected_local = $(this).find("option:selected").attr("local_code");
    document.getElementById("orc_no").value = slecteditem;
    document.getElementById("local_code").value = slected_local;

    if ($("#bir").val().substring(0, 3) == "959") {
      $("#criminal_activity").empty();
      var a = $("#criminal_activity");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "A" ||
          criminal_activity_data[ibi].value == "F" ||
          criminal_activity_data[ibi].value == "I" ||
          criminal_activity_data[ibi].value == "S"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }
      a.selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 7) == "2903.01" ||
      $("#bir").val().substring(0, 7) == "2903.02" ||
      $("#bir").val().substring(0, 7) == "2903.03" ||
      $("#bir").val().substring(0, 7) == "2903.04" ||
      $("#bir").val().substring(0, 8) == "2903.041" ||
      $("#bir").val().substring(0, 7) == "2907.02" ||
      $("#bir").val().substring(0, 7) == "2907.03" ||
      $("#bir").val().substring(0, 7) == "2907.05" ||
      $("#bir").val().substring(0, 7) == "2907.06"
    ) {
      $("#criminal_activity").empty();
      $("#criminal_activity_div").show();
      $("#weapon_type").empty();

      var a = $("#criminal_activity");
      var b = $("#weapon_type");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }
      if ($("#attempted_completed").val() == "C") {
        for (ib = 0; ib < type_of_weapon_data.length; ib++) {
          if (type_of_weapon_data[ib].value != "99" && type_of_weapon_data[ib].value != "17") {
            b.append(
              '<option class="option25" value="' +
                type_of_weapon_data[ib].value +
                '">' +
                type_of_weapon_data[ib].value +
                " - " +
                type_of_weapon_data[ib].label +
                "</option>"
            );
          }
        }
      }

      if ($("#attempted_completed").val() == "A") {
        for (ib = 0; ib < type_of_weapon_data.length; ib++) {
          if (
            type_of_weapon_data[ib].value != "16" &&
            type_of_weapon_data[ib].value != "17" &&
            type_of_weapon_data[ib].value != "18" &&
            type_of_weapon_data[ib].value != "40" &&
            type_of_weapon_data[ib].value != "80" &&
            type_of_weapon_data[ib].value != "99" &&
            type_of_weapon_data[ib].value != "U"
          ) {
            b.append(
              '<option class="option25" value="' +
                type_of_weapon_data[ib].value +
                '">' +
                type_of_weapon_data[ib].value +
                " - " +
                type_of_weapon_data[ib].label +
                "</option>"
            );
          }
        }
      }

      if ($("#attempted_completed").val() == "") {
        for (ib = 0; ib < type_of_weapon_data.length; ib++) {
          if (type_of_weapon_data[ib].value != "99" && type_of_weapon_data[ib].value != "17") {
            b.append(
              '<option class="option25" value="' +
                type_of_weapon_data[ib].value +
                '">' +
                type_of_weapon_data[ib].value +
                " - " +
                type_of_weapon_data[ib].label +
                "</option>"
            );
          }
        }
      }

      $("#criminal_activity").selectpicker("refresh");
      $("#weapon_type").selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 6) == "2907.3" ||
      $("#bir").val().substring(0, 7) == "2907.32" ||
      $("#bir").val().substring(0, 7) == "2907.33" ||
      $("#bir").val().substring(0, 7) == "2907.34" ||
      $("#bir").val().substring(0, 8) == "2907.38" ||
      $("#bir").val().substring(0, 7) == "2913.51" ||
      $("#bir").val().substring(0, 8) == "2915.082" ||
      $("#bir").val().substring(0, 8) == "2915.081" ||
      $("#bir").val().substring(0, 7) == "2915.09" ||
      $("#bir").val() == "2921.36A2" ||
      $("#bir").val().substring(0, 7) == "2923.13" ||
      $("#bir").val().substring(0, 7) == "2923.15" ||
      $("#bir").val().substring(0, 7) == "2923.16" ||
      $("#bir").val().substring(0, 7) == "2923.17" ||
      $("#bir").val().substring(0, 7) == "2923.19" ||
      $("#bir").val().substring(0, 7) == "2923.20" ||
      $("#bir").val().substring(0, 7) == "2923.21" ||
      $("#bir").val().substring(0, 7) == "2925.02" ||
      $("#bir").val().substring(0, 7) == "2925.03" ||
      $("#bir").val().substring(0, 7) == "2925.04" ||
      $("#bir").val().substring(0, 7) == "2925.05" ||
      $("#bir").val().substring(0, 7) == "2925.06" ||
      $("#bir").val().substring(0, 7) == "2925.11" ||
      $("#bir").val().substring(0, 7) == "2925.12" ||
      $("#bir").val().substring(0, 7) == "2925.13" ||
      $("#bir").val().substring(0, 7) == "2925.14" ||
      $("#bir").val().substring(0, 7) == "2925.22" ||
      $("#bir").val().substring(0, 7) == "2925.24" ||
      $("#bir").val().substring(0, 7) == "2925.31" ||
      $("#bir").val().substring(0, 7) == "2925.32" ||
      $("#bir").val().substring(0, 7) == "2925.33" ||
      $("#bir").val().substring(0, 7) == "2925.36" ||
      $("#bir").val().substring(0, 7) == "2925.37" ||
      $("#bir").val().substring(0, 7) == "4729.51" ||
      $("#bir").val().substring(0, 7) == "2913.30" ||
      $("#bir").val().substring(0, 7) == "2913.31" ||
      $("#bir").val().substring(0, 7) == "2913.32" ||
      $("#bir").val().substring(0, 7) == "2913.33"
    ) {
      $("#criminal_activity").empty();

      var a = $("#criminal_activity");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "B" ||
          criminal_activity_data[ibi].value == "C" ||
          criminal_activity_data[ibi].value == "D" ||
          criminal_activity_data[ibi].value == "E" ||
          criminal_activity_data[ibi].value == "O" ||
          criminal_activity_data[ibi].value == "P" ||
          criminal_activity_data[ibi].value == "T" ||
          criminal_activity_data[ibi].value == "U"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }
      $("#criminal_activity").selectpicker("refresh");
    }

    if ($("#bir").val().substring(0, 7) == "2911.01" || $("#bir").val().substring(0, 7) == "2911.02") {
      $("#criminal_activity").empty();
      var a = $("#criminal_activity");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }
      $("#criminal_activity").selectpicker("refresh");
    }

    if ($("#bir").val().substring(0, 7) == "2923.42") {
      $("#criminal_activity").empty();
      var a = $("#criminal_activity");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (criminal_activity_data[ibi].value == "G" || criminal_activity_data[ibi].value == "J") {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }
      $("#criminal_activity").selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 7) == "2909.26" ||
      $("#bir").val().substring(0, 7) == "2909.27" ||
      $("#bir").val().substring(0, 7) == "2909.28" ||
      $("#bir").val().substring(0, 7) == "2923.12" ||
      $("#bir").val().substring(0, 8) == "2923.121" ||
      $("#bir").val().substring(0, 8) == "2923.122"
    ) {
      if ($("#bir").val().substring(0, 9) != "2923.1211") {
        $("#criminal_activity").empty();
        $("#weapon_type").empty();

        var a = $("#criminal_activity");
        var b = $("#weapon_type");
        for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
          if (
            criminal_activity_data[ibi].value == "B" ||
            criminal_activity_data[ibi].value == "C" ||
            criminal_activity_data[ibi].value == "D" ||
            criminal_activity_data[ibi].value == "E" ||
            criminal_activity_data[ibi].value == "O" ||
            criminal_activity_data[ibi].value == "P" ||
            criminal_activity_data[ibi].value == "T" ||
            criminal_activity_data[ibi].value == "U"
          ) {
            a.append(
              '<option class="option25" value="' +
                criminal_activity_data[ibi].value +
                '">' +
                criminal_activity_data[ibi].value +
                " - " +
                criminal_activity_data[ibi].label +
                "</option>"
            );
          }
        }

        for (ib = 0; ib < type_of_weapon_data.length; ib++) {
          if (type_of_weapon_data[ib].value != "99") {
            b.append(
              '<option class="option25" value="' +
                type_of_weapon_data[ib].value +
                '">' +
                type_of_weapon_data[ib].value +
                " - " +
                type_of_weapon_data[ib].label +
                "</option>"
            );
          }
        }
      }
    }

    if ($("#bir").val().substring(0, 8) == "2923.123") {
      $("#locum").empty();
      var b = $("#locum");

      for (iw = 0; iw < loc_type_data.length; iw++) {
        if (loc_type_data[iw].value == "07") {
          if (loc_type_data[iw].heading.toString()[0] == 1) {
            b.append('<optgroup class="heading_style" label="' + loc_type_data[iw].label + '">');
          }
          if (loc_type_data[iw].heading.toString()[0] == 0) {
            b.append(
              '<option class="option25" value="' +
                loc_type_data[iw].value +
                '">' +
                loc_type_data[iw].value +
                " - " +
                loc_type_data[iw].label +
                "</option>"
            );
          }
          if (loc_type_data[iw].heading.toString()[2] == 2) {
            b.append("</optgroup>");
          }
        }
      }
      $("#locum").selectpicker("refresh");
    } else {
      $("#locum").empty();
      var b = $("#locum");
      for (iw = 0; iw < loc_type_data.length; iw++) {
        if (loc_type_data[iw].heading.toString()[0] == 1) {
          b.append('<optgroup class="heading_style" label="' + loc_type_data[iw].label + '">');
        }
        if (loc_type_data[iw].heading.toString()[0] == 0) {
          b.append(
            '<option class="option25" value="' +
              loc_type_data[iw].value +
              '">' +
              loc_type_data[iw].value +
              " - " +
              loc_type_data[iw].label +
              "</option>"
          );
        }
        if (loc_type_data[iw].heading.toString()[2] == 2) {
          b.append("</optgroup>");
        }
      }
      $("#locum").selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 7) == "2919.25" ||
      $("#bir").val().substring(0, 7) == "2921.03" ||
      $("#bir").val().substring(0, 7) == "2921.04" ||
      $("#bir").val().substring(0, 7) == "2921.38" ||
      $("#bir").val().substring(0, 7) == "2927.12" ||
      $("#bir").val().substring(0, 7) == "2919.22"
    ) {
      $("#attempted_completed").val("C").selectpicker("refresh");
      $("#criminal_activity").empty();
      var a = $("#criminal_activity");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }

      $("#criminal_activity").selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 7) == "2903.05" ||
      $("#bir").val().substring(0, 7) == "2921.03" ||
      $("#bir").val().substring(0, 7) == "2921.04" ||
      $("#bir").val().substring(0, 7) == "2921.05" ||
      $("#bir").val().substring(0, 7) == "2903.21" ||
      $("#bir").val() == "2921.38C" ||
      $("#bir").val().substring(0, 7) == "2903.21"
    ) {
      $("#attempted_completed").val("C").selectpicker("refresh");
      $("#criminal_activity").empty();
      $("#weapon_type").empty();
      var a = $("#criminal_activity");
      var b = $("#weapon_type");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }

      for (ib = 0; ib < type_of_weapon_data.length; ib++) {
        if (type_of_weapon_data[ib].value != "99" && type_of_weapon_data[ib].value != "17") {
          b.append(
            '<option class="option25" value="' +
              type_of_weapon_data[ib].value +
              '">' +
              type_of_weapon_data[ib].value +
              " - " +
              type_of_weapon_data[ib].label +
              "</option>"
          );
        }
      }

      $("#criminal_activity").selectpicker("refresh");
      $("#weapon_type").selectpicker("refresh");
    }

    if ($("#bir").val().substring(0, 7) == "2903.08") {
      $("#attempted_completed").val("C").selectpicker("refresh");
      $("#criminal_activity").empty();
      $("#criminal_activity_div").show();
      $("#weapon_type").empty();
      var a = $("#criminal_activity");
      var b = $("#weapon_type");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }

      for (ib = 0; ib < type_of_weapon_data.length; ib++) {
        if (type_of_weapon_data[ib].value == "35") {
          b.append(
            '<option class="option25" value="' +
              type_of_weapon_data[ib].value +
              '">' +
              type_of_weapon_data[ib].value +
              " - " +
              type_of_weapon_data[ib].label +
              "</option>"
          );
        }
      }

      $("#criminal_activity").selectpicker("refresh");
      $("#weapon_type").selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 7) == "2903.11" ||
      $("#bir").val().substring(0, 7) == "2903.12" ||
      $("#bir").val().substring(0, 7) == "2903.13" ||
      $("#bir").val().substring(0, 7) == "2903.14" ||
      $("#bir").val().substring(0, 7) == "2903.15" ||
      $("#bir").val().substring(0, 7) == "2903.21" ||
      $("#bir").val().substring(0, 7) == "2903.22" ||
      $("#bir").val().substring(0, 7) == "2903.34" ||
      $("#bir").val() == "2921.38C"
    ) {
      $("#attempted_completed").val("C").selectpicker("refresh");
      $("#criminal_activity").empty();
      $("#criminal_activity_div").show();
      $("#weapon_type").empty();
      var a = $("#criminal_activity");
      var b = $("#weapon_type");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }

      for (ib = 0; ib < type_of_weapon_data.length; ib++) {
        if (type_of_weapon_data[ib].value != "99" && type_of_weapon_data[ib].value != "17") {
          b.append(
            '<option class="option25" value="' +
              type_of_weapon_data[ib].value +
              '">' +
              type_of_weapon_data[ib].value +
              " - " +
              type_of_weapon_data[ib].label +
              "</option>"
          );
        }
      }

      $("#criminal_activity").selectpicker("refresh");
      $("#weapon_type").selectpicker("refresh");
    }

    if (
      $("#bir").val().substring(0, 7) == "2905.01" ||
      $("#bir").val().substring(0, 7) == "2905.02" ||
      $("#bir").val().substring(0, 7) == "2905.03" ||
      $("#bir").val().substring(0, 7) == "2905.05"
    ) {
      $("#criminal_activity").empty();
      var a = $("#criminal_activity");
      for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
        if (
          criminal_activity_data[ibi].value == "G" ||
          criminal_activity_data[ibi].value == "J" ||
          criminal_activity_data[ibi].value == "N"
        ) {
          a.append(
            '<option class="option25" value="' +
              criminal_activity_data[ibi].value +
              '">' +
              criminal_activity_data[ibi].value +
              " - " +
              criminal_activity_data[ibi].label +
              "</option>"
          );
        }
      }
      $("#criminal_activity").selectpicker("refresh");
    }

    if ($("#bir").val().substring(0, 7) == "2903.06") {
      $("#weapon_type").empty();
      var b = $("#weapon_type");
      for (ib = 0; ib < type_of_weapon_data.length; ib++) {
        if (type_of_weapon_data[ib].value == "35") {
          b.append(
            '<option class="option25" value="' +
              type_of_weapon_data[ib].value +
              '">' +
              type_of_weapon_data[ib].value +
              " - " +
              type_of_weapon_data[ib].label +
              "</option>"
          );
        }
      }

      hideCriminalActivity();

      $("#weapon_type").selectpicker("refresh");
    }

    if (
      $("#bir").val() == "2913.02A1" ||
      $("#bir").val() == "2913.02A2" ||
      $("#bir").val() == "2913.02A3" ||
      $("#bir").val() == "2913.02A4" ||
      $("#bir").val() == "2913.02A5" ||
      $("#bir").val().substring(0, 7) == "2913.12" ||
      $("#bir").val().substring(0, 7) == "2905.11" ||
      $("#bir").val().substring(0, 7) == "2905.12" ||
      $("#bir").val().substring(0, 7) == "2905.32" ||
      $("#bir").val().substring(0, 8) == "2907.39C" ||
      $("#bir").val().substring(0, 7) == "2909.29" ||
      $("#bir").val().substring(0, 7) == "2911.01" ||
      $("#bir").val().substring(0, 7) == "2911.02" ||
      $("#bir").val().substring(0, 7) == "2911.11" ||
      $("#bir").val().substring(0, 7) == "2913.00" ||
      $("#bir").val().substring(0, 7) == "2913.02E" ||
      $("#bir").val().substring(0, 7) == "2913.02" ||
      $("#bir").val().substring(0, 7) == "2913.04" ||
      $("#bir").val().substring(0, 7) == "2913.05" ||
      $("#bir").val().substring(0, 7) == "2913.06" ||
      $("#bir").val().substring(0, 7) == "2913.21" ||
      $("#bir").val().substring(0, 7) == "2913.34" ||
      $("#bir").val().substring(0, 7) == "2913.40" ||
      $("#bir").val().substring(0, 8) == "2913.401" ||
      $("#bir").val().substring(0, 7) == "2913.41" ||
      $("#bir").val().substring(0, 8) == "2913.421" ||
      $("#bir").val().substring(0, 7) == "2913.43" ||
      $("#bir").val().substring(0, 7) == "2913.44" ||
      $("#bir").val().substring(0, 8) == "2913.441" ||
      $("#bir").val().substring(0, 7) == "2913.45" ||
      $("#bir").val().substring(0, 7) == "2913.21" ||
      $("#bir").val().substring(0, 7) == "2913.47" ||
      $("#bir").val().substring(0, 7) == "2913.48" ||
      $("#bir").val().substring(0, 7) == "2913.49" ||
      $("#bir").val().substring(0, 7) == "2913.72" ||
      $("#bir").val().substring(0, 7) == "2915.05" ||
      $("#bir").val().substring(0, 7) == "2921.02" ||
      $("#bir").val().substring(0, 7) == "2921.12" ||
      $("#bir").val().substring(0, 7) == "2921.13" ||
      $("#bir").val().substring(0, 7) == "2921.15" ||
      $("#bir").val().substring(0, 7) == "2921.21" ||
      $("#bir").val().substring(0, 7) == "2921.41" ||
      $("#bir").val().substring(0, 7) == "2921.51" ||
      $("#bir").val().substring(0, 7) == "2921.52" ||
      $("#bir").val().substring(0, 7) == "2925.23" ||
      $("#bir").val().substring(0, 9) == "2923.1211" ||
      $("#bir").val().substring(0, 7) == "4549.42" ||
      $("#bir").val().substring(0, 7) == "4549.43" ||
      $("#bir").val().substring(0, 7) == "4549.44" ||
      $("#bir").val().substring(0, 7) == "4549.45" ||
      $("#bir").val().substring(0, 7) == "4549.46" ||
      $("#bir").val().substring(0, 7) == "4549.62" ||
      $("#bir").val().substring(0, 7) == "4729.61" ||
      $("#bir").val().substring(0, 7) == "2911.12" ||
      $("#bir").val().substring(0, 7) == "2911.13" ||
      $("#bir").val() == "2913.00"
    ) {
      $("#cargo").show();
      $("#theft_codes").show();
      $(".non_commercial").show();
      $(".commercial_acts").hide();

      if (
        $("#bir").val().substring(0, 7) == "2905.11" ||
        $("#bir").val().substring(0, 7) == "2905.12" ||
        $("#bir").val().substring(0) == "2907.39C" ||
        $("#bir").val().substring(0, 7) == "2909.29" ||
        $("#bir").val().substring(0, 7) == "2911.01" ||
        $("#bir").val().substring(0, 7) == "2911.02" ||
        $("#bir").val().substring(0, 7) == "2911.11" ||
        $("#bir").val().substring(0, 7) == "2913.00" ||
        $("#bir").val().substring(0, 7) == "2913.02E" ||
        $("#bir").val().substring(0, 7) == "2913.04" ||
        $("#bir").val().substring(0, 7) == "2913.05" ||
        $("#bir").val().substring(0, 7) == "2913.06" ||
        $("#bir").val().substring(0, 7) == "2913.21" ||
        $("#bir").val().substring(0, 7) == "2913.34" ||
        $("#bir").val().substring(0, 7) == "2913.40" ||
        $("#bir").val().substring(0, 8) == "2913.401" ||
        $("#bir").val().substring(0, 7) == "2913.41" ||
        $("#bir").val().substring(0, 8) == "2913.421" ||
        $("#bir").val().substring(0, 7) == "2913.43" ||
        $("#bir").val().substring(0, 7) == "2913.44" ||
        $("#bir").val().substring(0, 8) == "2913.441" ||
        $("#bir").val().substring(0, 7) == "2913.45" ||
        $("#bir").val().substring(0, 7) == "2913.21" ||
        $("#bir").val().substring(0, 7) == "2913.47" ||
        $("#bir").val().substring(0, 7) == "2913.48" ||
        $("#bir").val().substring(0, 7) == "2913.49" ||
        $("#bir").val().substring(0, 7) == "2913.72" ||
        $("#bir").val().substring(0, 7) == "2915.05" ||
        $("#bir").val().substring(0, 7) == "2921.02" ||
        $("#bir").val().substring(0, 7) == "2921.12" ||
        $("#bir").val().substring(0, 7) == "2921.13" ||
        $("#bir").val().substring(0, 7) == "2921.15" ||
        $("#bir").val().substring(0, 7) == "2921.21" ||
        $("#bir").val().substring(0, 7) == "2921.41" ||
        $("#bir").val().substring(0, 7) == "2921.51" ||
        $("#bir").val().substring(0, 7) == "2921.52" ||
        $("#bir").val().substring(0, 7) == "2925.23" ||
        $("#bir").val().substring(0, 9) == "2923.1211" ||
        $("#bir").val().substring(0, 7) == "4549.42" ||
        $("#bir").val().substring(0, 7) == "4549.43" ||
        $("#bir").val().substring(0, 7) == "4549.44" ||
        $("#bir").val().substring(0, 7) == "4549.45" ||
        $("#bir").val().substring(0, 7) == "4549.46" ||
        $("#bir").val().substring(0, 7) == "4549.62" ||
        $("#bir").val().substring(0, 7) == "4729.61" ||
        $("#bir").val().substring(0, 7) == "2911.12" ||
        $("#bir").val().substring(0, 7) == "2911.13" ||
        $("#bir").val() == "2913.00" ||
        $("#bir").val() == "2913.02E"
      ) {
        $("#theft_codes").hide();
        $("#theft_codes_2").selectpicker("val", "");
      }

      if ($("#bir").val().substring(0, 7) == "2905.32") {
        $(".commercial_acts").show();
        $(".non_commercial").hide();
        hideCriminalActivity();
        $("#theft_codes_2").selectpicker("refresh");
      }
    } else {
      $("#cargo").hide();
      $("#theft_codes").hide();
      $("#theft_codes_2").selectpicker("val", "");

      $("#cargo_2").selectpicker("val", "");
    }

    if (
      $("#bir").val() == "2911.11A1" ||
      $("#bir").val() == "2911.11A2" ||
      $("#bir").val() == "2911.12A1" ||
      $("#bir").val() == "2911.12A2" ||
      $("#bir").val() == "2911.12A3" ||
      $("#bir").val() == "2911.12B" ||
      $("#bir").val() == "2911.13A" ||
      $("#bir").val() == "2911.13B" ||
      $("#theft2").val() == "240"
    ) {
      $("#entry_method_div").show();
      $("#forced_div").show();

      if ($("#theft2").val() != "240") {
        $("#side_div").show();
        $("#opening_div").show();
      }

      var dataArr = [
        { value: "1", text: "Basement" },
        { value: "2", text: "First Floor" },
        { value: "3", text: "Second Floor" },
        { value: "4", text: "Other" },
        { value: "5", text: "Unknown" },
      ];

      $("#entry_method option").remove();
      $("#entry_method").append("<option value='' deselected></option>");
      $.each(dataArr, function (i) {
        $("#entry_method").append($("<option></option>").attr("value", dataArr[i]["value"]).text(dataArr[i]["text"]));
      });
      $("#entry_method").selectpicker("refresh");
    } else {
      $("#entry_method_div").hide();
      $("#forced_div").hide();
      $("#side_div").hide();
      $("#opening_div").hide();
      $("#entry_method").selectpicker("val", "");
      $("#side").selectpicker("val", "");
      $("#opening").selectpicker("val", "");
      $("#forced").selectpicker("val", "");
    }
    if (
      $("#bir").val() == "2921.36A2" ||
      $("#bir").val().substring(0, 6) == "2907.3" ||
      $("#bir").val().substring(0, 7) == "2913.30" ||
      $("#bir").val().substring(0, 7) == "2913.31" ||
      $("#bir").val().substring(0, 7) == "2913.32" ||
      $("#bir").val().substring(0, 7) == "2913.33" ||
      $("#bir").val().substring(0, 7) == "2925.22" ||
      $("#bir").val().substring(0, 7) == "2925.37" ||
      $("#bir").val().substring(0, 8) == "2915.081" ||
      $("#bir").val().substring(0, 8) == "2915.082" ||
      $("#bir").val().substring(0, 7) == "2915.09" ||
      $("#bir").val().substring(0, 7) == "2923.12" ||
      $("#bir").val().substring(0, 7) == "2923.13" ||
      $("#bir").val().substring(0, 7) == "2923.15" ||
      $("#bir").val().substring(0, 7) == "2923.16" ||
      $("#bir").val().substring(0, 7) == "2923.17" ||
      $("#bir").val().substring(0, 7) == "2923.19" ||
      $("#bir").val().substring(0, 7) == "2923.20" ||
      $("#bir").val().substring(0, 7) == "2923.21" ||
      $("#bir").val().substring(0, 7) == "3773.21" ||
      $("#bir").val().substring(0, 7) == "2909.26" ||
      $("#bir").val().substring(0, 7) == "2923.13" ||
      $("#bir").val().substring(0, 7) == "2909.27" ||
      $("#bir").val().substring(0, 7) == "2909.28" ||
      $("#bir").val().substring(0, 7) == "2937.32" ||
      $("#bir").val().substring(0, 7) == "2907.33" ||
      $("#bir").val().substring(0, 7) == "2907.34" ||
      $("#bir").val().substring(0, 7) == "2907.38" ||
      $("#bir").val().substring(0, 7) == "2925.02" ||
      $("#bir").val().substring(0, 7) == "2925.03" ||
      $("#bir").val().substring(0, 7) == "2925.04" ||
      $("#bir").val().substring(0, 7) == "2925.05" ||
      $("#bir").val().substring(0, 7) == "2925.06" ||
      $("#bir").val().substring(0, 7) == "2925.11" ||
      $("#bir").val().substring(0, 7) == "2925.13" ||
      $("#bir").val().substring(0, 7) == "2925.24" ||
      $("#bir").val().substring(0, 7) == "2925.31" ||
      $("#bir").val().substring(0, 7) == "2925.32" ||
      $("#bir").val().substring(0, 7) == "2925.33" ||
      $("#bir").val().substring(0, 7) == "2925.36" ||
      $("#bir").val().substring(0, 7) == "4729.51" ||
      $("#bir").val().substring(0, 7) == "2925.12" ||
      $("#bir").val().substring(0, 7) == "2925.14" ||
      $("#bir").val().substring(0, 7) == "2913.51" ||
      $("#bir").val().substring(0, 7) == "2923.13" ||
      $("#bir").val().substring(0, 3) == "959" ||
      $("#bir").val().substring(0, 7) == "2921.38" ||
      $("#bir").val().substring(0, 7) == "2907.02" ||
      $("#bir").val().substring(0, 7) == "2905.01" ||
      $("#bir").val().substring(0, 7) == "2905.02" ||
      $("#bir").val().substring(0, 7) == "2905.03" ||
      $("#bir").val().substring(0, 7) == "2905.05" ||
      $("#bir").val().substring(0, 7) == "2907.03" ||
      $("#bir").val().substring(0, 7) == "2907.05" ||
      $("#bir").val().substring(0, 7) == "2907.06" ||
      $("#bir").val().substring(0, 7) == "2911.01" ||
      $("#bir").val().substring(0, 7) == "2911.02" ||
      $("#bir").val().substring(0, 7) == "2919.22" ||
      $("#bir").val().substring(0, 7) == "2919.25" ||
      $("#bir").val().substring(0, 7) == "2921.03" ||
      $("#bir").val().substring(0, 7) == "2921.04" ||
      $("#bir").val().substring(0, 7) == "2921.05" ||
      $("#bir").val().substring(0, 7) == "2923.42" ||
      $("#bir").val().substring(0, 7) == "2903.13" ||
      $("#bir").val().substring(0, 7) == "2903.14" ||
      $("#bir").val().substring(0, 7) == "2903.03" ||
      $("#bir").val().substring(0, 7) == "2903.11" ||
      $("#bir").val().substring(0, 7) == "2903.05" ||
      $("#bir").val().substring(0, 7) == "2903.21" ||
      $("#bir").val().substring(0, 7) == "2903.08" ||
      $("#bir").val().substring(0, 7) == "2903.22" ||
      $("#bir").val().substring(0, 7) == "2903.02" ||
      $("#bir").val().substring(0, 7) == "2903.12" ||
      $("#bir").val().substring(0, 7) == "2903.34"
    ) {
      $("#criminal_activity_div").show();

      if ($("#bir").val() == "2907.03A5" || $("#bir").val() == "2903.02A1") {
        hideCriminalActivity();
      }
    } else {
      hideCriminalActivity();
    }

    const currentOrcNo = $("#bir").val();

    if (currentOrcNo == "2921.33C1" || currentOrcNo == "2921.33C2" || currentOrcNo == "2921.33B") {
      $("#attempted_completed").val("C").selectpicker("refresh");

      criminalActivityFillGJN();
    }

    if (currentOrcNo == "2921.33B") {
      if (allVictims.some((victim) => victim.type_of_injury >= 1 && victim.type_of_injury <= 6)) {
        weaponFillExcluding_17_99();
      }
    }

    if (currentOrcNo == "2921.33" || currentOrcNo == "2921.33A") {
      $("#attempted_completed").val("C").selectpicker("refresh");

      const weaponType = $("#weapon_type").val();

      if (
        allVictims.some(
          (victim) => victim.victim_type === "P" && victim.type_of_injury >= 1 && victim.type_of_injury <= 6
        )
      ) {
        criminalActivityFillGJN();

        weaponFillExcluding_17_99();
      } else if (
        allVictims.some(
          (victim) => victim.victim_type === "P" && victim.type_of_injury != 0 && !["17", "99"].includes(weaponType)
        )
      ) {
        criminalActivityFillGJN();
      } else if (
        allVictims.some(
          (victim) => victim.victim_type === "P" && !["16", "17", "18", "40", "80", "99", "U"].includes(weaponType)
        )
      ) {
        criminalActivityFillGJN();
      }
    }
  });

  $("#side_div .selectpicker").change(function () {
    var slecteditem_2 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("side_2").value = slecteditem_2;
  });
  $("#opening_div .selectpicker").change(function () {
    var slecteditem_3 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("opening_2").value = slecteditem_3;
  });

  $("#method_of_operation_div .selectpicker").change(function () {
    var targets = [];
    $.each($(this).find("option:selected"), function () {
      targets.push($(this).val());
    });
    document.getElementById("method_of_operation_2").value = targets;
  });

  $("#theft_codes .selectpicker").change(function () {
    var slecteditem5 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("theft2").value = slecteditem5;

    if ($("#theft2").val() == "240") {
      $("#entry_method_div").show();
      $("#forced_div").show();
      $("#entry_method").selectpicker("val", "01");

      var dataArr2 = [
        { value: "01", text: "Motor Running/Keys Left in Car " },
        { value: "02", text: "Unlocked" },
        { value: "03", text: "Duplicate Key Used " },
        { value: "04", text: "Window Broken" },
        { value: "05", text: "Towed" },
        { value: "06", text: "Hot Wire" },
        { value: "07", text: "Slim Jim/Coat Hanger" },
        { value: "08", text: "Tumblers Removed" },
        { value: "09", text: "Column Peeled" },
        { value: "10", text: "Ignition Peeled" },
        { value: "U", text: "Unknown" },
      ];

      $("#entry_method option").remove();
      $("#entry_method").append("<option value='' deselected></option>");
      $.each(dataArr2, function (i) {
        $("#entry_method").append($("<option></option>").attr("value", dataArr2[i]["value"]).text(dataArr2[i]["text"]));
      });
      $("#entry_method").selectpicker("refresh");
    } else {
      $("#entry_method_div").hide();
      $("#forced_div").hide();
      $("#entry_method").selectpicker("val", "");
      $("#forced").selectpicker("val", "");
      $("#entry_method option").remove();
      $("#entry_method").selectpicker("refresh");
    }
  });

  $("#entry_method_div .selectpicker").change(function () {
    var slecteditem8 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("entry_method_2").value = slecteditem8;

    if (
      $("#entry_method").val() == "01" ||
      $("#entry_method").val() == "02" ||
      $("#entry_method").val() == "03" ||
      $("#entry_method").val() == "04" ||
      $("#entry_method").val() == "05" ||
      $("#entry_method").val() == "06" ||
      $("#entry_method").val() == "07" ||
      $("#entry_method").val() == "08" ||
      $("#entry_method").val() == "09" ||
      $("#entry_method").val() == "10" ||
      $("#entry_method").val() == "U"
    ) {
      $("#entry_method_div").show();
      $("#forced_div").show();
    } else {
      $("#entry_method").selectpicker("refresh");
      $("#forced").selectpicker("refresh");
    }
  });

  $("#day_night_div .selectpicker").change(function () {
    var slecteditem_77 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("day_night_2").value = slecteditem_77;
  });

  $("#hate_div .selectpicker").change(function () {
    var slecteditem_71 = $(this).find("option:selected").val(); //attr('id');
    document.getElementById("hate_2").value = slecteditem_71;
    if ($("#hate_2").val() == "B") {
      $("#hate_type_div").show();
      var slecteditem_72 = $("#hate_type_div").find("option:selected").val(); //attr('id');
      document.getElementById("hate_type_2").value = slecteditem_72;
    } else {
      $("#hate_type_div").hide();
      $("#hate_type").selectpicker("val", "");
    }
  });

  $("#weapon_type").change(function () {
    if ($("#bir").val().substring(0, 7) == "2921.36" && $("#bir").val() != "2921.36A2") {
      if (
        $("#weapon_type").val() == "11" ||
        $("#weapon_type").val() == "12" ||
        $("#weapon_type").val() == "12A" ||
        $("#weapon_type").val() == "13" ||
        $("#weapon_type").val() == "13A" ||
        $("#weapon_type").val() == "13B" ||
        $("#weapon_type").val() == "14" ||
        $("#weapon_type").val() == "15" ||
        $("#weapon_type").val() == "15A" ||
        $("#weapon_type").val() == "15B" ||
        $("#weapon_type").val() == "15C"
      ) {
        $("#criminal_activity_div").show();
        $("#criminal_activity").empty();
        var a = $("#criminal_activity");
        for (ibi = 0; ibi < criminal_activity_data.length; ibi++) {
          if (
            criminal_activity_data[ibi].value == "B" ||
            criminal_activity_data[ibi].value == "C" ||
            criminal_activity_data[ibi].value == "D" ||
            criminal_activity_data[ibi].value == "E" ||
            criminal_activity_data[ibi].value == "O" ||
            criminal_activity_data[ibi].value == "P" ||
            criminal_activity_data[ibi].value == "T" ||
            criminal_activity_data[ibi].value == "U"
          ) {
            a.append(
              '<option class="option25" value="' +
                criminal_activity_data[ibi].value +
                '">' +
                criminal_activity_data[ibi].value +
                " - " +
                criminal_activity_data[ibi].label +
                "</option>"
            );
          }
        }
        $("#criminal_activity").selectpicker("refresh");
      } else {
        hideCriminalActivity();
      }
    }
  });

  $("#report_type_div .selectpicker").change(function () {
    if ($("#report_type_div .selectpicker").val() == "NC") {
      residential_fill();
      $("#weapon_type").selectpicker("val", "99");
      $("#weapon_type_2").val("99");
      $("#non_incident_div").show();
      $("#daily_note_select_div").show();
      $(".offense_group").hide();
      $("#bir").selectpicker("val", "");
      $("#theft_codes_2").selectpicker("val", "");
      $("#cargo_2").selectpicker("val", "");
      $("#orc_no").val("");
      $("#local_code").val("");
      $("#attempted_completed").selectpicker("val", "");
      $("#cargo").hide();
      $("#theft_codes").hide();
    }
    if ($("#report_type_div .selectpicker").val() == "O" || $("#report_type_div .selectpicker").val() == "S") {
      $(".offense_group").show();
      $("#daily_note_select_div").show();
      $("#non_incident_div").hide();
      $("#non_incident").selectpicker("val", "");
      $("#case_clearences").selectpicker("val", "I");
    }
  });

  $("#case_clearences").change(function () {
    if (
      $("#case_clearences").val() == "A" ||
      $("#case_clearences").val() == "B" ||
      $("#case_clearences").val() == "C" ||
      $("#case_clearences").val() == "D" ||
      $("#case_clearences").val() == "E"
    ) {
      $("#clearence_date").prop("required", true);
      $("#clearence_class").addClass("required");
    } else {
      $("#clearence_date").prop("required", false);
      $("#clearence_date").val("");
      $("#clearence_class").removeClass("required");
    }
  });
}

function hideCriminalActivity() {
  $("#criminal_activity_div").hide();
  $("#criminal_activity").selectpicker("val", "");
}

$("#almost_there").text("Almost there");
