const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
    userAgent: {
        type: String
    },
    ipAddress: String,
}, {
    timestamps: true
})

module.exports = model("sessions", sessionSchema)