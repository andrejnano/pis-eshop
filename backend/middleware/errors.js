/*
|--------------------------------------------------------------------------------
| ERROR HANDLING MIDDLEWARE
|--------------------------------------------------------------------------------
|
| function catchErrorMiddleware
| * Catches errors / 404 and forwards to error handler
|
| function handleErrorMiddleware
| * Handles errors, prints stacktrace only while in development environment
|
*/

/*
|--------------------------------------------------------------------------------
| IMPORT GLOBAL CONFIGURATIONS
|--------------------------------------------------------------------------------
*/
const CONFIG = require("../config");

const catchErrorMiddleware = function (req, res, next) {
  var err = new Error("Method Not Allowed");
  err.status = 405;
  return next(err);
};

const handleErrorMiddleware = function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = CONFIG.app === "development" ? err : {};
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
};

module.exports = {
  catchErrorMiddleware,
  handleErrorMiddleware,
};
