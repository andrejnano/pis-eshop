const router = require("express").Router();
const passport = require('passport')
const User = require("../../models/User");
const auth = require("../../middleware/auth");

const { SuccessResponse, ErrorResponse } = require("../../utils/response.js");

//Validation
const Joi = require("@hapi/joi");

router.post("/login", auth.optional, (req, res, next) => {
  const {body: { user }} = req;
  if (!user) return ErrorResponse(res, "No user sepcified", 422)
  if (!user.email) return ErrorResponse(res, "Email is required", 422)
  if (!user.password) return ErrorResponse(res, "Password is required", 422)

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      let response_data = {
        message: 'User successfully logged in route',
        user: user.toAuthJSON()
      };
      return SuccessResponse(res, response_data, 200);
    }

    return ErrorResponse(res, "Not logged in GTFO", 400)
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  const {body: { user }} = req;

  if (!user) return ErrorResponse(res, "No user sepcified", 422)
  if (!user.email) return ErrorResponse(res, "Email is required", 422)
  if (!user.password) return ErrorResponse(res, "Password is required", 422)
  
  const finalUser = new User(user);
  finalUser.setPassword(user.password);

  //TODO throws error
  await User.findOneAndUpdate(
    {email : finalUser.email}, 
    {$setOnInsert: finalUser}, 
    {upsert: true, useFindAndModify: false}, 
    function(err, numAffected) { 
      if (numAffected) {
        return ErrorResponse(res, "User already exists", 400)
      }else {
        let response_data = {user: finalUser.toAuthJSON()};
          return SuccessResponse(res, response_data, 200);
      }
     }
);
 
});

router.get("/profile", auth.required, (req, res) => {
  let response_data = {
      message: 'Default user profile route',
    };
    return SuccessResponse(res, response_data, 200);
});

router.put("/profile", auth.optional, (req, res) => {
    let response_data = {
        message: 'Default update user profile route',
      };
      return SuccessResponse(res, response_data, 200);
});

router.delete("/profile", auth.optional, (req, res) => {
    let response_data = {
        message: 'Default delete user profile route',
      };
      return SuccessResponse(res, response_data, 200);
});

router.get("/orders", auth.required, (req, res) => {
  let response_data = {
      message: 'Default user orders route',
    };
    return SuccessResponse(res, response_data, 200);
});

module.exports = router;
