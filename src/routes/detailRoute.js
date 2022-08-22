const { Router } = require("express");
const detailGetController = require("../controllers/detailGetController");
const authMiddleWare = require("../middleWares/authMiddleWare");

const router = Router()

router.get("/:productName", authMiddleWare, detailGetController)

module.exports = {
    path: "/product",
    router
}