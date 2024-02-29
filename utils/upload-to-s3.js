const { SuccessResult, ErrorResult } = require("./result");
const s3 = require("./get-s3").getS3();
const { PutObjectCommand } = require("@aws-sdk/client-s3"); // ES Modules import

module.exports.uploadToS3 = async function ({ body, file, s3Bucket = globalThis.bucketName }) {
  try {
    const params = {
      Body: body,
      Bucket: s3Bucket,
      Key: file,
      ACL: "public-read",
    };

    await s3.send(new PutObjectCommand(params));

    return new SuccessResult();
  } catch (error) {
    globalThis.logger.error("Failed to upload file! File : " + file);
    globalThis.logger.error(error);
    return new ErrorResult("Failed to upload file", error);
  }
};
