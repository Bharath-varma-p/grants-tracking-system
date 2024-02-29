const moment = require("moment");
const { JSDOM } = require("jsdom");
const _ = require("lodash");

module.exports.findVictimTypeLabel = (victimType) => {
  switch (victimType) {
    case "I":
      return "Individual";
    case "B":
      return "Business";
    case "F":
      return "Financial Institution";
    case "G":
      return "Government";
    case "P":
      return "Police Officer (in the line of duty)";
    case "R":
      return "Religious Organization";
    case "S":
      return "Society/Public";
    case "O":
      return "Other";
    case "U":
      return "Unknown";
    default:
      return null;
  }
};

module.exports.findGenderLabel = (genderType) => {
  switch (genderType) {
    case "M":
      return "Male";
    case "F":
      return "Female";
    case "U":
      return "Unknown";
    default:
      return null;
  }
};

module.exports.findArmedTypeLabel = (armedType) => {
  switch (armedType) {
    case "11":
      return "Firearm";
    case "12":
      return "Handgun";
    case "12A":
      return "Automatic Handgun";
    case "13":
      return "Rifle";
    case "13A":
      return "Fully Automatic Rifle";
    case "13B":
      return "Other Fully Automatic Firearm";
    case "14":
      return "Shotgun";
    case "15":
      return "Other Firearm";
    case "15A":
      return "Semi-Automatic Sporting Rifle";
    case "15B":
      return "Semi-Automatic Assault Firearm";
    case "15C":
      return "Machine Pistol";
    case "16":
      return "Imitation Firearm";
    case "17":
      return "Simulated Firearm";
    case "18":
      return "BB and Pellet Guns";
    case "20":
      return "Knife/Cutting Instrument";
    case "30":
      return "Blunt Object";
    case "50":
      return "Poison";
    case "60":
      return "Explosives";
    case "65":
      return "Fire/Incediary Device";
    case "70":
      return "Drugs/Narcatics/Sleeping Pills";
    case "80":
      return "Other Weapon";
    case "99":
      return "None";
    default:
      return null;
  }
};

module.exports.findArresteeTypeLabel = (arresteeType) => {
  switch (arresteeType) {
    case "1":
      return "Arrest (Adult)";
    case "2":
      return "Arrest (Juvenile)";
    case "3":
      return "Runaway Arrest (Adult)";
    case "4":
      return "Runaway Arrest (Juvenile)";
    default:
      return null;
  }
};

module.exports.findArrestTypeLabel = (arrestType) => {
  switch (arrestType) {
    case "1":
      return "Complaint";
    case "2":
      return "Crime In Progress";
    case "3":
      return "Warrant";
    case "4":
      return "Court Summons/Citation";
    case "9":
      return "Other";
    default:
      return null;
  }
};

module.exports.findResidentStatusLabel = (residentStatus) => {
  switch (residentStatus) {
    case "1":
      return "Resident";
    case "2":
      return "Tourist";
    case "3":
      return "Military";
    case "4":
      return "Student";
    case "5":
      return "Other Status";
    default:
      return "Unknown";
  }
};

module.exports.findArrestSuspectedOfUsingLabel = (suspectedOfUsing) => {
  switch (suspectedOfUsing) {
    case "A":
      return "Alcohol";
    case "C":
      return "Computer Equipment";
    case "D":
      return "Drugs/Narcotics";
    case "N":
      return "Not Applicable";
    default:
      return "Unknown";
  }
};

module.exports.findArrestJuvenileDispositionLabel = (suspectedOfUsing) => {
  switch (suspectedOfUsing) {
    case "H":
      return "Handled within the Department";
    case "O":
      return "Referred to Other Authorities";
    default:
      return null;
  }
};

module.exports.convertToLongAddressPrefix = (prefix) => {
  const googleMapAbbreviations = [
    ["Alley", "Aly"],
    ["Apartment", "Apt"],
    ["Arcade", "Arc"],
    ["Avenue", "Ave"],
    ["Avenue", "Av"],
    ["Basement", "Bsmt"],
    ["Beach", "Bch"],
    ["Bend", "Bnd"],
    ["Bottom", "Btm"],
    ["Boulevard", "Blvd"],
    ["Branch", "Br"],
    ["Building", "Bldg"],
    ["Bypass", "Byp"],
    ["Camp", "Cp"],
    ["Causeway", "Cswy"],
    ["Center", "Ctr"],
    ["Circle", "Cir"],
    ["Court", "Ct"],
    ["Cove", "Cv"],
    ["Creek", "Crk"],
    ["Crossing", "Xing"],
    ["Crossroad", "Xrd"],
    ["Drive", "Dr"],
    ["East", "E"],
    ["Expressway", "Expy"],
    ["Field", "Fld"],
    ["Floor", "Fl"],
    ["Freeway", "Fwy"],
    ["Front", "Frnt"],
    ["Gateway", "Gtwy"],
    ["Hangar", "Hngr"],
    ["Harbor", "Hbr"],
    ["Haven", "Hvn"],
    ["Heights", "Hts"],
    ["Highway", "Hwy"],
    ["Island", "Is"],
    ["Junction", "Jct"],
    ["Lake", "Lk"],
    ["Lane", "Ln"],
    ["Lobby", "Lbby"],
    ["Meadow", "Mdw"],
    ["Mill", "Ml"],
    ["Mount", "Mt"],
    ["Mountain", "Mtn"],
    ["NE", "Northeast"],
    ["North", "N"],
    ["NW", "Northwest"],
    ["Office", "Ofc"],
    ["Parkway", "Pky"],
    ["Place", "Pl"],
    ["Plain", "Pln"],
    ["Plaza", "Plz"],
    ["Point", "Pt"],
    ["Ranch", "Rnch"],
    ["Rapids", "Rpds"],
    ["Ridge", "Rdg"],
    ["Road", "Rd"],
    ["Room", "Rm"],
    ["Route", "Rte"],
    ["SE", "Southeast"],
    ["Skyway", "Skwy"],
    ["South", "S"],
    ["Space", "Spc"],
    ["Spring", "Spg"],
    ["Square", "Sq"],
    ["Station", "Sta"],
    ["Stravenue", "Stra"],
    ["Street", "St"],
    ["Suite", "Ste"],
    ["Summit", "Smt"],
    ["SW", "Southwest"],
    ["Terrace", "Ter"],
    ["Trace", "Trce"],
    ["Trailer", "Trlr"],
    ["Turnpike", "Tpk"],
    ["Valley", "Vly"],
    ["View", "Vw"],
    ["Village", "Vlg"],
    ["Well", "Wl"],
    ["West", "W"],
  ];

  const found = googleMapAbbreviations.find((abbr) => abbr[1].toLowerCase() == prefix.toLowerCase());

  if (found) {
    return found[0];
  } else {
    return prefix;
  }
};

module.exports.convertToLongAddress = (address) => {
  if (!address) {
    return address;
  }

  const field = address.split(",");
  const convertedAddress = field[0]
    .split(" ")
    .map((item) => this.convertToLongAddressPrefix(item))
    .join(" ");

  field[0] = convertedAddress;

  return field.join(",");
};

module.exports.findRaceLabel = (genderType) => {
  switch (genderType) {
    case "A":
      return "Asian";
    case "B":
      return "Black";
    case "H":
      return "Hispanic/Latino";
    case "I":
      return "American Indian/Alaskan Native";
    case "P":
      return "Native Hawaiian/Other Pacific Islander";
    case "W":
      return "White";
    case "F":
      return "Pending Further Investigation";
    case "U":
      return "Unknown";
    default:
      return "Unknown";
  }
};

/**
 * To standardize street and road addresses. 950 Sun St will be converted to 950 Sun Street.
 * So two addresses will be evaluated as same address preventing duplicate data.
 * @param {Array} addresses The addresses to be converted
 * @param {string} address_key The object property name of the address. Default is 'Address'
 * @param {string} sort_column_key The addresses will be sorted by this property name. Default is 'Count'
 * @param {string} removeApartmentNumber If true, apartment number will removed from address. Default is true. Exp: 950 Sun St will be Sun Street.
 */
module.exports.convertAddresses = (
  addresses,
  address_key = "Address",
  sort_column_key = "Count",
  removeApartmentNumber = true
) => {
  addresses.forEach((address_row) => {
    address_row[address_key] = this.convertToLongAddress(address_row[address_key]).split(",")[0]; //To standardize address input. .

    if (removeApartmentNumber) {
      const splits = address_row[address_key].split(" ");
      if (!isNaN(parseInt(splits[0]))) {
        //If Address begins with number
        address_row[address_key] = splits.slice(1).join(" ");
      }
    }
  });

  //Removing duplicates. For example, If Sun Street count is 3 and Sun St count is 2 then Sun Street count will be 5.
  /*
      old Addresses= [
          {Address:'Sun Street',Count:2},
          {Address:'Sun Street',Count:3},
      ];

      new Addresses= [
          {Address:'Sun Street',Count:5}
      ];
  */
  let convertedAddresses = addresses.reduce((acc, cur) => {
    let result = [];

    if (acc) {
      result = [...acc];

      const existed = result.find(
        (item) => item[address_key].toLowerCase().trim() == cur[address_key].toLowerCase().trim()
      );

      if (existed) {
        existed.Count += cur.Count;
      } else {
        result.push(cur);
      }
    } else {
      result.push(cur);
    }

    return result;
  }, []);

  if (sort_column_key) {
    convertedAddresses = _.sortBy(convertedAddresses, [sort_column_key]).reverse();
  }

  return convertedAddresses;
};

/**
 * To standardize street and road address. 950 Sun St will be converted to 950 Sun Street.
 * So two addresses will be evaluated as same address preventing duplicate data.
 * @param {String} address The address to be converted
 * @param {Boolean} removeApartmentNumber If true, apartment number will removed from address. Default is true. Exp: 950 Sun St will be Sun Street.
 */
module.exports.convertAddress = (address, removeApartmentNumber = true) => {
  if (!address) {
    return address;
  }

  let converted_address = this.convertToLongAddress(address).split(",")[0]; //To standardize address input. .

  if (removeApartmentNumber) {
    const splits = address.split(" ");
    if (!isNaN(parseInt(splits[0]))) {
      //If Address begins with number
      converted_address = splits.slice(1).join(" ");
    }
  }

  return converted_address;
};

/**
 * To add missing hours as 0 for charts.
 * @param {Array} hours The array to be added missing hours
 * @param {string} hour_key The object property name of the hour. Default is 'hour'
 */
module.exports.addMissingHours = (hours, hour_key = "hour") => {
  if (!hours || hours.length == 0) {
    return [];
  }

  const allHours = [];

  for (let i = 0; i < 24; i++) {
    allHours.push(i);
  }

  const newHours = allHours.map((hour) => {
    const foundHour = hours.find((item) => item[hour_key] == hour);
    return {
      hour: hour,
      Count: foundHour ? foundHour.Count : 0,
    };
  });

  return newHours;
};

/**
 * To add missing age ranges for charts.
 * @param {Array} ages The array to be added missing age ranges
 * @param {string} age_key The object property name of the age range. Default is 'age_range'
 */
module.exports.addMissingAgeRanges = (ages, age_key = "age_range") => {
  if (!ages || ages.length == 0) {
    return [];
  }

  const allAges = [
    "Unknown",
    "<18",
    "18-21",
    "21-25",
    "26-30",
    "31-35",
    "36-40",
    "41-45",
    "46-50",
    "51-55",
    "56-60",
    "61-65",
    "+65",
  ];

  const newAges = allAges.map((age) => {
    const foundAge = ages.find((item) => item[age_key] == age);
    return {
      age: age,
      Count: foundAge ? foundAge.Count : 0,
    };
  });

  return newAges;
};

/**
 * To transform race array to long version. W will be trasformed as White.
 * @param {Array} races The array to be transformed
 * @param {string} race_key The object property name of race. Default is 'race'
 * @param {string} prefix The prefix for race. Exp. If prefix Male, W will be transformed as 'Male White'
 */
module.exports.transformRaces = (races, prefix = "", race_key = "race") => {
  return races.map((item) => {
    return {
      ...item,
      race: prefix + this.findRaceLabel(item[race_key]),
    };
  });
};

/**
 * Get all race types with abbreviation
 */
module.exports.getShortRaceTypes = () => {
  return ["W", "B", "H", "I", "P", "A", "F", "U"];
};

/**
 * Get all race types with non-abbreviaton
 */
module.exports.getLongRaceTypes = () => {
  return this.getShortRaceTypes().map((race) => this.findRaceLabel(race));
};

/**
 * To add missing races for charts.
 * @param {Array} races The array to be added missing races
 * @param {string} race_key The object property name of the age range. Default is 'race'
 */
module.exports.addMissingRaces = (races, race_key = "race") => {
  if (!races || races.length == 0) {
    return [];
  }

  const allRaces = this.getShortRaceTypes();

  const newRaces = allRaces.map((race) => {
    let count = 0;
    if (race == "U") {
      count = _.sumBy(
        races.filter((item) => item[race_key] == "U" || item[race_key] == "Unknown"),
        "Count"
      );
    } else {
      const foundRace = races.find((item) => item[race_key] == race || item[race_key] == this.findGenderLabel(race));
      if (foundRace) {
        count = foundRace.Count;
      }
    }

    return {
      race: race,
      Count: count,
    };
  });

  _.remove(newRaces, (item) => (item.race == "U" || item.race == "F") && item.Count == 0);

  return newRaces;
};

/**
 * Get all gender types with abbreviation
 */
module.exports.getShortGenderTypes = () => {
  return ["M", "F", "U"];
};

/**
 * Get all gender types with non-abbreviaton
 */
module.exports.getLongGenderTypes = () => {
  return this.getShortGenderTypes().map((race) => this.findGenderLabel(race));
};

/**
 * To add missing genders for charts.
 * @param {Array} genders The array to be added missing genders
 * @param {string} gender_key The object property name of the gender. Default is 'gender'
 */
module.exports.addMissingGenders = (genders, gender_key = "gender") => {
  if (!genders || genders.length == 0) {
    return [];
  }

  const allGenders = this.getLongGenderTypes();

  let newGenders = allGenders.map((gender) => {
    const foundGender = genders.find((item) => item[gender_key] == gender);
    return {
      gender: gender,
      Count: foundGender ? foundGender.Count : 0,
    };
  });

  newGenders = newGenders.filter((item) => item.gender != "Unknown" || item.Count > 0);

  return newGenders;
};

/**
 * To add missing weekdays for charts.
 * @param {Array} weekdays The array to be added missing weekdays
 * @param {string} weekday_key The object property name of the weekday. Default is 'dayname'
 */
module.exports.addMissingWeekDays = (weekdays, weekday_key = "dayname") => {
  if (!weekdays || weekdays.length == 0) {
    return [];
  }

  const allWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let newWeekDays = allWeekDays.map((weekday) => {
    const foundWeekDay = weekdays.find((item) => item[weekday_key] == weekday);
    return {
      weekday: weekday,
      Count: foundWeekDay ? foundWeekDay.Count : 0,
    };
  });

  newWeekDays = newWeekDays.filter((item) => item.weekday != "Unknown" || item.Count > 0);

  return newWeekDays;
};

/**
 * To find crash severity label text
 @param {Number} severityType The number of severity type
*/
module.exports.findCrashSeverityLabel = (severityType) => {
  switch (severityType) {
    case "1":
      return "Fatal";
    case "2":
      return "Serious Injury Suspected";
    case "3":
      return "Minor Injury Suspected";
    case "4":
      return "Injury Possible";
    case "5":
      return "Property Damage Only";
    default:
      return "Unknown";
  }
};

/**
 * To find FIR Interview type label text
 @param {Number} firArrestType The number of fir arrest type
*/
module.exports.findFIRInterviewTypeLabel = (firArrestType) => {
  switch (firArrestType) {
    case "1":
      return "Pedestrian";
    case "2":
      return "Driver";
    case "3":
      return "Passenger";
    case "4":
      return "Other";
    default:
      return "Unknown";
  }
};

/**
 * To find FIR arrestee type label text like FIR (Adult), FIR (Juvenile)
 @param {Number} firArresteeType The number of fir arrestee type
*/
module.exports.findFIRArresteeTypeLabel = (firArresteeType) => {
  switch (firArresteeType) {
    case "1":
      return "FIR (Adult)";
    case "2":
      return "FIR (Juvenile)";
    case "3":
      return "Runaway FIR (Adult)";
    case "4":
      return "Runaway FIR (Juvenile)";
    default:
      return "Unknown";
  }
};

/**
 * To find marital status label text
 @param {String} maritalStatus The abbreviation string of marital status like M,S,W
*/
module.exports.findMaritalStatusLabel = (maritalStatus) => {
  switch (maritalStatus) {
    case "M":
      return "Married";
    case "MC":
      return "Married/Common Law";
    case "S":
      return "Single";
    case "D":
      return "Divorced";
    case "W":
      return "Widowed";
    case "O":
      return "Other";
    case "U":
      return "Unknown";
    default:
      return "Unknown";
  }
};

/**
 * To find type of property loss label text
 @param {Number} propertyType The abbreviation number of property loss
*/
module.exports.findTypeOfPropertyLossLabel = (propertyType) => {
  switch (propertyType) {
    case "1":
      return "None";
    case "2":
      return "Burned";
    case "3":
      return "Counterfeited/Forged";
    case "4":
      return "Destroyed/Damaged/Vandalized";
    case "5":
      return "Stolen/Etc";
    case "6":
      return "Seized";
    case "7":
      return "Recovered";
    default:
      return "Unknown";
  }
};

/**
 * To find court reason label text
 @param {Number} reason The abbreviation number of reason
*/
module.exports.findCourtReasonLabel = (reason) => {
  switch (reason) {
    case "1":
      return "Defendant Failed to Appear";
    case "2":
      return "Order Supplemental Summons to New Date";
    case "3":
      return "Order Operator's License Forfeiture";
    case "4":
      return "Bond Forfeiture";
    case "5":
      return "Order Warrant";
    case "6":
      return "Summons Issued";
    case "7":
      return "Warrant Issued";
    case "8":
      return "Defendant Request";
    case "9":
      return "Court Request";
    default:
      return "Unknown";
  }
};

/**
 * To find court waivered label text
 @param {Number} waivered The abbreviation number of waivered
*/
module.exports.findCourtWaiveredLabel = (waivered) => {
  switch (waivered) {
    case "1":
      return "Met Rquirements of Waiver";
    case "2":
      return "Paid Fines and Costs";
    case "3":
      return "Accepted Guilty Plea(s)";
    case "4":
      return "Made Guilty Findin(s)";
    case "5":
      return "Accepted Guilty Plea(s)";
    default:
      return "Unknown";
  }
};

/**
 * Format phone number like (555) 333-2211
 @param {String} phone_number
*/
module.exports.formatPhoneNumber = (phone_number) => {
  if (!phone_number) {
    return phone_number;
  }

  const new_phone = phone_number
    .split("")
    .filter((p) => p != "(" && p != ")" && p != "-" && p != " ")
    .join("");

  if (new_phone.length != 10) {
    return phone_number;
  }

  return `(${new_phone.substring(0, 3)}) ${new_phone.substring(3, 6)}-${new_phone.substring(6)}`;
};

const eyeColors = [
  { value: "BLK", label: "Black" },
  { value: "BLU", label: "Blue" },
  { value: "BRO", label: "Brown" },
  { value: "GRY", label: "Gray" },
  { value: "GRN", label: "Green" },
  { value: "HAZ", label: "Hazel" },
  { value: "MAR", label: "Maroon" },
  { value: "MUL", label: "Multicolored" },
  { value: "PNK", label: "Pink" },
  { value: "OOO", label: "Other" },
  { value: "U", label: "Unknown" },
];

/**
 * To find long eye color name
 @param {Number} short_color The abbreviation of eye color
*/
module.exports.findEyeColorLabel = (short_color) => {
  const foundColor = eyeColors.find((p) => p.value === short_color);

  return foundColor ? foundColor.label : short_color;
};

/**
*To find eye color code
@param {Number} longColor The eye color
*/
module.exports.findEyeColorCode = (longColor) => {
  if (!longColor) {
    return "";
  }

  const lowerColor = longColor.toLowerCase();

  const foundColor = eyeColors.find((p) => p.label.toLowerCase().includes(lowerColor));

  return foundColor ? foundColor.value : longColor;
};

const hairColors = [
  { value: "BLD", label: "Bald" },
  { value: "BLK", label: "Black" },
  { value: "BLN", label: "Blond or Strawberry" },
  { value: "BRO", label: "Brown" },
  { value: "GRY", label: "Gray or Partially Gray" },
  { value: "RED", label: "Red Auburn" },
  { value: "SDY", label: "Sandy" },
  { value: "WHI", label: "White" },
  { value: "OOO", label: "Other" },
  { value: "U", label: "Unknown" },
];

/**
 * To find long hair color name
 @param {Number} short_color The abbreviation of hair color
*/
module.exports.findHairColorLabel = (short_color) => {
  const foundColor = hairColors.find((p) => p.value === short_color);

  return foundColor ? foundColor.label : short_color;
};

/**
*To find hair color code
@param {Number} longColor The abbreviation of hair color
*/
module.exports.findHairColorCode = (longColor) => {
  if (!longColor) {
    return "";
  }

  const lowerColor = longColor.toLowerCase();

  const foundColor = hairColors.find((p) => p.label.toLowerCase().includes(lowerColor));

  return foundColor ? foundColor.value : longColor;
};

/**
 * To find street name and city,state from long address
 @param {String} long_address
*/
module.exports.splitAddressFromLongAddress = (long_address) => {
  const result = {
    street_address: "",
    city_state: "",
  };

  if (!long_address) {
    return result;
  }

  const splits = long_address.split(",");

  const stateIndex = splits.findIndex((p) => p.trim().length == 2);

  if (stateIndex > -1) {
    result.street_address = splits.slice(0, stateIndex - 1).join(",");
    result.city_state = splits.slice(stateIndex - 1).join(",");
  } else {
    result.street_address = long_address;
    result.city_state = "Cincinnati, OH";
  }

  return result;
};

/**
 * To find fips code object from fips_codes.json file
 @param {String} fipsCode
*/
module.exports.findFipsCode = (fipsCode) => {
  const fs = require("fs");
  const path = require("path");

  const fips_codes = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/fips_codes.json"), "utf8"));

  return fips_codes.find((item) => item.fips == fipsCode);
};

/**
 * To get fips codes
 */
module.exports.getFipsCodes = () => {
  const fs = require("fs");
  const path = require("path");

  return JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/fips_codes.json"), "utf8"));
};

/**
 * To get attachment file type
 */
module.exports.getFileType = (filename) => {
  filename = filename.toLowerCase();

  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]; //Only supported types by browser
  const videoExtensions = [".mp4", ".webm", ".mov"]; //Only playable files by browser
  const audioExtensions = [".mp3", ".wav", ".ogg", "wma"]; //Only playable files by browser

  if (imageExtensions.some((ext) => filename.endsWith(ext))) {
    return "image";
  } else if (videoExtensions.some((ext) => filename.endsWith(ext))) {
    return "video";
  } else if (audioExtensions.some((ext) => filename.endsWith(ext))) {
    return "audio";
  }

  return "other";
};

/**
 * To find Arrest type label text
 @param {Number} arrestType The number of fir arrest type
*/
module.exports.findArrestTypeLabel = (arrestType) => {
  switch (arrestType) {
    case "1":
      return "Complaint";
    case "2":
      return "Crime In Progress";
    case "3":
      return "Warrant";
    case "4":
      return "Court Summons/Citation";
    case "9":
      return "Other";
    default:
      return "Unknown";
  }
};

/**
 * To find case clerence label text
 @param {String} caseClearence The letter code
*/
module.exports.findCaseClearenceLabel = (caseClearence) => {
  switch (caseClearence) {
    case "A":
      return "A - Death of Offender";
    case "B":
      return "B - Prosecution Declined";
    case "C":
      return "C - In Custody of Other Jurisdiction";
    case "D":
      return "D - Victim Refuses to Cooperate";
    case "E":
      return "E - Juvenile/No Custody";
    case "F":
      return "F - Cleared By Arrest – Adult";
    case "G":
      return "G - Cleared By Arrest – Juvenile";
    case "H":
      return "H - Warrant Issued";
    case "I":
      return "I - Investigation Pending";
    case "J":
      return "J - Closed";
    case "K":
      return "K - Unfounded";
    case "U":
      return "U - Unknown";
    default:
      return null;
  }
};

/**
 * To find traffic person type label text
 @param {String} personType The letter code
*/
module.exports.findTrafficPersonType = (personType) => {
  switch (personType) {
    case "D":
      return "Driver";
    case "P":
      return "Pedestrian";
    case "O":
      return "Passenger/Occupant";
    case "W":
      return "Witness";
    default:
      return null;
  }
};

const color_code = [
  { value: "BGE", label: "Beige" },
  { value: "BLK", label: "Black" },
  { value: "BLU", label: "Blue" },
  { value: "BRO", label: "Brown" },
  { value: "BRZ", label: "Bronze" },
  { value: "CAM", label: "Camouflage" },
  { value: "COM", label: "Chrome" },
  { value: "CPR", label: "Copper" },
  { value: "CRM", label: "Cream" },
  { value: "GLD", label: "Gold" },
  { value: "GRN", label: "Green" },
  { value: "GRY", label: "Gray" },
  { value: "MUL", label: "Multicolored" },
  { value: "ONG", label: "Orange" },
  { value: "PLE", label: "Purple" },
  { value: "PNK", label: "Pink" },
  { value: "RED", label: "Red" },
  { value: "SIL", label: "Silver" },
  { value: "TAN", label: "Tan" },
  { value: "UNK", label: "Unknown" },
  { value: "WHI", label: "White" },
  { value: "YEL", label: "Yellow" },
  { value: "DBL", label: "Blue, Dark" },
  { value: "DGR", label: "Green, Dark" },
  { value: "AME", label: "Amethyst (Purple)" },
  { value: "LAV", label: "Lavender (Purple)" },
  { value: "MAR", label: "Burgundy (Purple)" },
  { value: "MVE", label: "Mauve (Purple)" },
  { value: "LBL", label: "Blue, Light" },
  { value: "LGR", label: "Green, Light" },
  { value: "TEA", label: "Teal (Green)" },
  { value: "TPE", label: "Taupe (Brown)" },
  { value: "TRQ", label: "Turquoise (Blue)" },
];

/**
 * To find vehicle color label text
 @param {String} vehicleColor The short code
*/
module.exports.findVehicleColorLabel = (vehicleColor) => {
  const foundColorCode = color_code.find((p) => p.value === vehicleColor);

  return (foundColorCode && foundColorCode.label) || "Unknown";
};

/**
 * To find vehicle color code from label
 @param {String} vehicleColor The long color name
*/
module.exports.findVehicleColorCode = (vehicleColor) => {
  if (!vehicleColor) {
    return "";
  }

  const words = this.matchAll(vehicleColor.trim(), /(\w+)/);

  const foundColorCode = color_code.find(
    (p) => words.filter((w) => p.label.toLowerCase().includes(w.toLowerCase())).length === words.length
  );

  return (foundColorCode && foundColorCode.value) || "UNK";
};

/**
 * To find vehicle type of use label text
 @param {String} typeOfUse The short code
*/
module.exports.findVehicleTypeOfUseLabel = (typeOfUse) => {
  switch (typeOfUse) {
    case "C":
      return "Commercial";
    case "G":
      return "Government";
    case "I":
      return "In Emergency Response";
    case "P":
      return "Personal";
    default:
      return null;
  }
};

/**
 * To find vehicle weight label text
 @param {String} vehicleWeight The short code
*/
module.exports.findVehicleWeightLabel = (vehicleWeight) => {
  switch (vehicleWeight) {
    case "1":
      return "Less than and Equal to 10K LBS";
    case "2":
      return "10,001 - 26K LBS";
    case "I":
      return ">26K LBS";
    default:
      return null;
  }
};

/**
 * To find vehicle hazardous label text
 @param {String} hazardousCode The short code
*/
module.exports.findVehicleHazardousLabel = (hazardousCode) => {
  switch (hazardousCode) {
    case "R":
      return "Material Released";
    case "P":
      return "Placard";
    default:
      return null;
  }
};

/**
 * To find vehicle special function label text
 @param {String} code The short code
*/
module.exports.findVehicleSpecialFunctionLevelLabel = (code) => {
  switch (code) {
    case "1":
      return "None";
    case "2":
      return "Taxi";
    case "3":
      return "Electronic Ride Sharing";
    case "4":
      return "School Transport";
    case "5":
      return "Bus - Transit/Commuter";
    case "6":
      return "Bus - Charter/Tour";
    case "7":
      return "Bus - Intercity";
    case "8":
      return "Bus - Shuttle";
    case "9":
      return "Bus - Other";
    case "10":
      return "Ambulance";
    case "11":
      return "Fire";
    case "12":
      return "Military";
    case "13":
      return "Police";
    case "14":
      return "Public Utility";
    case "15":
      return "Construction Equipment";
    case "16":
      return "Farm";
    case "17":
      return "Mowing";
    case "18":
      return "Snow Removal";
    case "19":
      return "Towing";
    case "20":
      return "Safety Service Patrol";
    case "21":
      return "Mail Carrier";
    case "99":
      return "Other/Unknown";
    default:
      return null;
  }
};

/**
 * To find vehicle cargo body type label text
 @param {String} code The short code
*/
module.exports.findVehicleCargoBodyTypeLabel = (code) => {
  switch (code) {
    case "1":
      return "No Cargo Body Type / Not Applicable";
    case "2":
      return "Bus";
    case "3":
      return "Vehicle Towing Another Notor Vehicle";
    case "4":
      return "Logging";
    case "5":
      return "Intermodal Container";
    case "6":
      return "Cargo Van/Enclosed Boxr";
    case "7":
      return "Grain/Chips/Gravel";
    case "8":
      return "Pole";
    case "9":
      return "Cargo Tank";
    case "10":
      return "Flat Bed";
    case "11":
      return "Dump";
    case "12":
      return "Concrete Mixer";
    case "13":
      return "Auto Trasporter";
    case "14":
      return "Garbage/Refuse";
    case "99":
      return "Other/Unknown";
    default:
      return null;
  }
};

/**
 * To find vehicle defect label text
 @param {String} code The short code
*/
module.exports.findVehicleDefectLabel = (code) => {
  switch (code) {
    case "1":
      return "Turn Signals";
    case "2":
      return "Head Lamps";
    case "3":
      return "Tail Lamps";
    case "4":
      return "Brakes";
    case "5":
      return "Steering";
    case "6":
      return "Tire Blowout";
    case "7":
      return "Worn or Slick Tires";
    case "8":
      return "Trailer Equipment Defective";
    case "9":
      return "Motor Trouble";
    case "10":
      return "Disabled From Prior Accident";
    case "11":
      return "Shared Use Paths or Trails";
    case "12":
      return "First Responder At Incident Scene";
    case "99":
      return "Other/Unknown";
    default:
      return null;
  }
};

/**
 * To convert to feet from inch
 @param {String} totalInch
*/
module.exports.convertToFeet = (totalInch) => {
  totalInch = +totalInch;

  const feet = (totalInch - (totalInch % 12)) / 12;
  const inch = totalInch % 12;

  return feet.toString() + inch.toString().padStart(2, "0");
};

module.exports.matchAll = (str, regex) => {
  const result = [];

  const myRegexp = new RegExp(regex, "g");
  let match = myRegexp.exec(str);
  while (match != null) {
    result.push(match[0]);
    match = myRegexp.exec(str);
  }

  return result;
};

const getStates = () => {
  return [
    { code: "AL", state: "Alabama" },
    { code: "AK", state: "Alaska" },
    { code: "AB", state: "Alberta, CN" },
    { code: "AZ", state: "Arizona" },
    { code: "AR", state: "Arkansas" },
    { code: "BC", state: "British Columbia, CN" },
    { code: "CA", state: "California" },
    { code: "CO", state: "Colorado" },
    { code: "CT", state: "Connecticut" },
    { code: "DE", state: "Delaware" },
    { code: "DC", state: "District Of Columbia" },
    { code: "FL", state: "Florida" },
    { code: "GA", state: "Georgia" },
    { code: "HI", state: "Hawaii" },
    { code: "ID", state: "Idaho" },
    { code: "IL", state: "Illinois" },
    { code: "IN", state: "Indiana" },
    { code: "IA", state: "Iowa" },
    { code: "KS", state: "Kansas" },
    { code: "KY", state: "Kentucky" },
    { code: "LA", state: "Louisiana" },
    { code: "ME", state: "Maine" },
    { code: "MD", state: "Maryland" },
    { code: "MA", state: "Massachusetts" },
    { code: "MI", state: "Michigan" },
    { code: "MN", state: "Minnesota" },
    { code: "MS", state: "Mississippi" },
    { code: "MO", state: "Missouri" },
    { code: "MT", state: "Montana" },
    { code: "MX", state: "Mexico (all States)" },
    { code: "NE", state: "Nebraska" },
    { code: "NV", state: "Nevada" },
    { code: "NH", state: "New Hampshire" },
    { code: "NJ", state: "New Jersey" },
    { code: "NM", state: "New Mexico" },
    { code: "NY", state: "New York" },
    { code: "NB", state: "New Brunswick, CN" },
    { code: "NF", state: "NewFoundland, CN" },
    { code: "NC", state: "North Carolina" },
    { code: "ND", state: "North Dakota" },
    { code: "NS", state: "Nova Scotia, CN" },
    { code: "NU", state: "Northwest Territory, CN" },
    { code: "OH", state: "Ohio" },
    { code: "OK", state: "Oklahoma" },
    { code: "OR", state: "Oregon" },
    { code: "PA", state: "Pennsylvania" },
    { code: "PE", state: "Prince Edward Island, CN" },
    { code: "QC", state: "Quebec, CN" },
    { code: "RI", state: "Rhode Island" },
    { code: "SK", state: "Saskatchevan, CN" },
    { code: "SC", state: "South Carolina" },
    { code: "SD", state: "South Dakota" },
    { code: "TN", state: "Tennessee" },
    { code: "TX", state: "Texas" },
    { code: "UT", state: "Utah" },
    { code: "VT", state: "Vermont" },
    { code: "VA", state: "Virginia" },
    { code: "WA", state: "Washington" },
    { code: "WV", state: "West Virginia" },
    { code: "WI", state: "Wisconsin" },
    { code: "WY", state: "Wyoming" },
    { code: "YT", state: "Yukon Territory, CN" },
    { code: "Unk", state: "Unknown" },
  ];
};

module.exports.getStates = getStates;

module.exports.getStateCode = (state) => {
  if (!state) {
    return null;
  }

  const stateLowercase = state.toLowerCase();

  const foundState = getStates().find(
    (stateObj) =>
      stateObj.state.split(",")[0].trim().toLowerCase() === stateLowercase ||
      stateObj.code.toLowerCase() === stateLowercase
  );

  if (foundState) {
    return foundState.code;
  }

  return null;
};

module.exports.findUofForceType = (uofForceType) => {
  switch (uofForceType) {
    case "01":
      return "Restraining Hold";
    case "02":
      return "Pressure Point";
    case "03":
      return "Balance Displacement";
    case "04":
      return "Take Down";
    case "05":
      return "Other Empty Hand Technique Used";
    case "06":
      return "Chemical Agent/Spray (Oleoresin Capsicum, Pepper,etc.) Used";
    case "07":
      return "Baton";
    case "08":
      return "Flashlight or Other Blunt Instrument Used";
    case "09":
      return "Canine Used";
    case "10":
      return "Electronic Control Device (ECD) Discharged";
    case "11":
      return "Rubber Bullets Used";
    case "12":
      return "Bean Bags Used";
    case "13":
      return "Other Impact Projectile Used";
    case "14":
      return "Flash Bang Used";
    case "15":
      return "Vehicle Used";
    case "16":
      return "Handgun Fired";
    case "17":
      return "Rifle Fired";
    case "18":
      return "Shotgun Fired";
    case "19":
      return "Other Firearm Fired";
    case "20":
      return "Other Weapon (non-firearm) Used";
    case "21":
      return "Explosive Device Used";
    case "22":
      return "Other Force Type Used";
    case "P":
      return "Pending further investigation";
    case "U":
      return "Unknown and is unlikely to ever be known";
    default:
      return null;
  }
};

module.exports.createFulltextSearchParams = (search) => {
  if (!search || !search.trim()) {
    return null;
  }

  const searchVal = search.trim();
  const searchValCleaned = searchVal.replace(/\W/gi, "");
  const ssn = searchValCleaned.replace(/(\d{3})-?(\d{2})-?(\d{4})/, "$1-$2-$3");

  const words = searchVal.split(" ").filter((p) => p.trim());

  let searchFilter = "";

  if (words.length > 0) {
    const filters = words
      .map((word) => {
        const isValidDate = moment(word, "MM/DD", true).isValid() || moment(word, "MM/DD/YYYY", true).isValid();

        const replaceWith = isValidDate ? "" : "_";

        return `+${word.replace(/[^a-z0-9 ]/gi, replaceWith)}*`;
      })
      .join(" ");
    searchFilter += `(${filters})`;

    const filters2 = words.map((word) => word.replace(/[^a-z0-9]/gi, "_")).join("_");

    searchFilter += ` >(${filters2}*)`;
  }

  searchFilter += ` (+${searchValCleaned}*)`;

  return {
    searchValCleaned,
    searchFilter,
    ssn,
  };
};

module.exports.createFulltextSearchParamsForVehicle = (search) => {
  if (!search || !search.trim()) {
    return null;
  }

  const searchVal = search.trim();
  const searchValCleaned = searchVal.replace(/\W/gi, "");

  const words = searchVal.split(" ").filter((p) => p.trim());

  let searchFilter = "";

  if (words.length > 0) {
    const filters = words
      .map((word) => {
        return `+${word.replace(/[^a-z0-9 ]/gi, "_")}*`;
      })
      .join(" ");
    searchFilter += `(${filters})`;

    const filters2 = words.map((word) => word.replace(/[^a-z0-9]/gi, "_")).join("_");

    searchFilter += ` >(${filters2}*)`;
  }

  searchFilter += ` (+${searchValCleaned}*)`;

  return searchFilter;
};

module.exports.renderSuccessPage = (res) => {
  res.render("form-save-success", {
    title: "Succesfully Saved",
    layout: "layout_emty.hbs",
  });
};

module.exports.htmlToText = function (input) {
  const dom = new JSDOM(input);
  return dom.window.document.documentElement.textContent?.replaceAll("\n", "");
};

module.exports.htmlToTextWithLinebreak = function (input) {
  input = input.replace(/<br>|<\/br>/gi, "\n");
  const dom = new JSDOM(input);
  let result = "";
  if (!dom.window.document.body || dom.window.document.body.children.length === 0) {
    return input;
  }

  for (const child of dom.window.document.body.children) {
    if (["DIV", "TABLE", "P", "OL", "UL"].includes(child.tagName)) {
      if (["OL", "UL"].includes(child.tagName)) {
        for (const child2 of child.children) {
          result += child2.textContent + "\n";
        }
      } else if (child.tagName === "TABLE") {
        for (const tr of child.querySelectorAll("tr")) {
          for (const td of tr.querySelectorAll("td")) {
            result += td.textContent + " ";
          }
          result += "\n";
        }
      } else {
        result += child.textContent + "\n";
      }
    } else {
      result += child.textContent;
    }
  }

  return result.replace(/<br>/gi, "\n");
};

/**
 * To find report item label text
 @param {Number} reportItemId The abbreviation id of report item
*/
module.exports.findReportItemLabel = (reportItemId) => {
  switch (reportItemId) {
    case "PT":
      return "Photo Taken";
    case "SC":
      return "Secondary Crash";
    case "OH-1P":
      return "OH-1P";
    case "OH-2":
      return "OH-2";
    case "OH-3":
      return "OH-3";
    case "OTHER":
      return "Other";
    case "PP":
      return "Private Property";
    default:
      return "Unknown";
  }
};

/**
 * To find correct driver license class
 @param {String} driverLicenseClass The class to be transformed
*/
module.exports.transformDriverLicenseClass = (driverLicenseClass) => {
  switch (driverLicenseClass) {
    case "1":
      return "A";
    case "2":
      return "B";
    case "3":
      return "C";
    case "4":
      return "D";
    default:
      return "";
  }
};

/**
 * To find unit type label
 @param {String} unitType The abbreviation of unit type
*/
module.exports.findUnitTypeLabel = (unitType) => {
  switch (unitType) {
    case "1":
      return "Passenger Car";
    case "2":
      return "Passenger Van (Minivan)";
    case "3":
      return "Sport Utility Vehicle";
    case "4":
      return "Pick Up";
    case "5":
      return "Cargo Van";
    case "6":
      return "Van(9-15 Seats)";
    case "7":
      return "Motorcycle 2-Wheeled";
    case "8":
      return "Motorcycle 3-Wheeled";
    case "9":
      return "Autocycle";
    case "10":
      return "Moped or Motorized Bicycle";
    case "11":
      return "All Terrain Vehicle (ATV/UTV)";
    case "12":
      return "Golf Cart";
    case "13":
      return "Snowmobile";
    case "14":
      return "Single Unit Truck";
    case "15":
      return "Semi-Tractor";
    case "16":
      return "Farm Equipment";
    case "17":
      return "Motorhome";
    case "18":
      return "Limo (Livery Vehicle)";
    case "19":
      return "Bus (16+Passengers)";
    case "20":
      return "Other Vehicle";
    case "21":
      return "Heavy Equipment";
    case "22":
      return "Animal With Rider or Anima-Drawn Vehicle";
    case "23":
      return "Pedestrian/Skater";
    case "24":
      return "Wheelchair (Anytype)";
    case "25":
      return "Other Non-Motorist";
    case "26":
      return "Bicycle";
    case "27":
      return "Train";
    case "99":
      return "Unknown or Hit/Skip";
    default:
      return "";
  }
};

/**
 * To format person height as "X'x
 @param {String} height The height value to be transformed
*/
module.exports.transformHeight = (height) => {
  if (!height) {
    return null;
  }

  const heightValue = height.toString();

  if (heightValue.length === 3) {
    return `${heightValue[0]}’${heightValue.slice(1)}`;
  }
};

module.exports.findOperatingType = (type) => {
  switch (type) {
    case "P":
      return "Passenger (P)";
    case "M":
      return "Motorcycle (M)";
    case "B":
      return "Bicycle (B)";
    case "PR":
      return "Parked (PR)";
    case "C":
      return "Commercial (C)";
    case "O":
      return "Other (O)";
    default:
      return "Unknown";
  }
};
