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
let ConfigurationController  = require('../../controllers/ConfigurationController')
let OrderController = require('../../controllers/OrderController')
let ProductController = require('../../controllers/ProductController')
let CouponController = require('../../controllers/CouponController')


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
router.post(    '/users',   UserController.create)                                                  // C
router.get(     '/users',   passport.authenticate('jwt', {session: false}), UserController.get)     // R
router.put(     '/users',   passport.authenticate('jwt', {session: false}), UserController.update)  // U
router.delete(  '/users',   passport.authenticate('jwt', {session: false}), UserController.delete)  // D


/*
|--------------------------------------------------------------------------------
| User Login Route   "/api/users/login/"
|--------------------------------------------------------------------------------
*/
router.post('/users/login', UserController.login)


/*
|--------------------------------------------------------------------------------
| Orders Route   "/api/orders/"
|--------------------------------------------------------------------------------
*/
router.post(    '/orders',             passport.authenticate('jwt', {session: false}), OrderController.create)                                                  // C
router.get(     '/orders',             passport.authenticate('jwt', {session: false}), OrderController.getAll)
router.get(     '/orders/:order_id',   passport.authenticate('jwt', {session: false}), OrderController.get)
router.put(     '/orders/:order_id',   passport.authenticate('jwt', {session: false}), OrderController.update)
router.delete(  '/orders/:order_id',   passport.authenticate('jwt', {session: false}), OrderController.delete)


/*
|--------------------------------------------------------------------------------
| Products Route   "/api/products/"
|--------------------------------------------------------------------------------
*/
router.post(    '/products',               passport.authenticate('jwt', {session: false}), ProductController.create)                                                  // C
router.get(     '/products',               passport.authenticate('jwt', {session: false}), ProductController.getAll)
router.get(     '/products/:product_id',   passport.authenticate('jwt', {session: false}), ProductController.get)
router.put(     '/products/:product_id',   passport.authenticate('jwt', {session: false}), ProductController.update)
router.delete(  '/products/:product_id',   passport.authenticate('jwt', {session: false}), ProductController.delete)


/*
|--------------------------------------------------------------------------------
| Coupons Route   "/api/coupons/"
|--------------------------------------------------------------------------------
*/
router.post(    '/coupons',              passport.authenticate('jwt', {session: false}), CouponController.create)                                                  // C
router.get(     '/coupons',              passport.authenticate('jwt', {session: false}), CouponController.getAll)
router.get(     '/coupons/:coupon_id',   passport.authenticate('jwt', {session: false}), CouponController.get)
router.put(     '/coupons/:coupon_id',   passport.authenticate('jwt', {session: false}), CouponController.update)
router.delete(  '/coupons/:coupon_id',   passport.authenticate('jwt', {session: false}), CouponController.delete)


/*
|--------------------------------------------------------------------------------
| Configurations Route   "/api/configuration/"
|--------------------------------------------------------------------------------
*/
router.post(    '/configurations',                    passport.authenticate('jwt', {session: false}), ConfigurationController.create)                                                  // C
router.get(     '/configurations',                    passport.authenticate('jwt', {session: false}), ConfigurationController.getAll)
router.get(     '/configurations/configuration_id',   passport.authenticate('jwt', {session: false}), ConfigurationController.get)
router.put(     '/configurations/configuration_id',   passport.authenticate('jwt', {session: false}), ConfigurationController.update)
router.delete(  '/configurations/configuration_id',   passport.authenticate('jwt', {session: false}), ConfigurationController.delete)


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
