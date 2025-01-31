"use strict";

/*
|--------------------------------------------------------------------------------
| CORE DEPENDENCIES
|--------------------------------------------------------------------------------
*/
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const expressStatus = require("express-status-monitor");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
/*
|--------------------------------------------------------------------------------
| IMPORT GLOBAL CONFIGURATIONS
|--------------------------------------------------------------------------------
*/
const CONFIG = require("./config");


/*
|--------------------------------------------------------------------------------
| ROOT EXPRESS APPLICATION INSTANCE
|--------------------------------------------------------------------------------
*/
const app = express();


/*
|--------------------------------------------------------------------------------
| IMPORT DATA MODELS & SETUP DATABASE CONNECTIONS
|--------------------------------------------------------------------------------
*/

const models = require("./models");


/* Passport auth middleware configuration */
const passportConfig = require('./config/passport');


/*
|--------------------------------------------------------------------------------
| EXPRESS SERVER CONFIGURATION & MIDDLEWARE SETUP
|--------------------------------------------------------------------------------
|
|  morgan     => HTTP request logger
|  bodyParser => Request body parser / validator
|  cors       => Cross Origin Resource Sharing
|  passport   => Authentication middleware
|
*/

app.set("host", CONFIG.host);
app.set("port", CONFIG.port);
app.use(expressStatus());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.disable("x-powered-by");
app.use(cors());

/*
|--------------------------------------------------------------------------------
| GENERAL REQUEST ROUTING MIDDLEWARE
|--------------------------------------------------------------------------------
*/
// app.use("/api/products/", require("./routes/productsRouter"));
// app.use("/api/coupons/", require("./routes/couponsRouter"));

app.use("/", require("./routes/index"));

/*
|--------------------------------------------------------------------------------
| ERROR HANDLING MIDDLEWARE
|--------------------------------------------------------------------------------
*/
const {
  catchErrorMiddleware,
  handleErrorMiddleware,
} = require("./middleware/errors.js");
app.use(catchErrorMiddleware);
app.use(handleErrorMiddleware);

//-----------------------------------------------------------------------------
module.exports = app;
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
//? "The 'unhandledRejection' event is emitted whenever a Promise is rejected
//? and no error handler is attached to the promise within a turn of the event
//? loop. When programming with Promises, exceptions are encapsulated as "rejected promises".
//? Rejections can be caught and handled using promise.catch() and are propagated through a Promise chain.
//? The 'unhandledRejection' event is useful for detecting and keeping track of promises that were rejected
//? whose rejections have not yet been handled."
// Source: https://nodejs.org/api/process.html#process_event_rejectionhandled
// process.on("unhandledRejection", error => {
//   console.error("Uncaught Error", parseError(error));
// });
//---------------------------------------------------------
