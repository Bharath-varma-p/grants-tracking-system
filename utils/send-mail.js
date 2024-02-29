const nodemailer = require("nodemailer");
const { ErrorResult, SuccessResult } = require("./result");
const { SendEmailCommand } = require("@aws-sdk/client-ses");

const { SESClient } = require("@aws-sdk/client-ses");

module.exports.sendMail = async (options) => {
  if (process.env.mode !== "production") {
    return new SuccessResult();
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.mail_user,
        pass: process.env.mail_password,
      },
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(options, function (err) {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });

    return new SuccessResult();
  } catch (error) {
    globalThis.logger.error("Sending mail failed");
    globalThis.logger.error(error);
    return new ErrorResult("Sending mail failed", error);
  }
};

module.exports.sendEmail = async ({ to, subject, body, sender = process.env.mail_user }) => {
  if (process.env.mode !== "production") {
    globalThis.logger.warn("Email can not be sent in development mode");
    return new SuccessResult();
  }

  const ses = new SESClient({
    credentials: {
      accessKeyId: process.env.awsSES_key,
      secretAccessKey: process.env.awsSES_secret,
    },
    apiVersion: "2010-12-01",
    region: "us-gov-west-1",
  });

  let receivers = [];
  try {
    if (!to) {
      throw new Error("Please provide at least one receiver");
    }

    if (typeof to === "string") {
      receivers.push(to);
    }

    if (Array.isArray(to)) {
      receivers.push(...to);
    }

    receivers = receivers.filter((p) => p.trim());

    if (receivers.length === 0) {
      throw new Error("Please provide at least one receiver");
    }

    if (!body) {
      throw new Error("Please provide email body");
    }

    if (!subject) {
      throw new Error("Please provide email subject");
    }

    const options = {
      Destination: {
        ToAddresses: receivers,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <!doctype html>
            <html>
              <body>
                  ${body}
              </body>
            </html>
            `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject, //subject
        },
      },
      Source: sender,
      //ReplyToAddresses: ["murat.ozer@peel9.net"],
    };

    const mailResult = await ses.send(new SendEmailCommand(options));

    globalThis.logger.info("Email sent");

    return new SuccessResult(mailResult);
  } catch (error) {
    globalThis.logger.error("Sending mail failed");
    globalThis.logger.error(error);
    return new ErrorResult("Sending mail failed", error);
  }
};
