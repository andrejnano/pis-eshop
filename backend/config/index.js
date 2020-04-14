"use strict";

/*
|--------------------------------------------------------------------------------
| Global application-wide configuration
|--------------------------------------------------------------------------------
*/
let CONFIG = {};

/*
|--------------------------------------------------------------------------------
| Express Server
|--------------------------------------------------------------------------------
*/
CONFIG.app = process.env.NODE_ENV || "development";
CONFIG.port = process.env.BACKEND_PORT || "4000";
CONFIG.host = process.env.BACKEND_HOST || "0.0.0.0";

/*
|--------------------------------------------------------------------------------
| MongoDB credentials
|--------------------------------------------------------------------------------
*/
CONFIG.mongodb_host = process.env.MONGODB_HOST || "mongo";
CONFIG.mongodb_port = process.env.MONGODB_PORT || "27017";
CONFIG.mongodb_database = process.env.MONGODB_DATABASE || "database";
CONFIG.mongodb_user = process.env.MONGODB_USER || "root";
CONFIG.mongodb_pass = process.env.MONGODB_PASS || "defaultPassword";
CONFIG.mongodb_connect_retry_timeout = process.env.MONGODB_CONNECT_RETRY_TIMEOUT || 5000;

/*
|--------------------------------------------------------------------------------
| JWT Authentication Token
|--------------------------------------------------------------------------------
*/
CONFIG.jwt_secret = process.env.JWT_SECRET || "jwt_please_change";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || 10000;

//-----------------------------------------------------------------------------
module.exports = CONFIG;
//-----------------------------------------------------------------------------
