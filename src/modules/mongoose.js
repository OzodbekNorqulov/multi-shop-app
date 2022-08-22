const mongoose = require("mongoose")
const { mongoUrl } = require("../../config")
const cart = require("../models/cart")
const categories = require("../models/categories")
const order = require("../models/order")
const products = require("../models/products")
const sessions = require("../models/sessions")
const users = require("../models/users")
module.exports = () => {
    mongoose.connect(mongoUrl, (err) => {
        if(err) {
            console.log(`MONGO CONNECTION ERROR, ${err}`);
        }else {
            console.log('MONGODB CONNECTED SUCCESSFULLY');
        }
    })
}