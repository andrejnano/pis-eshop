/*
|--------------------------------------------------------------------------------
| * MODELS & MONGO DB SETUP *
|--------------------------------------------------------------------------------
*/
const mongoose = require('mongoose')
const chalk = require('chalk')
const CONFIG = require('../config')


let models = {}

/*
|--------------------------------------------------------------------------------
| Mongo Connection Log Outputs
|--------------------------------------------------------------------------------
*/
const mongoConnectRetryTimeout = CONFIG.mongodb_connect_retry_timeout
const mongoURI = `mongodb://${CONFIG.mongodb_host}:${CONFIG.mongodb_port}/${CONFIG.mongodb_database}`

const retryLogOutput = () => { console.log(`
|------------------------------------------------------------------------------
| ${chalk.bold(' Backend ') + chalk.blue('[eshop.blue (PIS 2020)]')}
| ❌ Can't connect to the mongo db host :-(
| URI: ${chalk.underline(`${mongoURI}`)}
| 🔁 Going to try again in: ${CONFIG.mongodb_connect_retry_timeout}ms
|------------------------------------------------------------------------------
`
)}

const successLogOutput = () => { console.log(`
|------------------------------------------------------------------------------
| ${chalk.bold(' Backend ') + chalk.blue('[eshop.blue (PIS 2020)]')}
| ${chalk.bold(` ✅  Connection to mongo db successful!`)}
| URI: ${chalk.underline(`${mongoURI}`)}
|------------------------------------------------------------------------------
`
)}


// create an initial admin account
const createAdminAccount = function (user) {
  if (typeof user === 'undefined') {
    throw new Error("Undefined model.");
  }

  const admin = {
    email: 'admin@eshop.blue',
    password: 'secretadminpass'
  }

  user.findOne({ email: admin.email }, (err, existingUser) => {
    if (err) {
      console.error(err);
    }
    if (existingUser) {
      console.log("Admin user account already exists.")
    } else {
      console.log("Creating a new default Admin account...")
      user.create(admin, (err, newUser) => {
        if (err) { console.error(err) }
        if (newUser) {
          newUser.setPassword(admin.password)
          console.log("A new Admin account was created!")
        }
      })
    }
  })
}


/*
|--------------------------------------------------------------------------------
| Database Connections Setup
|--------------------------------------------------------------------------------
*/
async function setupDBConnection() {

  // Make mongoose use promises
  mongoose.Promise = global.Promise

  models['user'] = require('./User')

  // Mongoose Connection options
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }

  // Try to reconnect if the first connect ends in failure
  // When both web and mongodb services are started at the same time
  // inside of a docker-compose, mongodb usually requires more time to
  // startup. This can cause connect failure in this script, therefore
  // the web server needs to reconnect after some wait time
  // !EDIT: This is fixed by using a 'wait-for-it.sh' script in Docker Compose
  // However, this feature is still useful when launching backend just by itself
  var mongoConnectRetry = function () {
    return mongoose.connect(mongoURI, options, (err) => {
      if (err) {
        retryLogOutput()
        setTimeout(mongoConnectRetry, mongoConnectRetryTimeout)
      } else {
        successLogOutput()
        createAdminAccount(models['user'])
      }
    })
  }

  await mongoConnectRetry()
}

//-----------------------------------------------------------------------------
setupDBConnection()
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
module.exports = models
//-----------------------------------------------------------------------------
