const requestClient = require("request");
const sharp = require("sharp");
const path = require("path");
const { uploadToS3 } = require("./upload-to-s3");

module.exports.createThumbnail = async function (file, maxWidth, department) {
  const request = requestClient.defaults({ encoding: null });
  await new Promise((resolve) => {
    request.get(file.location, async function (err, res, body) {
      if (err) {
        globalThis.logger.error(err);
        return;
      }

      request.imgBuffer = body;
      resolve();
    });
  });

  if (!request.imgBuffer) {
    return;
  }

  try {
    const image = sharp(request.imgBuffer);
    const metadata = await image.metadata();
    file.thumbnailbuffer = await image
      .resize(metadata.width > maxWidth ? maxWidth : metadata.width)
      .jpeg(metadata.format)
      .toBuffer();

    file.thumbnailkey = `thumbnails-${path.parse(file.key).name}.png`;

    await uploadToS3({
      body: file.thumbnailbuffer,
      s3Bucket: file.bucket,
      file: `${department.path}/uploads/${file.thumbnailkey}`,
    });

    file.previewlink = `${globalThis.bucketFullURL}/${department.path}/uploads/thumbnails-${
      path.parse(file.key).name
    }.png`;
  } catch (error) {
    globalThis.logger.error("Creating thumbnail failed");
    globalThis.logger.error(error);
  }
};
