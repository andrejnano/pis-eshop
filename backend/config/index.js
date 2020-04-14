'use strict'

/*
|--------------------------------------------------------------------------------
| Global application-wide configuration
|--------------------------------------------------------------------------------
*/
let CONFIG = {}

/*
|--------------------------------------------------------------------------------
| Express Server
|--------------------------------------------------------------------------------
*/
CONFIG.app          = process.env.NODE_ENV          || 'development'
CONFIG.port         = process.env.BACKEND_PORT      || '4000'
CONFIG.host         = process.env.BACKEND_HOST      || '0.0.0.0'

/*
|--------------------------------------------------------------------------------
| MongoDB credentials
|--------------------------------------------------------------------------------
*/
CONFIG.mongoHost     = process.env.MONGO_HOST       || 'mongodb'
CONFIG.mongoPort     = process.env.MONGO_PORT       || '27017'
CONFIG.mongoDb       = process.env.MONGO_DB         || 'db-name'
CONFIG.mongoUser     = process.env.MONGO_USER       || 'root'
CONFIG.mongoPassword = process.env.MONGO_PASSWORD   || 'db-password'

/*
|--------------------------------------------------------------------------------
| JWT Authentication Token
|--------------------------------------------------------------------------------
*/
CONFIG.jwtSecret      = process.env.JWT_SECRET     || 'jwt_please_change'
CONFIG.jwtExpiration  = process.env.JWT_EXPIRATION || '10000'


//-----------------------------------------------------------------------------
module.exports = CONFIG
//-----------------------------------------------------------------------------
