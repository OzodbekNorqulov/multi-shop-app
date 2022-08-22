const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    productId: String,
    userId: String,
    count: Number,
}, {
    timestamps: true
});

module.exports = model("cart", cartSchema)