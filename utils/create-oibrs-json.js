const { SuccessResult, ErrorResult } = require("./result");
const {
  isMethodOfEntryCrime,
  getPropertyOrcCodes,
  isLarcenyOffense,
  isValidAggravatedAssaultHomicideCircumstancesCode,
  isDrugNarcoticViolation,
} = require("./oibrs-helper");
const { getStateCode } = require("./helper");
const _ = require("lodash");
const moment = require("moment");
const { trasformVictimSeqNumbers } = require("../department/rms/incident/suspect/suspect.util");

function getToMax40Character(address) {
  const words = address.trim().split(" ");
  let result = "";

  for (const word of words) {
    if ((result + " " + word).length <= 40) {
      result += " " + word;
    } else {
      break;
    }
  }

  return result.trim() || address;
}

function splitAddress(address) {
  if (!address) {
    return ["", ""];
  }

  address = address.trim();

  let address2 = "";

  let [address1] = address.split(",");

  if (address1.length > 40) {
    address1 = getToMax40Character(address1);
  }

  address2 = address.slice(address1.length).replace(/^[, ]+/g, "");

  if (address2.length > 40) {
    address2 = getToMax40Character(address2);
  }

  address1 = address1.trim().slice(0, 40);
  address2 = address2.trim().slice(0, 40);

  return [address1, address2];
}

function addRaceAndEthnicity(race, ethnicity, arr = [], key = "RaceAndEthnicity") {
  const raceObject = {};
  const ethnicityObject = {};
  if (race === "U" || race === "F") {
    if (!ethnicity || ethnicity === "U" || ethnicity === "F") {
      raceObject[key] = race;
      arr = [raceObject];
    } else {
      ethnicityObject[key] = ethnicity;
      arr = [ethnicityObject];
    }
  } else if (ethnicity === "U" || ethnicity === "F") {
    if (!race || race === "U" || race === "F") {
      ethnicityObject[key] = ethnicity;
      arr = [ethnicityObject];
    } else {
      raceObject[key] = race;
      arr = [raceObject];
    }
  } else {
    if (race) {
      raceObject[key] = race;
      arr.push(raceObject);
    }
    if (ethnicity) {
      ethnicityObject[key] = ethnicity;
      arr.push(ethnicityObject);
    }
  }

  if (arr.some((p) => p[key] !== "F" && p[key] !== "U")) {
    arr = arr.filter((p) => p[key] !== "F" && p[key] !== "U");
  }

  return arr;
}

const reduceIncidentNoTo12Characters = (incidentNo) => {
  if (!incidentNo) {
    return "";
  }

  return incidentNo.slice(0, 4) + parseInt(incidentNo.slice(4)).toString().padStart(8, "0");
};

module.exports.createOibrsJson = async function ({ incidentNo, pool, department_ori, incidentRecords = [] }) {
  let db;

  try {
    db = await pool.getConnection();

    if (incidentRecords.length === 0 && incidentNo) {
      incidentRecords = await db.query(
        `
          SELECT 
              id, 
              incident_no, 
              use_of_force, 
              orc_no,
              IF(cargo_theft = 'Yes','Y','N') as CargoTheft,
              DATE_FORMAT(date_time, '%Y-%m-%dT%T') as UofIncidentDateTime,
              IFNULL(location_type,'') AS LocationTypeCode,
              incident.zip_code as LocationZip, 
              incident.address2 as LocationAddress1, 
              incident.city as LocationCity, 
              UPPER(incident.state) as LocationState, 
              SUBSTRING(incident.PointY, 1, 11) as LocationLatitude, 
              SUBSTRING(incident.PointX, 1, 11) as LocationLongitude,
              date_format(date_time,'%Y%m%d') as IncidentDate, 
              date_format(date_time,'%H%i') as IncidentTime,
              nibr_code
          FROM incident 
          LEFT JOIN orc_codes on incident.orc_no = orc_codes.ORC 
          WHERE 
              deleted is null 
              AND 
              incident_no = ?
          GROUP BY incident.id
        `,
        [incidentNo]
      );
    }

    if (incidentRecords.length === 0) {
      throw new Error(`No incident records found for ${incidentNo || "unknown incident"}`);
    }

    const oibrsIncidentData = {
      offenseAdminData: null,
      offenseOffenseDatas: [],
      offensePropertyDatas: [],
      offenseSuspectDatas: [],
      offenseVictimDatas: [],
      offenseArresteeDatas: [],
    };

    const oibrsUofData = {
      Action: "Add",
      ActionTime: moment().format("MM/DD/YYYY HH:mm:ss"),
      UOFAdminData: null,
      UOFOfficerDatas: [],
      UOFSubjectDatas: [],
    };

    let lastSuspectSeqNo = 0,
      lastVictimSeqNo = 0,
      lastArresteeSeqNo = 0,
      lastUofSubjectSeqNo = 0,
      lastUofOfficerSeqNo = 0;

    const suspectMasterNameIds = new Map();
    const victimMasterIds = new Map();
    const arrestMasterNameIds = new Map();
    const uofSubjectMasterNameIds = new Map();
    const uofOfficerIds = new Map();

    for (const incident of incidentRecords) {
      const isNibrsIncident = incident.nibr_code;
      const isOffense = incident.orc_no && incident.orc_no.trim().length >= 2;
      const isUOF = incident.use_of_force === "Y" && isOffense;

      incident.LocationState = getStateCode(incident.LocationState) || incident.LocationState;

      const [Address1, Address2] = splitAddress(incident.LocationAddress1);

      if (isUOF) {
        if (!oibrsUofData.UOFAdminData) {
          oibrsUofData.UOFAdminData = {
            ORINumber: department_ori,
            AgencyIncidentNumber: reduceIncidentNoTo12Characters(incident.incident_no),
            IncidentDate: incident.IncidentDate,
            IncidentTime: incident.IncidentTime,
            NumberOfficersOutsideAgency: 0,
            UOFTotalNumberSubjects: null,
            UOFTotalOfficersInvolved: 0,
            CriminalReportIncidentNumber: "",
            OfficerApproachSubject: "",
            Ambush: "",
            SupervisorSeniorPresentConsulted: "",
            OtherORIandIncidentNumbers: [],
            UOFORCOffenses: [],
            IncidentDateTime: incident.UofIncidentDateTime,
            InitialContactCircumstances: "",
          };
        }
      }

      if (isNibrsIncident) {
        if (!oibrsIncidentData.offenseAdminData) {
          oibrsIncidentData.offenseAdminData = (
            await db.query(
              `
                SELECT 
                    '${department_ori}' as ORINumber, 
                    incident.incident_no as AgencyIncidentNumber, 
                    date_format(date_time,'%Y%m%d') as IncidentDate, 
                    date_format(date_time,'%H%i') as IncidentTime,
                    date_format(date_time,'%Y%m%d') as ReportDate,
                    date_format(date_time,'%H%i') as ReportTime,
                    if(case_clearences is null or case_clearences='','J',case_clearences) as CaseClearances, 
                    date_format(clearence_date,'%Y%m%d') as CaseClearanceDate, 
                    incident.zip_code as LocationZip, 
                    '' as LocationAddress1, 
                    '' as LocationAddress2, 
                    incident.city as LocationCity, 
                    UPPER(incident.state) as LocationState, 
                    SUBSTRING(incident.PointY, 1, 11) as LocationLatitude, 
                    SUBSTRING(incident.PointX, 1, 11) as LocationLongitude,
                    IF(cargo_theft = 'Yes','Y','N') as CargoTheft,
                    NULL as ZeroMonth
                FROM incident 
                WHERE incident.id=?`,
              [incident.id]
            )
          )[0];

          oibrsIncidentData.offenseAdminData.LocationState =
            getStateCode(oibrsIncidentData.offenseAdminData.LocationState) ||
            oibrsIncidentData.offenseAdminData.LocationState;

          oibrsIncidentData.offenseAdminData.LocationAddress1 = Address1;
          oibrsIncidentData.offenseAdminData.LocationAddress2 = Address2;
          oibrsIncidentData.offenseAdminData.AgencyIncidentNumber = reduceIncidentNoTo12Characters(
            oibrsIncidentData.offenseAdminData.AgencyIncidentNumber
          );
        }

        if (incident.CargoTheft === "Y") {
          oibrsIncidentData.offenseAdminData.CargoTheft = "Y";
        }
      }

      const [offenseData] = await db.query(
        `
            SELECT 
                '${department_ori}' as ORINumber, 
                incident.incident_no as AgencyIncidentNumber, 
                REPLACE(REPLACE(Replace(incident.orc_no,'.',''),'(',''),')','') as ORCOffenseCode, 
                attempted_completed as OffenseAttemptedCompleted, 
                IFNULL(larceny_type,'') as LarcenyType,
                forced,
                entry_method,
                side as DirectionOfEntry1, 
                opening as PlaceOfEntry,
                GROUP_CONCAT(DISTINCT suspect.suspected_of_using) as SuspectedOfUsingList, 
                location_type as LocationTypeCode, 
                NULLIF(LPAD(IFNULL(number_of_premise,''),2,'0'),'00') as NumberOfPremisesEntered, 
                operation_method as MethodOfOperations, 
                criminal_activity as TypeCriminalActivities, 
                weapon_force_type as TypeOfWeaponsForceUsed, 
                IFNULL(IF(hate_bias = 'B', hate_type, hate_bias),'N') as HateBiasCrime
            FROM incident 
            LEFT JOIN suspect on incident.id = suspect.incident_id 
            WHERE 
                length(incident.orc_no) > 3 
                AND 
                incident.id = ? 
                AND 
                incident.deleted is null 
                AND 
                suspect.deleted is null 
            GROUP BY incident.id 
            LIMIT 1`,
        [incident.id]
      );

      if (offenseData) {
        if (!isLarcenyOffense(incident.orc_no)) {
          offenseData.LarcenyType = "";
        }

        offenseData.AgencyIncidentNumber = reduceIncidentNoTo12Characters(offenseData.AgencyIncidentNumber);

        let methodOfEntry = "0";
        if (offenseData.entry_method && isMethodOfEntryCrime(incident.orc_no, offenseData.LarcenyType)) {
          //Burglary or Breaking-Entering or Motor Theft
          if (offenseData.LarcenyType && ["23F", "23G", "240"].includes(offenseData.LarcenyType)) {
            //Motor theft
            methodOfEntry = (offenseData.forced + offenseData.entry_method.padEnd(2)).padEnd(5, "0");
          } else {
            methodOfEntry = (
              offenseData.forced +
              offenseData.entry_method +
              (offenseData.PlaceOfEntry || "0") +
              (offenseData.DirectionOfEntry1 || "0")
            ).padEnd(5, "0");
          }
        }

        offenseData.MethodOfEntry = methodOfEntry;

        if (offenseData.SuspectedOfUsingList) {
          offenseData.SuspectedOfUsingList = offenseData.SuspectedOfUsingList.split(",").map((p) => ({
            SuspectedOfUsingCode: p.trim(),
          }));
        } else {
          offenseData.SuspectedOfUsingList = [];
        }

        if (offenseData.LocationTypeCode) {
          offenseData.LocationList = [{ LocationTypeCode: offenseData.LocationTypeCode }];
        } else {
          offenseData.LocationList = [];
        }

        if (offenseData.MethodOfOperations) {
          offenseData.MethodOfOperations = offenseData.MethodOfOperations.split(",").map((p) => ({
            Operation: p.trim(),
            SeqNo: 0,
          }));
        } else {
          offenseData.MethodOfOperations = [];
        }

        if (offenseData.TypeCriminalActivities) {
          offenseData.TypeCriminalActivities = offenseData.TypeCriminalActivities.split(",").map((p) => ({
            CriminalActivity: p.trim(),
          }));
        } else {
          offenseData.TypeCriminalActivities = [];
        }

        if (offenseData.TypeOfWeaponsForceUsed) {
          offenseData.TypeOfWeaponsForceUsed = offenseData.TypeOfWeaponsForceUsed.split(",").map((p) => ({
            WeaponForce: p.trim(),
          }));
        } else {
          offenseData.TypeOfWeaponsForceUsed = [];
        }

        if (isNibrsIncident) {
          oibrsIncidentData.offenseOffenseDatas.push({
            ORINumber: offenseData.ORINumber,
            AgencyIncidentNumber: offenseData.AgencyIncidentNumber,
            ORCOffenseCode: offenseData.ORCOffenseCode,
            OffenseAttemptedCompleted: offenseData.OffenseAttemptedCompleted,
            LarcenyType: offenseData.LarcenyType,
            MethodOfEntry: offenseData.MethodOfEntry,
            SuspectedOfUsingList: offenseData.SuspectedOfUsingList,
            LocationList: offenseData.LocationList,
            NumberOfPremisesEntered: offenseData.NumberOfPremisesEntered,
            MethodOfOperations: offenseData.MethodOfOperations,
            TypeCriminalActivities: offenseData.TypeCriminalActivities,
            TypeOfWeaponsForceUsed: offenseData.TypeOfWeaponsForceUsed,
            HateBiasCrime: offenseData.HateBiasCrime,
          });
        }
      }

      if (isNibrsIncident) {
        const isPropertyOffense = getPropertyOrcCodes().some(
          (orcNo) =>
            incident.orc_no.substring(0, 7) === orcNo ||
            incident.orc_no.substring(0, 8) === orcNo ||
            incident.orc_no.substring(0, 9) === orcNo
        );

        const isDrugNarcoticOffense = isDrugNarcoticViolation(incident.orc_no);

        if (isPropertyOffense) {
          const properties = await db.query(
            `
            SELECT 
              '${department_ori}' as ORINumber, 
              incident_no as AgencyIncidentNumber, 
              PropertyType AS TypeOfPropertyLossEtc,
              IF(Description IS NULL OR Description = '' OR Description = '0', '0', LPAD(Description,2,'0')) AS PropertyDescription,
              IF(prop_value > 0 , REPLACE(CAST(prop_value as decimal(9,2)),'.00','') , IFNULL(prop_value,'')) AS PropertyValue,
              IFNULL(DATE_FORMAT(IF(PropertyType = '7', DateRecovered, NULL),'%Y%m%d'),'0') AS PropertyDateRecovered,
              NumberofStolenMotorVeh AS NumberOfStolenMotorVehicles,
              NumberofRecoveredMotoVeh AS NumberOfRecoveredMotorVehicles,
              IF (SuspectedDrugType IS NULL OR SuspectedDrugType = '','', LPAD(SuspectedDrugType,2,'0')) AS SuspectedDrugType,
              CASE 
                WHEN EstimatedDrugQuantity IS NULL OR EstimatedDrugQuantity = '' OR EstimatedDrugQuantity = '0' THEN '0'
                WHEN DrugMeasurementType = 'XX' AND EstimatedDrugQuantity = '1' THEN '1'
                ELSE CAST(EstimatedDrugQuantity AS DECIMAL(10,3)) 
              END AS EstimatedDrugQuantity,
              IFNULL(DrugMeasurementType,'') AS TypeOfDrugMeasurement
            FROM property 
            WHERE 
              incident_id=?  
              AND 
              nibrs='Y'
              AND
              deleted IS NULL
            `,
            [incident.id]
          );

          properties.forEach((property) => {
            property.AgencyIncidentNumber = reduceIncidentNoTo12Characters(property.AgencyIncidentNumber);
          });

          let propertyGroups = {};

          if (properties.length) {
            propertyGroups = _.groupBy(properties, "TypeOfPropertyLossEtc");
          }

          for (const TypeOfPropertyLossEtc in propertyGroups) {
            if (Object.hasOwnProperty.call(propertyGroups, TypeOfPropertyLossEtc)) {
              const groupedProperties = propertyGroups[TypeOfPropertyLossEtc];

              let propertyGroup = oibrsIncidentData.offensePropertyDatas.find(
                (prop) => prop.TypeOfPropertyLossEtc === TypeOfPropertyLossEtc
              );

              if (!propertyGroup) {
                propertyGroup = {
                  ORINumber: groupedProperties[0].ORINumber,
                  AgencyIncidentNumber: groupedProperties[0].AgencyIncidentNumber,
                  TypeOfPropertyLossEtc,
                  Properties: [],
                  NumberOfStolenMotorVehicles: 0,
                  NumberOfRecoveredMotorVehicles: 0,
                  SuspectedDrugs: [],
                };

                oibrsIncidentData.offensePropertyDatas.push(propertyGroup);
              }

              for (const groupedProperty of groupedProperties) {
                if (TypeOfPropertyLossEtc != "1" && TypeOfPropertyLossEtc !== "U") {
                  propertyGroup.Properties.push({
                    PropertyDescription: groupedProperty.PropertyDescription,
                    PropertyValue: groupedProperty.PropertyValue,
                    PropertyDateRecovered: groupedProperty.PropertyDateRecovered,
                  });

                  propertyGroup.NumberOfStolenMotorVehicles +=
                    parseInt(groupedProperty.NumberOfStolenMotorVehicles) || 0;

                  propertyGroup.NumberOfRecoveredMotorVehicles +=
                    parseInt(groupedProperty.NumberOfRecoveredMotorVehicles) || 0;
                }

                if (groupedProperty.SuspectedDrugType && isDrugNarcoticOffense) {
                  const foundSuspectedDrug = propertyGroup.SuspectedDrugs.find(
                    (p) =>
                      p.SuspectedDrugType === groupedProperty.SuspectedDrugType &&
                      p.TypeOfDrugMeasurement === groupedProperty.TypeOfDrugMeasurement
                  );

                  if (foundSuspectedDrug) {
                    const newQuantity =
                      (+foundSuspectedDrug.EstimatedDrugQuantity || 0) + (+groupedProperty.EstimatedDrugQuantity || 0);

                    foundSuspectedDrug.EstimatedDrugQuantity = newQuantity === 0 ? "0" : newQuantity.toFixed(3);
                  } else {
                    propertyGroup.SuspectedDrugs.push({
                      SuspectedDrugType: groupedProperty.SuspectedDrugType,
                      TypeOfDrugMeasurement: groupedProperty.TypeOfDrugMeasurement,
                      EstimatedDrugQuantity: groupedProperty.EstimatedDrugQuantity,
                    });
                  }
                }
              }

              //It should be string otherwise causes validation error
              propertyGroup.NumberOfStolenMotorVehicles = propertyGroup.NumberOfStolenMotorVehicles.toString();

              propertyGroup.NumberOfRecoveredMotorVehicles = propertyGroup.NumberOfRecoveredMotorVehicles.toString();
            }
          }
        }

        const arrests = await db.query(
          `
            SELECT 
                '${department_ori}' as ORINumber, 
                incident.incident_no as AgencyIncidentNumber,
                LPAD(arrest_seq_no,2,'0') AS ArresteeSequenceNumber,
                incident.incident_no  AS IncidentTransactionNumber,
                DATE_FORMAT(arrest_date,'%Y%m%d') as ArrestDate,
                arrest_type AS ArrestType,
                armed_with AS Arm,
                calculateAge( date_of_birth, IFNULL(incident.occurred_from, incident.date_time) ) as AgeOfArresteeFrom,
                sex AS SexOfArrestee,
                IFNULL(NULLIF(race,'H'),'') AS Race,
                IF(ethnicity IS NOT NULL AND ethnicity <> '' AND ethnicity <> 'N', ethnicity, IF(race='H','H','')) AS Ethnicity,
                hair_color AS HairColorOfArrestee,
                eye_color AS EyeColorOfArrestee,
                height AS HeightOfArresteeFrom,
                IF (weight IS NULL OR weight = '' OR weight = '0', '', LPAD(weight,3,'0')) AS WeightOfArresteeFrom,
                resident_status AS ArresteeResidentStatusInJurisdiction,
                IFNULL(juvenile_disposition,'') AS DispositionOfArresteeUnder18,
                theft_codes AS LarcenyType,
                arrest.id,
                master_name_id,
                arrest.orc_no
            FROM incident 
            JOIN arrest on incident.id = arrest.incident_id 
            WHERE 
                incident.id = ? 
                AND 
                incident.deleted is null 
                AND 
                arrest.deleted is null 
            GROUP BY arrest.id
            ORDER BY arrest_seq_no`,
          [incident.id]
        );

        for (const arrest of arrests) {
          let arrestData;

          arrest.AgencyIncidentNumber = reduceIncidentNoTo12Characters(arrest.AgencyIncidentNumber);

          arrest.IncidentTransactionNumber = arrest.AgencyIncidentNumber;

          if (!arrestMasterNameIds.has(arrest.master_name_id)) {
            lastArresteeSeqNo++;

            arrestData = {
              ORINumber: arrest.ORINumber,
              AgencyIncidentNumber: arrest.AgencyIncidentNumber,
              ArresteeSequenceNumber: lastArresteeSeqNo.toString().padStart(2, "0"),
              IncidentTransactionNumber: arrest.IncidentTransactionNumber,
              ArrestDate: arrest.ArrestDate,
              ArrestType: arrest.ArrestType,
              MultipleArresteeSegmentsIndicator: "C",
              ORCArrestOffenseCodes: [],
              ArrestLarcenyTypes: [],
              ArresteeWasArmedWith: [],
              AgeOfArresteeFrom: arrest.AgeOfArresteeFrom ? arrest.AgeOfArresteeFrom.toString().padStart(2, "0") : "",
              AgeOfArresteeTo: "",
              SexOfArrestee: arrest.SexOfArrestee,
              RaceAndEthnicitiesOfArrestee: [],
              HairColorOfArrestee: arrest.HairColorOfArrestee,
              EyeColorOfArrestee: arrest.EyeColorOfArrestee,
              HeightOfArresteeFrom: arrest.HeightOfArresteeFrom,
              HeightOfArresteeTo: "",
              WeightOfArresteeFrom: arrest.WeightOfArresteeFrom,
              WeightOfArresteeTo: "",
              ScarsMarksTattoosAndOtherCharacteristics: [],
              ArresteeResidentStatusInJurisdiction: arrest.ArresteeResidentStatusInJurisdiction,
              DispositionOfArresteeUnder18: arrest.DispositionOfArresteeUnder18,
            };

            arrestData.RaceAndEthnicitiesOfArrestee = addRaceAndEthnicity(
              arrest.Race,
              arrest.Ethnicity,
              arrestData.RaceAndEthnicitiesOfArrestee
            );

            oibrsIncidentData.offenseArresteeDatas.push(arrestData);
            arrestMasterNameIds.set(arrest.master_name_id, arrestData);
          }

          arrestData = arrestMasterNameIds.get(arrest.master_name_id);

          if (arrest.orc_no) {
            const offenses = arrest.orc_no.split(",").map((p) => p.trim());

            const arrestCodes = await db.query(
              "SELECT REPLACE(REPLACE(Replace(ORC,'.',''),'(',''),')','') AS ORCArrestCode FROM orc_codes WHERE ORC IN (?) AND nibr_code = 1",
              [offenses]
            );

            for (const { ORCArrestCode } of arrestCodes) {
              if (ORCArrestCode && !arrestData.ORCArrestOffenseCodes.some((p) => p.ORCArrestCode === ORCArrestCode)) {
                arrestData.ORCArrestOffenseCodes.push({
                  ORCArrestCode: ORCArrestCode,
                });
              }
            }
          }

          if (arrest.Arm && !arrestData.ArresteeWasArmedWith.some((p) => p.Arm === arrest.Arm)) {
            arrestData.ArresteeWasArmedWith.push({ Arm: arrest.Arm });
          }

          if (arrest.LarcenyType && !arrestData.ArrestLarcenyTypes.some((p) => p.LarcenyType === arrest.LarcenyType)) {
            arrestData.ArrestLarcenyTypes.push({
              LarcenyType: arrest.LarcenyType,
            });
          }
        }
      }

      if (isUOF) {
        const sequenceNumberMap = new Map();

        const uofSubjects = await db.query(
          `
              SELECT 
                  '${department_ori}' as ORINumber, 
                  incident.incident_no as AgencyIncidentNumber,
                  LPAD(arrest_seq_no,2,'0') AS SubjectSequenceNumber,
                  calculateAge( date_of_birth, IFNULL(incident.occurred_from, incident.date_time) ) as AgeofSubjectFrom,
                  sex AS SexofSubject,
                  race AS RaceandEthnicityofSubject,
                  height AS HeightofSubjectFrom,
                  LPAD(weight,3,'0') AS WeightofSubjectFrom,
                  IFNULL(weapon_believed,'') AS Armed,
                  IFNULL(impairement,'') AS Impaired,
                  IFNULL(resist,'') AS DidtheSubjectResist,
                  IFNULL(threat,'') AS ThreatDirection,
                  IFNULL(if_yes,'') AS impairements,
                  IFNULL(resistance_level,'') AS ResistanceWeapon,
                  IFNULL(IF(injury_type = '00','0', injury_type),'') AS SubjectInjury,
                  IFNULL(uof.outside_force,0) AS NumberOfficersOutsideAgency,
                  IFNULL(uof.officer_approach,'') AS OfficerApproachSubject,
                  IFNULL(uof.consulted_prior,'') AS SupervisorSeniorPresentConsulted,
                  IFNULL(uof.initial_contact_circumstance,'') AS InitialContactCircumstances,
                  IFNULL(uof.ambush,'') AS Ambush,
                  IFNULL(uof.report,'') AS CriminalReportIncidentNumber,
                  uof.id,
                  master_name_id,
                  date_of_birth,
                  DATEDIFF(incident.date_time, date_of_birth) as ageDays,
                  REPLACE(TRIM(uof.response),'.','') as UOFORCOffenseCode
              FROM incident 
              JOIN uof on incident.id = uof.incident_id 
              WHERE 
                  incident.id = ? 
                  AND 
                  incident.deleted is null 
                  AND 
                  uof.deleted is null
                  AND 
                  subject_type = 'S' 
              GROUP BY uof.id
              ORDER BY arrest_seq_no`,
          [incident.id]
        );

        for (const uofSubject of uofSubjects) {
          uofSubject.AgencyIncidentNumber = reduceIncidentNoTo12Characters(uofSubject.AgencyIncidentNumber);

          oibrsUofData.UOFAdminData.NumberOfficersOutsideAgency += +uofSubject.NumberOfficersOutsideAgency;

          if (uofSubject.OfficerApproachSubject && oibrsUofData.UOFAdminData.OfficerApproachSubject !== "Y") {
            oibrsUofData.UOFAdminData.OfficerApproachSubject = uofSubject.OfficerApproachSubject;
          }

          if (uofSubject.Ambush && oibrsUofData.UOFAdminData.Ambush !== "Y") {
            oibrsUofData.UOFAdminData.Ambush = uofSubject.Ambush;
          }

          if (
            uofSubject.SupervisorSeniorPresentConsulted &&
            oibrsUofData.UOFAdminData.SupervisorSeniorPresentConsulted !== "Y"
          ) {
            oibrsUofData.UOFAdminData.SupervisorSeniorPresentConsulted = uofSubject.SupervisorSeniorPresentConsulted;
          }

          oibrsUofData.UOFAdminData.InitialContactCircumstances =
            oibrsUofData.UOFAdminData.InitialContactCircumstances || uofSubject.InitialContactCircumstances;

          if (uofSubject.InitialContactCircumstances === "01" || uofSubject.InitialContactCircumstances === "02") {
            if (
              !oibrsUofData.UOFAdminData.UOFORCOffenses.some(
                (offenseCode) => offenseCode.UOFORCOffenseCode === uofSubject.UOFORCOffenseCode
              )
            ) {
              oibrsUofData.UOFAdminData.UOFORCOffenses.push({
                UOFORCOffenseCode: uofSubject.UOFORCOffenseCode,
              });
            }
          }

          if (uofSubject.CriminalReportIncidentNumber && !oibrsUofData.UOFAdminData.CriminalReportIncidentNumber) {
            oibrsUofData.UOFAdminData.CriminalReportIncidentNumber = uofSubject.CriminalReportIncidentNumber;
          }

          let uofSubjectData;

          if (!uofSubjectMasterNameIds.has(uofSubject.master_name_id)) {
            let ageOfUofSubjectFrom = "0";

            if (uofSubject.date_of_birth) {
              if (uofSubject.AgeofSubjectFrom > 0) {
                ageOfUofSubjectFrom = uofSubject.AgeofSubjectFrom;
              } else {
                ageOfUofSubjectFrom = uofSubject.ageDays <= 0 ? "NN" : uofSubject.ageDays < 7 ? "NB" : "BB";
              }
            }

            lastUofSubjectSeqNo++;

            uofSubjectData = {
              ORINumber: uofSubject.ORINumber,
              AgencyIncidentNumber: uofSubject.AgencyIncidentNumber,
              SubjectSequenceNumber: lastUofSubjectSeqNo.toString().padStart(2, "0"),
              AgeofSubjectFrom: ageOfUofSubjectFrom.toString(),
              AgeofSubjectTo: "",
              AgeofSubjectEstimate: "false",
              WeightofSubjectFrom: uofSubject.WeightofSubjectFrom,
              WeightofSubjectTo: "",
              WeightofSubjectEstimate: "false",
              HeightofSubjectFrom: uofSubject.HeightofSubjectFrom,
              HeightofSubjectTo: "",
              HeightofSubjectEstimate: "false",
              Armed: "",
              Impaired: "",
              SexofSubject: uofSubject.SexofSubject,
              DidtheSubjectResist: "",
              RaceandEthnicitiesofSubject: addRaceAndEthnicity(
                uofSubject.RaceandEthnicityofSubject,
                null,
                [],
                "RaceandEthnicityofSubject"
              ),
              ThreatDirection: "",
              ImpairmentTypes: [],
              ResistanceWeapons: [],
              SubjectInjuries: [],
            };
            oibrsUofData.UOFSubjectDatas.push(uofSubjectData);
            uofSubjectMasterNameIds.set(uofSubject.master_name_id, uofSubjectData);
          }

          uofSubjectData = uofSubjectMasterNameIds.get(uofSubject.master_name_id);

          sequenceNumberMap.set(uofSubject.SubjectSequenceNumber, uofSubjectData.SubjectSequenceNumber);

          if (uofSubject.Armed && uofSubjectData.Armed !== "Y") {
            uofSubjectData.Armed = uofSubject.Armed;
          }

          if (uofSubject.Impaired && uofSubjectData.Impaired !== "Y") {
            uofSubjectData.Impaired = uofSubject.Impaired;
          }

          if (uofSubject.impairements) {
            const impairements = uofSubject.impairements.split(",").map((p) => p.trim());

            for (const impairement of impairements) {
              let impairementType = "";
              switch (impairement) {
                case "Alcohol Impairment":
                  impairementType = "A";
                  break;
                case "Drug Impairment":
                  impairementType = "D";
                  break;
                case "Mental Health Condition":
                  impairementType = "M";
                  break;
                case "Pending further investigation":
                  impairementType = "P";
                  break;
                case "Unknown and unlikely to ever be known":
                  impairementType = "U";
                  break;
              }

              if (!uofSubjectData.ImpairmentTypes.some((p) => p.ImpairmentType === impairementType)) {
                uofSubjectData.ImpairmentTypes.push({
                  ImpairmentType: impairementType,
                });
              }
            }
          }

          if (uofSubject.DidtheSubjectResist && uofSubjectData.DidtheSubjectResist !== "Y") {
            uofSubjectData.DidtheSubjectResist = uofSubject.DidtheSubjectResist;
          }

          if (
            uofSubject.ThreatDirection &&
            uofSubjectData.ThreatDirection !== "L" &&
            (uofSubjectData.ThreatDirection !== "A" || uofSubject.ThreatDirection !== "L")
          ) {
            uofSubjectData.ThreatDirection = uofSubject.ThreatDirection;
          }

          if (uofSubject.ResistanceWeapon) {
            const resistances = uofSubject.ResistanceWeapon.split(",").map((p) => p.trim());

            for (const resistance of resistances) {
              if (!uofSubjectData.ResistanceWeapons.some((p) => p.ResistanceWeapon === resistance)) {
                uofSubjectData.ResistanceWeapons.push({
                  ResistanceWeapon: resistance,
                });
              }
            }
          }

          if (uofSubject.SubjectInjury) {
            const injuries = uofSubject.SubjectInjury.split(",").map((p) => p.trim());

            for (const injuryType of injuries) {
              if (!uofSubjectData.SubjectInjuries.some((p) => p.SubjectInjury === injuryType)) {
                uofSubjectData.SubjectInjuries.push({
                  SubjectInjury: injuryType,
                });
              }
            }
          }
        }

        const uofOfficers = await db.query(
          `
              SELECT 
                  '${department_ori}' as ORINumber, 
                  incident.incident_no as AgencyIncidentNumber,
                  IFNULL(video_camera,'') AS VideoCameraUsed,
                  IFNULL(justified_homicide,'') AS JustifiableHomicide,
                  age as AgeOfOfficer,
                  LPAD(weight,3,'0') AS WeightOfOfficer,
                  height AS HeightOfOfficer,
                  officer_squence AS OfficerSequenceNumber,
                  LPAD(CONVERT(service_year,UNSIGNED),2,'0') AS TotalTenure,
                  sex AS SexOfOfficer,
                  IFNULL(full_time,'') AS OfficerFulltime,
                  IFNULL(identifiable,'') AS Identifiable,
                  IFNULL(on_duty,'') AS OnDuty,
                  IFNULL(IF(officer_injury = '00','0',officer_injury), '') AS OfficerInjuryType,
                  officer_response AS OfficerResponse,
                  race AS RaceandEthnicityofOfficer,
                  uof_officer.officer_id,
                  officer_subject_link AS OfficerToSubjectLink
              FROM incident 
              JOIN uof_officer on incident.id = uof_officer.incident_id 
              WHERE 
                  incident.id = ? 
                  AND 
                  incident.deleted is null 
                  AND 
                  uof_officer.deleted is null
              GROUP BY uof_officer.id
              ORDER BY officer_squence`,
          [incident.id]
        );

        for (const uofOfficer of uofOfficers) {
          let uofOfficerData;

          uofOfficer.AgencyIncidentNumber = reduceIncidentNoTo12Characters(uofOfficer.AgencyIncidentNumber);

          if (!uofOfficerIds.has(uofOfficer.officer_id)) {
            let totalTenure = uofOfficer.TotalTenure;

            if (parseFloat(totalTenure) < 1) {
              totalTenure = "LY";
            }

            lastUofOfficerSeqNo++;

            uofOfficerData = {
              ORINumber: uofOfficer.ORINumber,
              AgencyIncidentNumber: uofOfficer.AgencyIncidentNumber,
              VideoCameraUsed: uofOfficer.VideoCameraUsed,
              JustifiableHomicide: uofOfficer.JustifiableHomicide,
              AgeOfOfficer: uofOfficer.AgeOfOfficer,
              WeightOfOfficer: uofOfficer.WeightOfOfficer,
              OfficerSequenceNumber: lastUofOfficerSeqNo.toString(),
              LEOKAIncidentNumber: null,
              TotalTenure: totalTenure,
              SexOfOfficer: uofOfficer.SexOfOfficer,
              OfficerFulltime: uofOfficer.OfficerFulltime,
              Identifiable: uofOfficer.Identifiable,
              OnDuty: uofOfficer.OnDuty,
              ShotsFired: null,
              OfficerInjuryType: "0",
              HeightOfOfficer: uofOfficer.HeightOfOfficer,
              LocationAddress: Address1,
              LocationAddress2: Address2,
              LocationCity: incident.LocationCity,
              LocationState: incident.LocationState,
              LocationZip: incident.LocationZip,
              LocationLatitude: incident.LocationLatitude,
              LocationLongitude: incident.LocationLongitude,
              LocationType: incident.LocationTypeCode,
              RaceAndEthnicitiesOfOfficer: addRaceAndEthnicity(
                uofOfficer.RaceandEthnicityofOfficer,
                null,
                [],
                "RaceandEthnicityofOfficer"
              ),
              OfficerInjuriesType: [],
              OfficerResponses: [],
              OfficerToSubjectLinks: [],
            };
            oibrsUofData.UOFOfficerDatas.push(uofOfficerData);
            oibrsUofData.UOFAdminData.UOFTotalOfficersInvolved = oibrsUofData.UOFOfficerDatas.length;
            uofOfficerIds.set(uofOfficer.officer_id, uofOfficerData);
          }

          uofOfficerData = uofOfficerIds.get(uofOfficer.officer_id);

          if (uofOfficer.ResistanceWeapon) {
            const resistances = uofOfficer.ResistanceWeapon.split(",").map((p) => p.trim());

            for (const resistance of resistances) {
              if (!uofOfficerData.ResistanceWeapons.some((p) => p.ResistanceWeapon === resistance)) {
                uofOfficerData.ResistanceWeapons.push({
                  ResistanceWeapon: resistance,
                });
              }
            }
          }

          if (uofOfficer.OfficerInjuryType) {
            const injuries = uofOfficer.OfficerInjuryType.split(",").map((p) => p.trim());

            for (const injuryType of injuries) {
              if (!uofOfficerData.OfficerInjuriesType.some((p) => p.OfficerInjuryType === injuryType)) {
                uofOfficerData.OfficerInjuriesType.push({
                  OfficerInjuryType: injuryType,
                });
              }

              if (uofOfficerData.OfficerInjuryType === "0") {
                uofOfficerData.OfficerInjuryType = injuryType;
              }
            }
          }

          if (uofOfficer.OfficerResponse) {
            const responses = uofOfficer.OfficerResponse.split(",").map((p) => p.trim());

            for (const response of responses) {
              if (!uofOfficerData.OfficerResponses.some((p) => p.OfficerResponse === response)) {
                uofOfficerData.OfficerResponses.push({
                  OfficerResponse: response,
                });
              }
            }
          }

          if (uofOfficer.OfficerToSubjectLink) {
            const subjects = uofOfficer.OfficerToSubjectLink.split(",").map((p) => p.trim().padStart(2, "0"));

            for (const subject of subjects) {
              const newSubjectSeqNo = sequenceNumberMap.get(subject);
              if (!uofOfficerData.OfficerToSubjectLinks.some((p) => p.OfficerToSubjectLink === newSubjectSeqNo)) {
                uofOfficerData.OfficerToSubjectLinks.push({
                  OfficerToSubjectLink: newSubjectSeqNo,
                });
              }
            }
          }
        }
      }
    }

    const suspects = await db.query(
      `
        SELECT 
            '${department_ori}' as ORINumber, 
            incident.incident_no as AgencyIncidentNumber,
            IF(master_name_id IS NULL OR master_name_id = '','00',LPAD(suspect_seq_no,2,'0')) AS SuspectSequenceNumber,
            IFNULL(IF(suspect_seq_no = 0, '', calculateAge( date_of_birth, IFNULL(incident.occurred_from, incident.date_time) ) ),'') as age,
            age_range,
            IFNULL(sex,'') AS SexOfSuspect,
            IFNULL(NULLIF(race,'H'),'') AS Race,
            IF(ethnicity IS NOT NULL AND ethnicity <> '' AND ethnicity <> 'N', ethnicity, IF(race='H','H','')) AS Ethnicity,
            IFNULL(hair_color,'') AS HairColorOfSuspect,
            IFNULL(eye_color,'') AS EyeColorOfSuspect,
            IFNULL(height,'') AS HeightOfSuspectFrom,
            IF (weight IS NULL OR weight = '' OR weight = '0', '', LPAD(weight,3,'0')) AS WeightOfSuspectFrom,
            suspect.id,
            master_name_id,
            victim_link,
            incident_id
        FROM incident 
        JOIN suspect on incident.id = suspect.incident_id 
        WHERE 
            incident.incident_no = ? 
            AND 
            incident.deleted is null 
            AND 
            suspect.deleted is null 
        GROUP BY suspect.id
        ORDER BY suspect_seq_no`,
      [incidentNo]
    );

    for (const suspect of suspects) {
      let ageOfSuspectFrom = suspect.age ? suspect.age.toString().padStart(2, "0") : "";
      let ageOfSuspectTo = "";

      if (suspect.SuspectSequenceNumber === "00") {
        //Unknown
        if (suspect.age_range) {
          const ranges = suspect.age_range.split("-").map((p) => p.trim());
          if (ranges.some((p) => p !== "0")) {
            ageOfSuspectFrom = ranges[0];
            ageOfSuspectTo = ranges[1];
          }
        }
      }

      suspect.AgencyIncidentNumber = reduceIncidentNoTo12Characters(suspect.AgencyIncidentNumber);

      const suspectData = {
        ORINumber: suspect.ORINumber,
        AgencyIncidentNumber: suspect.AgencyIncidentNumber,
        AgeOfSuspectFrom: ageOfSuspectFrom,
        AgeOfSuspectTo: ageOfSuspectTo,
        SexOfSuspect: suspect.SexOfSuspect,
        RaceAndEthnicitiesOfSuspect: [],
        HairColorOfSuspect: suspect.HairColorOfSuspect,
        EyeColorOfSuspect: suspect.EyeColorOfSuspect,
        HeightOfSuspectFrom: suspect.HeightOfSuspectFrom,
        HeightOfSuspectTo: "",
        WeightOfSuspectFrom: suspect.WeightOfSuspectFrom,
        WeightOfSuspectTo: "",
        ScarsMarksTattoosAndOtherCharacteristics: [],
      };

      suspectData.RaceAndEthnicitiesOfSuspect = addRaceAndEthnicity(
        suspect.Race,
        suspect.Ethnicity,
        suspectData.RaceAndEthnicitiesOfSuspect
      );

      if (suspect.SuspectSequenceNumber === "00") {
        //Unknown
        suspectData.SuspectSequenceNumber = "00";
        suspectData.AgeOfSuspectFrom = "";
        suspectData.AgeOfSuspectTo = "";
        suspectData.SexOfSuspect = "";
        suspectData.RaceAndEthnicitiesOfSuspect = [];
        suspectData.HairColorOfSuspect = "";
        suspectData.EyeColorOfSuspect = "";
        suspectData.HeightOfSuspectFrom = "";
        suspectData.HeightOfSuspectTo = "";
        suspectData.WeightOfSuspectFrom = "";
        suspectData.WeightOfSuspectTo = "";

        if (!suspectMasterNameIds.has("0")) {
          oibrsIncidentData.offenseSuspectDatas.unshift(suspectData);
          suspectMasterNameIds.set("0", {
            suspectSeqNo: suspectData.SuspectSequenceNumber,
            victimLinks: [],
          });
        }
      } else {
        if (!suspectMasterNameIds.has(suspect.master_name_id)) {
          lastSuspectSeqNo++;

          suspectData.SuspectSequenceNumber = lastSuspectSeqNo.toString().padStart(2, "0");

          oibrsIncidentData.offenseSuspectDatas.push(suspectData);

          suspectMasterNameIds.set(suspect.master_name_id, {
            suspectSeqNo: suspectData.SuspectSequenceNumber,
            victimLinks: [],
          });
        }
      }

      const { victimLinks } = suspectMasterNameIds.get(
        suspect.SuspectSequenceNumber === "00" ? "0" : suspect.master_name_id
      );

      const trasformedVictimSeqNumbersResult = await trasformVictimSeqNumbers(
        pool,
        suspect.victim_link,
        suspect.incident_id
      );

      if (!trasformedVictimSeqNumbersResult.status) {
        throw trasformedVictimSeqNumbersResult.error;
      }

      const trasformedVictimSeqNumbers = trasformedVictimSeqNumbersResult.data;

      for (const victimLink of trasformedVictimSeqNumbers) {
        if (!victimLinks.includes(victimLink)) {
          victimLinks.push(victimLink);
        }
      }
    }

    const victims = await db.query(
      `
        SELECT 
            '${department_ori}' as ORINumber, 
            incident.incident_no as AgencyIncidentNumber,
            CASE
              WHEN master_name_id IS NOT NULL AND master_name_id <> '' THEN CONCAT('Person',master_name_id)
              WHEN master_business_id IS NOT NULL AND master_business_id <> '' THEN CONCAT('Business',master_business_id)
              ELSE CONCAT_WS('_','id',victim.id)
            END
            AS VictimSequenceNumber,
            IFNULL(victim_type,'') AS VictimType,
            calculateAge( date_of_birth, IFNULL( incident.occurred_from, incident.date_time ) ) as AgeOfVictimFrom,
            IFNULL(sex,'') AS GenderOfVictim,
            IFNULL(NULLIF(race,'H'),'') AS Race,
            IF(ethnicity IS NOT NULL AND ethnicity <> '' AND ethnicity <> 'N', ethnicity, IF(race='H','H','')) AS Ethnicity,
            IFNULL(resident_status,'') AS VictimResidentStatusInJurisdiction,
            IFNULL(a_assault_homicide_circums,'') AS AssaultHomicideCircumstance,
            IFNULL(officer_circums,'') AS TypeOfActivityOfficerCircumstances,
            IFNULL(assignment_type,'') AS AssignmentTypeOfficer,
            IFNULL(other_ori,'') AS ORIOtherJurisdiction,
            IFNULL(type_of_injury,'') AS InjuryCode,
            IFNULL(relationship_status,'') AS VictimSuspectRelationship,
            victim.id,
            DATEDIFF(incident.occurred_from, date_of_birth) as ageDays,
            date_of_birth,
            master_name_id,
            master_business_id,
            orc_codes.ORC as orcNo,
            orc_codes.\`NIBRS CODE\` as nibrsCode,
            incident.weapon_force_type,
            REPLACE(REPLACE(Replace(incident.orc_no,'.',''),'(',''),')','') as OffenseCode
        FROM incident 
        JOIN victim on incident.id = victim.incident_id
        JOIN orc_codes ON incident.orc_no = orc_codes.ORC
        WHERE 
            incident.incident_no = ? 
            AND 
            incident.deleted is null 
            AND 
            victim.deleted is null 
        GROUP BY victim.id
        ORDER BY victim_seq_no
    `,
      [incidentNo]
    );

    for (const victim of victims) {
      const masterId = victim.master_name_id ? "Name" + victim.master_name_id : "Business" + victim.master_business_id;

      let victimData;

      victim.AgencyIncidentNumber = reduceIncidentNoTo12Characters(victim.AgencyIncidentNumber);

      if (!victimMasterIds.has(masterId)) {
        let ageOfVictimFrom = "";

        if (victim.date_of_birth) {
          if (victim.AgeOfVictimFrom > 0) {
            ageOfVictimFrom = victim.AgeOfVictimFrom.toString().padStart(2, "0");
          } else {
            ageOfVictimFrom = victim.ageDays <= 0 ? "NN" : victim.ageDays < 7 ? "NB" : "BB";
          }
        }

        lastVictimSeqNo++;

        victimData = {
          ORINumber: victim.ORINumber,
          AgencyIncidentNumber: victim.AgencyIncidentNumber,
          VictimSequenceNumber: lastVictimSeqNo.toString().padStart(3, "0"),
          VictimORCOffenseLinks: [],
          VictimType: victim.VictimType,
          AgeOfVictimFrom: ageOfVictimFrom.toString(),
          AgeOfVictimTo: "",
          GenderOfVictim: victim.GenderOfVictim,
          RaceAndEthnicitiesOfVictim: [],
          VictimResidentStatusInJurisdiction: victim.VictimResidentStatusInJurisdiction,
          AggravatedAssaultHomicideCircumstances: [],
          TypeOfActivityOfficerCircumstances: victim.TypeOfActivityOfficerCircumstances,
          AssignmentTypeOfficer: victim.AssignmentTypeOfficer,
          ORIOtherJurisdiction: victim.ORIOtherJurisdiction,
          JustifiableHomicideCircumstances: "",
          TypeOfInjuries: [],
          VictimSuspectLinks: [],
        };

        oibrsIncidentData.offenseVictimDatas.push(victimData);

        victimMasterIds.set(masterId, victimData);
      }

      victimData = victimMasterIds.get(masterId);

      if (victimData.RaceAndEthnicitiesOfVictim.length === 0) {
        victimData.RaceAndEthnicitiesOfVictim = addRaceAndEthnicity(
          victim.Race,
          victim.Ethnicity,
          victimData.RaceAndEthnicitiesOfVictim
        );
      }

      if (!victimData.VictimORCOffenseLinks.some((p) => p.VictimORCOffense === victim.OffenseCode)) {
        victimData.VictimORCOffenseLinks.push({
          VictimORCOffense: victim.OffenseCode,
        });
      }

      if (victim.AssaultHomicideCircumstance) {
        const assaultCircumstances = victim.AssaultHomicideCircumstance.split(",").map((p) => p.trim());
        for (const assaultCircumstance of assaultCircumstances) {
          if (
            isValidAggravatedAssaultHomicideCircumstancesCode(
              victim.VictimType,
              victim.orcNo,
              victim.nibrsCode,
              assaultCircumstance,
              victim.InjuryCode,
              victim.weapon_force_type
            )
          ) {
            if (
              !victimData.AggravatedAssaultHomicideCircumstances.some(
                (p) => p.AssaultHomicideCircumstance === assaultCircumstance
              )
            ) {
              victimData.AggravatedAssaultHomicideCircumstances.push({
                AssaultHomicideCircumstance: assaultCircumstance,
              });
            }
          }
        }
      }

      victimData.TypeOfActivityOfficerCircumstances =
        victimData.TypeOfActivityOfficerCircumstances || victim.TypeOfActivityOfficerCircumstances;
      victimData.AssignmentTypeOfficer = victimData.AssignmentTypeOfficer || victim.AssignmentTypeOfficer;
      victimData.ORIOtherJurisdiction = victimData.ORIOtherJurisdiction || victim.ORIOtherJurisdiction;

      if (victim.InjuryCode && !victimData.TypeOfInjuries.some((p) => p.InjuryCode === victim.InjuryCode)) {
        victimData.TypeOfInjuries.push({
          InjuryCode: victim.InjuryCode,
        });
      }

      if (victim.VictimType === "S") {
        victimData.VictimSuspectLinks.push({
          VictimSuspectSequenceNumber: "",
          VictimSuspectRelationship: "",
        });
      } else {
        for (const suspect of suspectMasterNameIds.values()) {
          if (suspect.victimLinks.includes(victim.VictimSequenceNumber)) {
            if (!victimData.VictimSuspectLinks.some((p) => p.VictimSuspectSequenceNumber === suspect.suspectSeqNo)) {
              victimData.VictimSuspectLinks.push({
                VictimSuspectSequenceNumber: suspect.suspectSeqNo,
                VictimSuspectRelationship: victim.VictimSuspectRelationship,
              });
            }
          }
        }
      }
    }

    if (oibrsUofData.UOFAdminData) {
      if (oibrsUofData.UOFAdminData.NumberOfficersOutsideAgency > 0) {
        oibrsUofData.UOFAdminData.NumberOfficersOutsideAgency =
          oibrsUofData.UOFAdminData.NumberOfficersOutsideAgency.toString().padStart(2, "0");
      } else {
        oibrsUofData.UOFAdminData.NumberOfficersOutsideAgency =
          oibrsUofData.UOFAdminData.NumberOfficersOutsideAgency.toString();
      }

      oibrsUofData.UOFAdminData.UOFTotalOfficersInvolved =
        oibrsUofData.UOFAdminData.UOFTotalOfficersInvolved.toString().padStart(2, "0");
    }

    return new SuccessResult({
      incident: oibrsIncidentData.offenseAdminData ? oibrsIncidentData : null,
      uof: oibrsUofData.UOFAdminData ? oibrsUofData : null,
    });
  } catch (err) {
    globalThis.logger.error(err);

    return new ErrorResult(`Creating oibrs json failed for ${incidentNo}`, err);
  } finally {
    if (db) {
      db.release();
    }
  }
};
