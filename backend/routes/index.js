const CONFIG = require('../config');
var router = require('express').Router()

/*
|--------------------------------------------------------------------------------
| Router Index
|--------------------------------------------------------------------------------
*/

router.get('/', (req, res) => {
  res.send('Backend is live :)');
});

/*
|--------------------------------------------------------------------------------
| Health Check Route
|--------------------------------------------------------------------------------
*/
router.get('/api/healthcheck', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  let returnData = {
    timestamp: Date.now(),
    msg: `This is a msg from Backend at :${CONFIG.port}`
  };
  return res.send(returnData);
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
