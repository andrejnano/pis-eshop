const mongoose = require("mongoose");

// Predefined products

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  configurationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
    max: 2048
  }
});

module.exports = mongoose.model("Product", productSchema);
