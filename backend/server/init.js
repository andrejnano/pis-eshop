#!/usr/bin/env node

// PIS 2020 - eshop.blue

/*
|--------------------------------------------------------------------------------
| Server initializing script
|
| THIS IS THE INITIAL RUNTIME SCRIPT FOR THE WHOLE WEB APPLICATION
|--------------------------------- -----------------------------------------------
*/

/* IMPORT MAIN APPLICATION MODULE */
const app = require("../app");

/* CONFIGURE CONSOLE LOG OUTPUT */
const chalk = require("chalk");

const successLogOutput = () => {
  console.log(`
|------------------------------------------------------------------------------
| ${chalk.bold.green("UP")}!
| ${chalk.bold(" Listening on: ")} ${chalk.underline(
    `http://${app.get("host")}:${app.get("port")}/`
  )}
| Running in ${app.get("env")} mode
|------------------------------------------------------------------------------
  `);
};

/* START EXPRESS SERVER */
let Server = app.listen(app.get("port"), app.get("host"), successLogOutput);

//-----------------------------------------------------------------------------
module.exports = Server;
//-----------------------------------------------------------------------------
