const categories = require("../models/categories")
const products = require("../models/products")

module.exports = async (req, res) => {
    try {
        const allProducts = await products.find({})
        const category = await categories.find({})
        res.render("shop", { user: req.user, categories: category, isLoggedIn: req.user ? true : false,  products: allProducts})
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}