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
    }
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;