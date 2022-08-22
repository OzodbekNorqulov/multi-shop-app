const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    fullName: String,
    phone: String,
    city: String,
    district: String,
    address: String,
    comment: String,
    userId: String,
    orderItems: {
        type: [
            {
                productId: String,
                count: Number
            }
        ]
    }
}, {
    timestamps: true
})

module.exports = model("orders", orderSchema)