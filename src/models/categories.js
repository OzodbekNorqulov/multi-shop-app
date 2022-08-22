const { model, Schema } = require("mongoose")

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    src: String,
    subcategories: {
        type: [
            {
                name: String
            }
        ]
    }
}, {
    timestamps: true
})

module.exports = model("categories", categorySchema)