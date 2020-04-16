/*
|--------------------------------------------------------------------------------
| * User Model Controller *
|--------------------------------------------------------------------------------
|
|  ~ User Data management, User Authentication (Login)
|
*/
let User = require('../models/User')
const { SuccessResponse, ErrorResponse} = require('../utils/response')



/*
|--------------------------------------------------------------------------------
| Create a new User Account (Registration)
|--------------------------------------------------------------------------------
*/
module.exports.create = function(req, res) {
  // TODO: Implement
}


/*
|--------------------------------------------------------------------------------
| Authenticate User (Login)
|--------------------------------------------------------------------------------
*/
module.exports.login = function(req, res) {
  let email = req.body.email
  let password = req.body.password

  // search db for the user
  User.findOne({ email: email })
    .then((user) => {
      if (typeof user === 'undefined') {
        return ErrorResponse(res, err, 400)
      }
      // compare passwords
      user = user.validatePassword(password)
      if (user) {
        return SuccessResponse(res, { token: user.getJWT(), user: user.toWeb() }, 200)
      } else {
        return ErrorResponse(res, { message: 'Invalid Password' }, 402)
      }
    })
    .catch((err) => {
      return ErrorResponse(res, err, 400)
    })
}


/*
|--------------------------------------------------------------------------------
| Return User Account data
|--------------------------------------------------------------------------------
*/
module.exports.get = function(req, res) {
  if (req.user) {
    return SuccessResponse(res, { user: req.user.toWeb() }, 200)
  } else {
    return ErrorResponse(res, { message: "Could not get any data" }, 404)
  }
}


/*
|--------------------------------------------------------------------------------
| Update User Account data
|--------------------------------------------------------------------------------
*/
module.exports.update = function(req, res) {
  // TODO: Implement
}


/*
|--------------------------------------------------------------------------------
| Delete User Account
|--------------------------------------------------------------------------------
*/
module.exports.delete = function(req, res) {
  // TODO: Implement
}
