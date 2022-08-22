const categories = require("../models/categories")
const products = require("../models/products")

module.exports = async (req, res) => {
    try {
        const body = {...req.body}
        const { title, category, oldPrice, salePrice, description, subcategory } = body
        const productCategory = await categories.findOne({ name: category })
    
        const productSubCategory = await productCategory.subcategories.find(i => i.name.toLowerCase() == subcategory.toLowerCase())
        const newProduct = await products.create({
            title,
            oldPrice,
            salePrice,
            inStock: true,
            categoryId: productCategory._id,
            subCategoryId: productSubCategory._id,
            userId: req.user._id,
            image: req.img,
            description
        })
        console.log(req.img);
        res.status(200).json({
            ok: true,
        })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}