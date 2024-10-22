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
router.get(     '/users/init',  UserController.init)
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
router.get(     '/orders/init',        OrderController.init)                                                  // C
router.post(    '/orders',             passport.authenticate('jwt', {session: false}), OrderController.create)                                                  // C
router.get(     '/orders',             passport.authenticate('jwt', {session: false}), OrderController.getMy)
router.get(     '/orders/all',             passport.authenticate('jwt', {session: false}), OrderController.getAll)
router.get(     '/orders/:order_id',   passport.authenticate('jwt', {session: false}), OrderController.get)
router.put(     '/orders/:order_id',   passport.authenticate('jwt', {session: false}), OrderController.update)
router.delete(  '/orders/:order_id',   passport.authenticate('jwt', {session: false}), OrderController.delete)
router.get(  '/orders/:order_id/pay',   passport.authenticate('jwt', {session: false}), OrderController.pay)
router.get(  '/orders/:order_id/cancel',   passport.authenticate('jwt', {session: false}), OrderController.cancel)
router.get(  '/orders/:order_id/reset',   passport.authenticate('jwt', {session: false}), OrderController.reset)


/*
|--------------------------------------------------------------------------------
| Products Route   "/api/products/"
|--------------------------------------------------------------------------------
*/
router.post(    '/products',               passport.authenticate('jwt', {session: false}), ProductController.create)                                                  // C
router.get(     '/products/init',          ProductController.init)
router.get(     '/categories',             ProductController.getCategories)                                             // C
router.get(     '/categories/:category_id',ProductController.getCategory)                                             // C
router.get(     '/products',               ProductController.getAll)
router.get(     '/products/:product_id',   ProductController.get)
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
