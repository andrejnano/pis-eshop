const router = require("express").Router();
const auth = require("../../middleware/auth");
const Configuration = require("../../models/Configuration");
const Product = require("../../models/Product");
const Coupon = require("../../models/Coupon");

const { SuccessResponse, ErrorResponse } = require("../../utils/response.js");

//Validation
const Joi = require("@hapi/joi");


router.get("/", auth.optional, (req, res) => {
  Product.find({}, (err, products) =>{
      let response_data = {
        message: 'Default products route',
        products: products
      };
      return SuccessResponse(res, response_data, 200);
    }
  );

  
});

router.get("/id/:productId", auth.optional, (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
      let response_data = {
        message: 'Default products with number ' + req.params.orderId + ' route',
        product: product
      };
      return SuccessResponse(res, response_data, 200);
    })
    
});

router.get("/init", async (req, res) => {
  const savedConfig1 = await new Configuration({
    os: "Minecraft",
    ram: 4,
    cpu: 2,
    hddType: "HDD",
    ipCount: 3,
  }).save();

  const savedConfig2 = await new Configuration({
    os: "CS:GO",
    ram: 16,
    cpu: 4,
    hddType: "SSD",
    ipCount: 1,
  }).save();

  const savedConfig3 = await new Configuration({
    os: "TeamSpeak3",
    ram: 4,
    cpu: 1,
    hddType: "HDD",
    ipCount: 1,
  }).save();

  const savedConfig4 = await new Configuration({
    os: "TeamSpeak3",
    ram: 16,
    cpu: 2,
    hddType: "SSD",
    ipCount: 2,
  }).save();

  await new Product({
    name: "Minecraft lite",
    configurationId: savedConfig1._id,
    price: 125,
    description: "Tento server je best server minecrafter.",
  }).save();

  await new Product({
    name: "CS:GO palba",
    configurationId: savedConfig2._id,
    price: 212,
    description: "Tento server je kantrstrajk.",
  }).save();

  await new Product({
    name: "Basic TeamSpeak server",
    configurationId: savedConfig3._id,
    price: 260,
    description: "Pokecejte s kamosema",
  }).save();

  await new Product({
    name: "Basic TeamSpeak server",
    configurationId: savedConfig4._id,
    price: 350,
    description: "Pokecejte s kamosema ve vysoke kvalite",
  }).save();

  await new Coupon({
    value: "94R6AAQ56D",
    discount: 25,
  }).save();

  await new Coupon({
    value: "BDRGA92VPE",
    discount: 33,
  }).save();

  let response_data = {
    message: `MongoDB had been initialized.`,
  };
  return SuccessResponse(res, response_data, 200);
});

module.exports = router;
