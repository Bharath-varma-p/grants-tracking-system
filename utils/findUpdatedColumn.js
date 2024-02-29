const moment = require("moment");

module.exports.findUpdatedColumn = function (origObj, newObj, fixedColumn, caseNo, fixedColummText) {
  const bumbs = { static: { id: Object.values(newObj[0])[0] } };
  if (fixedColumn) {
    bumbs["static"][fixedColumn] = fixedColummText || newObj[0][fixedColumn];
  }
  bumbs["static"][caseNo] = newObj[0][caseNo];
  if (origObj) {
    Object.keys(origObj).forEach((key) => {
      if (key == "ssn") {
        bumbs[key] = { new: "-censored-", old: "-censored-" };
        return;
      }
      if (origObj[key] instanceof Date) {
        if (!origObj[key] || !newObj[0][key]) {
          return;
        }
        if (origObj[key].getTime() !== newObj[0][key].getTime()) {
          newObj[0][key] = moment(newObj[0][key]).format("MM/DD/YYYY HH:mm");
          origObj[key] = moment(origObj[key]).format("MM/DD/YYYY HH:mm");
          bumbs[key] = { new: newObj[0][key], old: origObj[key] };
        }
      } else {
        if (origObj[key] !== newObj[0][key]) {
          bumbs[key] = { new: newObj[0][key], old: origObj[key] };
        }
      }
    });
  } else {
    Object.keys(newObj[0]).forEach((key) => {
      if (key == "ssn") {
        bumbs[key] = { new: "-censored-", old: "-censored-" };
        return;
      }
      if (newObj[0][key]) {
        bumbs[key] = { new: newObj[0][key], old: null };
      }
    });
  }
  return bumbs;
};
