const { Router } = require("express");
const authMiddleWare = require("../middleWares/authMiddleWare");
const cartGetController = require("../controllers/cartGetController")

const router = Router()

router.get("/cart", authMiddleWare, cartGetController)

module.exports = {
    path: "/user",
    router
}