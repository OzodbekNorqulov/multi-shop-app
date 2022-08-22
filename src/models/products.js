const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    title: String,
    oldPrice: Number,
    salePrice: Number,
    inStock: Boolean,
    categoryId: String,
    subCategoryId: String,
    userId: String,
    image: {
        type: [
            String
        ]
    },
    brandId: String,
    description: String,
    comments: {
        type: [
            {
                _id: false,
                userName: String,
                text: String,
                email: String,
                star: {
                    type: Number,
                    min: 0,
                    max: 5
                }
            }
        ]
    }
}, {
    timestamps: true
});

module.exports = model("products", productSchema)