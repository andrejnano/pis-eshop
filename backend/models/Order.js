const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");

const orderSchema = new mongoose.Schema({
  payment: {
    type: String,
    enum: ["PayPal", "PaySafeCard", "Bankovní převod", "Bitcoin", "GoPay"],
    default: "PayPal"
  },
  
  price: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Product
  }],
  date: {
    type: Date,
    default: Date.now
  },
  state: {
    type: String,
    enum: ["created", "active", "cancelled", "expired"],
    default: "created"
  }
});

module.exports = mongoose.model("Order", orderSchema);
