const mongoose = require("mongoose");

// Predefined products

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
        subtitle: {
        type: String,
        required: true
    },
        startingPrice: {
        type: Number,
        required: true,
        min: 0
    },
        description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Category", categorySchema);
