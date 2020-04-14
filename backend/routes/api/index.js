/*
|--------------------------------------------------------------------------------
| * API Routes *
|--------------------------------------------------------------------------------
*/
const passport = require('passport')
const { SuccessResponse, ErrorResponse} = require('../../utils/response')

let router = require('express').Router()


/*
|--------------------------------------------------------------------------------
| Use Custom Strategy w/ Passport middleware
|--------------------------------------------------------------------------------
*/
passport.use(require('../../middleware/passport').userIdAuthStrategy())


/*
|--------------------------------------------------------------------------------
| Import All Controllers
|--------------------------------------------------------------------------------
*/
let UserController = require('../../controllers/UserController')
// let configuration_controller  = require('../../controllers/ConfigurationController')
// let order_controller = require('../../controllers/OrderController')
// let product_controller = require('../../controllers/ProductController')
// let coupon_controller = require('../../controllers/CouponController')

/*
|--------------------------------------------------------------------------------
| Index Route   "/api/"
|--------------------------------------------------------------------------------
*/
router.get('/', (req, res, next) => {
  let response_data = {
    message: `API for [ VPS | eshop.blue ]`,
    comment: 'This is the API route for the whole backend application.',
  }
  return SuccessResponse(res, response_data, 200)
})

/*
|--------------------------------------------------------------------------------
| Users Route   "/api/users/"
|--------------------------------------------------------------------------------
*/
// router.post(    '/users',   UserController.create)                                                  // C
router.get('/users',   passport.authenticate('jwt', {session: false}), UserController.get)     // R
// router.put(     '/users',   passport.authenticate('jwt', {session: false}), UserController.update)  // U
// router.delete(  '/users',   passport.authenticate('jwt', {session: false}), UserController.delete)  // D


/*
|--------------------------------------------------------------------------------
| User Login Route   "/api/users/login/"
|--------------------------------------------------------------------------------
*/
router.post('/users/login', UserController.login)




/*
|--------------------------------------------------------------------------------
| Catch all other invalid requests and respond with 404
|--------------------------------------------------------------------------------
*/
router.get( '*' , (req, res, next) => {
  return ErrorResponse(res, {message: "Resource not found!"}, 404)
})


//-----------------------------------------------------------------------------
module.exports = router
//-----------------------------------------------------------------------------
