
const CONFIG = require('../config');
var router = require('express').Router();

const { SuccessResponse, ErrorResponse } = require('../utils/response.js');

/*
|--------------------------------------------------------------------------------
| Router Index
|--------------------------------------------------------------------------------
*/

router.get('/', (req, res) => {
  let response_data = {
    message: `VPS Eshop.blue ${new Date().getFullYear()} ~ Backend service`,
    comment: 'This is the index route for the whole backend application.',
  }
  return SuccessResponse(res, response_data, 200)
});


/*
|--------------------------------------------------------------------------------
| API Index
|--------------------------------------------------------------------------------
*/

router.use('/api/', require('./api'));

/*
|--------------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------------
*/
router.get('/api/healthcheck', (req, res) => {
  let response_data = {
    message: `This message was sent by the backend service running on port :${CONFIG.port}`,
  }
  return SuccessResponse(res, response_data, 200)
});


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
