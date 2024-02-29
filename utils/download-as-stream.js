const axios = require("axios");
const { SuccessResult, ErrorResult } = require("./result");

module.exports.downloadAsStream = async function (fileUrl) {
  try {
    const { data } = await axios({
      method: "get",
      url: fileUrl,
      responseType: "stream",
    });

    return new SuccessResult(data);
  } catch (error) {
    return new ErrorResult(error.message, error);
  }
};
