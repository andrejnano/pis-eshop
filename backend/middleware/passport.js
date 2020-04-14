/*
|--------------------------------------------------------------------------------
| * Passport Authentication Strategy Middleware *
|--------------------------------------------------------------------------------
*/
const { ExtractJwt, Strategy } = require('passport-jwt')
const User = require('../models/User')
const CONFIG = require('../config')

/*
|--------------------------------------------------------------------------------
| JWT - User ID Authentication strategy
|--------------------------------------------------------------------------------
|
| Prepare new strategy, extracting JWT from req and checking user_id against DB
*/
module.exports.userIdAuthStrategy = () => {

  // Setup strategy options
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: CONFIG.jwt_secret
  }

  return new Strategy(opts, function(jwt_payload, done) {
    // Search for the user by id, which is extracted from the JWT token
    User.findById(jwt_payload.user_id)
      .then((user) => {
        return done(null, user)
      })
      .catch((err) => {
        return done(null, err)
      })
  })
}
