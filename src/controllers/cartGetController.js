const cart = require("../models/cart");
const categories = require("../models/categories");
const products = require("../models/products");

module.exports = async (req, res) => {
    try {
        const cartItems = await cart.find({ userId: req.user._id})
        let findedProd = await products.find({})
        let cartProducts;
        let quantities = []
        let ids = []
        
        quantities = []
        ids = []
        for(let i = 0; i < cartItems.length; i++) {
            for(let j = 0; j < findedProd.length - 1; j++) {
                if(cartItems[i].productId == findedProd[j]._id){
                    
                    cartProducts = [...findedProd]
                }
            }
            
            quantities.push(cartItems[i].count)
            ids.push(cartItems[i]._id)
        }
        console.log(cartProducts);
        console.log(cartItems);
        console.log(quantities); 
        const category = await categories.find({})
       res.render("cart", {ids, quantities, products: cartProducts, user: req.user, categories: category, isLoggedIn: req.user ? true : false })
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}