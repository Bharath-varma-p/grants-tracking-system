const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { getS3 } = require("./get-s3");
const getType = require("./mim-files");

module.exports.createMulterS3 = function (department) {
  return multer({
    storage: multerS3({
      s3: getS3(),
      acl: "public-read",
      bucket: globalThis.bucketName,
      key: function (req, file, cb) {
        cb(
          null,
          `${department.path}/uploads/${file.fieldname}-${Date.now()}_${file.originalname.split(".")[0]}${path.extname(
            file.originalname
          )}`
        );
      },
      contentType: function (req, file, cb) {
        cb(null, `application/${getType(file.originalname)}`);
      },
    }),
  });
};
