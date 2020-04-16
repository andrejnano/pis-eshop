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

router.use('/user', require('./usersRouter'));
router.use('/orders', require('./ordersRouter'));
router.use('/products', require('./productsRouter'));


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
