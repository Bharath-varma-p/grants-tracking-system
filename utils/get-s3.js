module.exports.getS3 = function () {
  const { S3Client } = require("@aws-sdk/client-s3");

  return new S3Client({
    endpoint: "https://s3.wasabisys.com",
    credentials: {
      accessKeyId: process.env.s3_access_key_id,
      secretAccessKey: process.env.s3_secret_access_key,
    },
    region: "us-east-1",
  });
};
