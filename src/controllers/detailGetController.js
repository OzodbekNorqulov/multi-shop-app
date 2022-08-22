const categories = require("../models/categories");
const products = require("../models/products");

module.exports = async (req, res) => {
    try {
        const { productName } = req.params
        const productCurrentName = productName.replace("-", " ");
        const category = await categories.find({})

        const product = await products.findOne({
            title: productCurrentName
        })

        res.render("detail", { product, user: req.user, categories: category, isLoggedIn: req.user ? true : false })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}