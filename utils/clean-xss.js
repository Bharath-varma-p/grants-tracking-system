const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const parts = ["body", "params", "query"];

module.exports.cleanXss = function (req, res, next) {
  for (const partName of parts) {
    const part = req[partName];
    if (part) {
      for (const key in part) {
        if (Object.hasOwnProperty.call(part, key)) {
          const val = part[key];
          if (val && typeof val === "string") {
            part[key] = DOMPurify.sanitize(val);
          }
        }
      }
    }
  }
  next();
};
