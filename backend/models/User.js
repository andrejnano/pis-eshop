const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config");

const userSchema = new mongoose.Schema({
  email: String,
  hash: String,
  salt: String,
  admin: {
    type: Boolean,
    default: false
  },
});


userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");

    // STORE
    this.save();
};

userSchema.methods.validatePassword = function (password) {

  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");

  // return user object if password is correct, otherwise null
  return (this.hash === hash) ? this : null;
};


/*
|--------------------------------------------------------------------------------
|  Sign and return JWT - Auth Token
|--------------------------------------------------------------------------------
*/

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    "secret"
  );
};

userSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

// alternative implementation:
// -- start
/*
|--------------------------------------------------------------------------------
|  Sign and return JWT - Auth Token
|--------------------------------------------------------------------------------
*/
userSchema.methods.getJWT = function() {
  let expirationTime = parseInt(CONFIG.jwt_expiration)
  let token = jwt.sign({ user_id: this._id}, CONFIG.jwt_secret, {expiresIn: expirationTime})
  return `Bearer ${token}`
}


/*
|--------------------------------------------------------------------------------
|  Data Model -> JSON
|--------------------------------------------------------------------------------
*/
userSchema.methods.toWeb = function() {
  let json = this.toJSON()
  delete json.salt
  delete json.hash
  delete json.__v
  delete json._id
  return json
}

/*
|--------------------------------------------------------------------------------
|  User Orders
|--------------------------------------------------------------------------------
*/
// userSchema.methods.myOrders = async function () {
//   return new Promise((resolve, reject) => {
//     // search for all orders made by the currently logged in user
//     let searchQuery = { owner: { permissions: [], user_id: this._id } }
//     Order.find(searchQuery, (err, results) => {
//       if (err) reject(err)
//       else resolve(results)
//     })
//   })
// }





// --- end

module.exports = mongoose.model("User", userSchema);
