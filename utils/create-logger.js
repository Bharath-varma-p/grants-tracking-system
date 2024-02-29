const pino = require("pino");

const logTargets = [
  {
    target: "pino-pretty",
    options: {
      destination: 1, // use 2 for stderr
      ignore: "pid,hostname,time",
      translateTime: true,
    },
    level: "trace",
  },
];

if (process.env.mode === "production") {
  logTargets.push({
    target: "pino/file",
    options: { destination: "log/error.log", mkdir: true },
    level: "error",
  });
}

const transport = pino.transport({
  targets: logTargets,
});

let logger = pino(transport);
logger.level = process.env.log_level || "debug";

if (process.env.mode === "production") {
  logger = {
    trace: function () {
      console.trace(...arguments);
    },
    debug: function () {
      console.debug(...arguments);
    },
    info: function () {
      console.info(...arguments);
    },
    warn: function () {
      console.warn(...arguments);
    },
    error: function () {
      console.error(...arguments);
    },
    fatal: function () {
      console.error(...arguments);
    },
  };
}

global.logger = logger;

module.exports.logger = logger;
