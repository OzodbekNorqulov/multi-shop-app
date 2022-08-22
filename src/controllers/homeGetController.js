const { secretWord, mongoUrl } = require("../../config");
const categories = require("../models/categories");

module.exports = async ( req, res ) => {
    const category = await categories.find({})
    // console.log(category);
    res.render("index", { user: req.user, categories: category, isLoggedIn: req.user ? true : false }) 
}