const categories = require("../models/categories")

module.exports = async ( req, res ) => {
    try {
        const category = await categories.find({})
        res.render("create", { user: req.user, categories: category, isLoggedIn: req.user ? true : false })
        
    } catch (e) {
        res.status(400).json({ 
            ok: false,
            message: e + ""
        })
    }
}