module.exports = function (name) {
  const department = globalThis.departmentNameMap[name];

  if (!department) {
    throw new Error("Department name faulty!");
  }

  return department;
};
