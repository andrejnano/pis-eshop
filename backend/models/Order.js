const mongoose = require("mongoose");

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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  configurationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
