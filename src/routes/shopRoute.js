const { Router } = require("express");
const shopGetController = require("../controllers/shopGetController");
const authMiddleWare = require("../middleWares/authMiddleWare");

const router = Router()

router.get("/all", authMiddleWare, shopGetController)

module.exports = {
    path: "/products",
    router
}