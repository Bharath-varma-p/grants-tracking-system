const stream = require("stream");
const { promisify } = require("util");
const axios = require("axios");
const fs = require("fs");
const { SuccessResult, ErrorResult } = require("./result");

const finished = promisify(stream.finished);

module.exports.downloadFile = async function (fileUrl, outputLocationPath) {
  try {
    const writer = fs.createWriteStream(outputLocationPath);

    const { data } = await axios({
      method: "get",
      url: fileUrl,
      responseType: "stream",
    });

    data.pipe(writer);
    const result = await finished(writer);
    return new SuccessResult(result);
  } catch (error) {
    return new ErrorResult(error.message, error);
  }
};
