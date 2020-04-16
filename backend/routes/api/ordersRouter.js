const router = require("express").Router();
const auth = require("../../middleware/auth");

const { SuccessResponse, ErrorResponse } = require("../../utils/response.js");

//Validation
const Joi = require("@hapi/joi");


router.get("/", auth.optional, (req, res) => {
    //TODO login
    let response_data = {
        message: 'Default orders route',
      };
      return SuccessResponse(res, response_data, 200);
});

router.get("/id/:orderId", auth.optional, (req, res) => {
    //TODO login
    let response_data = {
        message: 'Default orders with number ' + req.params.orderId + ' route',
      };
      return SuccessResponse(res, response_data, 200);
});

module.exports = router;
