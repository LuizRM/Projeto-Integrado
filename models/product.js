const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expiration: {
        type: Date,
        required: true,
    },
    added: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;