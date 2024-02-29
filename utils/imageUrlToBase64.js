const { default: axios } = require("axios");

async function imageUrlToBase64(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });

  const blob = await response.data;

  const contentType = response.headers["content-type"];

  const base64String = `data:${contentType};base64,${Buffer.from(blob).toString("base64")}`;

  return base64String;
}

module.exports = { imageUrlToBase64 };
