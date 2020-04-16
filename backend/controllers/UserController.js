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

  let email = req.body.email
  let password = req.body.password

  if (!email || !password) {
    return ErrorResponse(res, { message: "Parameter is missing."}, 422)
  }

  try {
    User.create({ email: email })
      .then((user) => {
        user.setPassword(password)
        let message = {
          message: 'Successfully created new user account.',
          user: user.toWeb(),
          token: user.getJWT()
        }
        return SuccessResponse(res, message, 200)
      })
  } catch (error) {
    return ErrorResponse(res, error, 422)
  }
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

// todo: password update doesn't work
// there should be a mechanism, which detects if the password in the request
// is a new one, if so, it should call the setPassword() method
// alternatively, userSchema can directly specify password as a hash
module.exports.update = async function(req, res) {
  try {
    await req.user.set(req.body)
    await req.user.save()
    return SuccessResponse(res, { user: req.user.toWeb() }, 200)
  } catch (error) {
    return ErrorResponse(res, error, 501)
  }
}


/*
|--------------------------------------------------------------------------------
| Delete User Account
|--------------------------------------------------------------------------------
*/
module.exports.delete = function(req, res) {
  try {
    User.deleteOne({_id: req.user._id})
      .then(() => {
        return SuccessResponse(res, { message: 'User Account Deleted' }, 204)
      })
  } catch(error) {
    return ErrorResponse(res, error, 400)
  }

}
