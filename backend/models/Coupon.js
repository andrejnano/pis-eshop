const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    min: 10,
    max: 10
  },
  discount: {
    type: Number,
    required: true,
    max: 100
  }
});

module.exports = mongoose.model("Coupon", couponSchema);
