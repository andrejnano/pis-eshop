const router = require("express").Router();
const Coupon = require("../../models/Coupon");

const { SuccessResponse, ErrorResponse } = require("../../utils/response.js");

//Validation
const Joi = require("@hapi/joi");

router.get("/init", async (req, res) => {
  await new Coupon({
    value: "94R6AAQ56D",
    discount: 25,
  }).save();

  await new Coupon({
    value: "BDRGA92VPE",
    discount: 33,
  }).save();

  await new Coupon({
    value: "VPEON43SP3",
    discount: 25,
  }).save();

  await new Coupon({
    value: "FOI3NVOOPX",
    discount: 20,
  }).save();

  await new Coupon({
    value: "29V901PV78",
    discount: 5,
  }).save();

  await new Coupon({
    value: "VKNR21OREV",
    discount: 5,
  }).save();

  let response_data = {
    message: `MongoDB had been initialized - COUPONS`,
  };
  return SuccessResponse(res, response_data, 200);
});

router.get("/all", (req, res) => {
  Coupon.find({}, (err, coupons) => res.send(coupons));
});

module.exports = router;
