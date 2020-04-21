const mongoose = require("mongoose");
const Category = require("../models/Category");
const Configuration = require("../models/Configuration");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  configuration: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Configuration
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Category
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  icon: {
    type: String,
    required: true
},
  description: {
    type: String,
    required: true,
    max: 2048
  }
});

module.exports = mongoose.model("Product", productSchema);
