const fs = require("fs");

let envPath = ".env";

try {
  fs.statSync(`.env.${process.env.mode}`);
  envPath = `.env.${process.env.mode}`;
} catch {
  //Throw an error it related env file doesn't exist
}

if (envPath !== ".env") {
  (function () {
    require("dotenv").config({
      path: envPath,
      override: true,
    });
  })();
}
