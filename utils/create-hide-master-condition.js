module.exports.createHideMasterCondition = (department, type) => {
  if (department.name === "Demo" || department.name === "Peel9" || department.name === "P9 Demo") {
    return "";
  }

  if (type === "person") {
    return " AND master_name_id not like 'Demo%' AND master_name_id not like 'Peel9%' AND master_name_id not like 'P9 Demo%'";
  }

  if (type === "vehicle") {
    return " AND vehicle_id not like 'Demo%' AND vehicle_id not like 'Peel9%' AND vehicle_id not like 'P9 Demo%'";
  }

  if (type === "business") {
    return " AND master_business_id not like 'Demo%' AND master_business_id not like 'Peel9%' AND master_business_id not like 'P9 Demo%'";
  }
};
