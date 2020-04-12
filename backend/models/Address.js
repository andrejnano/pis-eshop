const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  city: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  country: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  postalCode: {
    type: String,
    required: true,
    max: 255,
    min: 6
  }
});

module.exports = mongoose.model("Address", addressSchema);
