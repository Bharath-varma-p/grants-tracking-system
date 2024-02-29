const rateLimit = require("express-rate-limit");

module.exports.createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 hour window
  max: 1000, // start blocking after 5 requests
  message: "Too many request created from this IP, please try again later.",
});
