const axios = require("axios");
const { SuccessResult, ErrorResult } = require("./result");

module.exports.isMethodOfEntryCrime = (orc, larceny) => {
  const methodOfEntryOffense = [
    "2911.11A1",
    "2911.11A2",
    "2911.12A1",
    "2911.12A2",
    "2911.12A3",
    "2911.12B",
    "2911.13A",
    "2911.13B",
  ];

  const methodOfEntryLarcenyTypes = ["23F", "23G", "240"];

  return methodOfEntryOffense.includes(orc) || methodOfEntryLarcenyTypes.includes(larceny);
};

module.exports.getPropertyOrcCodes = () => {
  return [
    "2905.01",
    "2905.02",
    "2905.03",
    "2905.05",
    "2911.11",
    "2913.51",
    "2921.02",
    "2921.21",
    "2921.23",
    "2911.12",
    "2911.13",
    "240",
    "23A",
    "23B",
    "23C",
    "23D",
    "23E",
    "23F",
    "23G",
    "23H",
    "2905.11",
    "2905.12",
    "2907.39C",
    "2909.29",
    "2913.02",
    "2913.04B",
    "2913.041",
    "2913.05",
    "2913.06",
    "2913.21",
    "2913.02E",
    "2913.34",
    "2913.40",
    "2913.401",
    "2913.41",
    "2913.421",
    "2913.43",
    "2913.44",
    "2913.441",
    "2913.45",
    "2913.46",
    "2913.47",
    "2913.48",
    "2913.49",
    "2913.72",
    "2915.05",
    "2921.12",
    "2921.13",
    "2921.15",
    "2921.41",
    "2921.51",
    "2921.52",
    "2925.23",
    "4549.42",
    "4549.43",
    "4549.44",
    "4549.45",
    "4549.46",
    "4549.62",
    "4729.61",
    "2909.02",
    "2909.03",
    "2915.02",
    "2915.03",
    "2915.04",
    "2915.05B",
    "2915.06",
    "2915.07",
    "2915.081",
    "2915.082",
    "2915.09",
    "2915.091",
    "2915.092",
    "2915.094",
    "2915.10",
    "2915.11",
    "2915.12",
    "2915.13",
    "2921.36A2",
    "2925.02",
    "2925.03",
    "2925.04",
    "2925.05",
    "2925.06",
    "2925.11",
    "2925.12",
    "2925.13",
    "2925.14",
    "2925.24",
    "2925.31",
    "2925.32",
    "2925.33",
    "2925.36",
    "4729.51",
    "2925.22",
    "2925.37",
    "2913.31",
    "2913.32",
    "2913.33",
    "2909.05",
    "2909.06",
    "2909.08",
    "2909.09",
    "2909.101",
    "2909.07",
    "2909.10",
    "2911.31",
    "2911.32",
    "2911.01",
    "2911.02",
    "2913.00",
    "2923.1211",
    "2913.30",
  ];
};

module.exports.isLarcenyOffense = (orc) => {
  if (!orc) {
    return false;
  }

  const orcs = ["2913.12", "2905.32", "2913.02"];

  let result = orcs.includes(orc.substring(0, 7));

  if (orc === "2913.02E") {
    result = false;
  }

  return result;
};

module.exports.sendValidateRequest = async (oibrsData, type, save = true) => {
  try {
    let response;

    try {
      if (process.env.mode === "production") {
        const { data } = await axios.post(
          `https://dpsoibrspextapi.azurewebsites.net/api/incident/Validate${save ? "AndSave" : ""}${
            type === "incident" ? "Offense" : "UOF"
          }`,
          oibrsData,
          {
            headers: {
              "api-key": process.env.oibrs_api_key,
            },
          }
        );
        response = data;
      }
    } catch (err) {
      throw { message: err.message };
    }

    if (!response.data.incidentIsValid) {
      throw response;
    } else {
      return new SuccessResult(response);
    }
  } catch (err) {
    return new ErrorResult(
      err.response ? err.response.statusText : err.message || "Oibrs validation request failed",
      err
    );
  }
};

function isCrimeAgainstIndividuals(victimType) {
  return ["I", "P"].includes(victimType);
}

function isNegligentHomicide(orcNo) {
  if (!orcNo) {
    return false;
  }

  orcNo = orcNo.slice(0, 7);

  return ["2903.05", "2903.06"].includes(orcNo);
}

function isAggravatedAssaultOrMurder(nibrsCode) {
  if (!nibrsCode) {
    return false;
  }

  const nibrsCodes = nibrsCode
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p);

  return ["09A", "13A"].some((code) => nibrsCodes.includes(code));
}

function isResistingArrestOffenseRequiringAggravatedCircumstances(victimType, orcNo, injuryType, weaponForceType) {
  if (orcNo === "2921.33" || orcNo === "2921.33A") {
    if (victimType === "P" && injuryType >= 1 && injuryType <= 6) {
      return true;
    }

    if (victimType === "P" && !["16", "17", "18", "40", "80", "99", "U"].includes(weaponForceType)) {
      return true;
    }
  }

  if (orcNo === "2921.33B") {
    if (victimType === "P" && injuryType >= 1 && injuryType <= 6) {
      return true;
    }

    if (victimType === "P" && !["16", "17", "18", "40", "80", "99", "U"].includes(weaponForceType)) {
      return true;
    }
  }

  if (orcNo === "2921.33C1" || orcNo === "2921.33C2") {
    return true;
  }

  return false;
}

function isAggravatedAssaultHomicideCircumstancesRequired(victimType, orcNo, nibrsCode, injuryType, weaponForceType) {
  return (
    (isCrimeAgainstIndividuals(victimType) && (isNegligentHomicide(orcNo) || isAggravatedAssaultOrMurder(nibrsCode))) ||
    isResistingArrestOffenseRequiringAggravatedCircumstances(victimType, orcNo, injuryType, weaponForceType)
  );
}

module.exports.isAggravatedAssaultHomicideCircumstancesRequired = isAggravatedAssaultHomicideCircumstancesRequired;

function getNegligentHomicideCircumstances() {
  return ["30", "31", "32", "33", "34"];
}

function getAggravatedAssaultMurderCircumstances(nibrsCode = "") {
  if (!isAggravatedAssaultOrMurder(nibrsCode)) {
    return [];
  }

  const result = ["01", "02", "03", "04", "05", "06", "08", "09", "U"];

  const nibrsCodes = nibrsCode
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p);

  if (!nibrsCodes.includes("13A")) {
    result.push("07");
  }

  return result;
}

module.exports.isValidAggravatedAssaultHomicideCircumstancesCode = (
  victimType,
  orcNo,
  nibrsCode,
  circumtanceCode,
  injuryType,
  weaponForceType
) => {
  if (!isAggravatedAssaultHomicideCircumstancesRequired(victimType, orcNo, nibrsCode, injuryType, weaponForceType)) {
    return false;
  }

  if (isResistingArrestOffenseRequiringAggravatedCircumstances(victimType, orcNo, injuryType, weaponForceType)) {
    return ["01", "02", "03", "04", "05", "06", "08", "09", "U"].includes(circumtanceCode);
  } else if (isNegligentHomicide(orcNo)) {
    return getNegligentHomicideCircumstances().includes(circumtanceCode);
  } else {
    return getAggravatedAssaultMurderCircumstances(nibrsCode).includes(circumtanceCode);
  }
};

module.exports.isDrugNarcoticViolation = (orcNo) => {
  if (!orcNo) {
    return false;
  }

  const orcFirstSeven = orcNo.substring(0, 7);

  return (
    orcNo === "2921.36A2" ||
    orcFirstSeven === "2925.02" ||
    orcFirstSeven === "2925.03" ||
    orcFirstSeven === "2925.04" ||
    orcFirstSeven === "2925.05" ||
    orcFirstSeven === "2925.06" ||
    orcFirstSeven === "2925.11" ||
    orcFirstSeven === "2925.13" ||
    orcFirstSeven === "2925.24" ||
    orcFirstSeven === "2925.31" ||
    orcFirstSeven === "2925.32" ||
    orcFirstSeven === "2925.33" ||
    orcFirstSeven === "2925.36" ||
    orcFirstSeven == "4729.51"
  );
};
