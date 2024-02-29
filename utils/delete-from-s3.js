const { reject } = require("lodash");
const path = require("path");
const { SuccessResult, ErrorResult } = require("./result");
const s3 = require("./get-s3").getS3();

module.exports.deleteFromS3 = async function (files = []) {
  if (files.length === 0) {
    return new SuccessResult();
  }

  const toBeDeleted = files.map((file) => ({
    Key: file,
  }));

  for (const file of files) {
    const parsedFile = path.parse(file);
    toBeDeleted.push({
      Key: `${parsedFile.dir}/thumbnails-${parsedFile.name}.png`,
    });
  }

  const params = {
    Bucket: globalThis.bucketName,
    Delete: {
      Objects: toBeDeleted,
      Quiet: false,
    },
  };

  try {
    await new Promise((resolve) => {
      s3.deleteObjects(params, function (err, data) {
        if (err) {
          globalThis.logger.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return new SuccessResult();
  } catch (error) {
    globalThis.logger.error("Failed to delete attchment! Files : " + files);
    globalThis.logger.error(error);
    return new ErrorResult("Failed to delete attachment", error);
  }
};
