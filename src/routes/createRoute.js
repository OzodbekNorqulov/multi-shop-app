const { Router } = require("express");
const createProductController = require("../controllers/createProductController");
const createProductPostController = require("../controllers/createProductPostController");
const { imgCreated } = require("../controllers/imgCreated");
const productCreatedPostController = require("../controllers/productCreatedPostController");
const productDoesCreated = require("../controllers/productDoesCreated");
const authMiddleWare = require("../middleWares/authMiddleWare");


const router = Router()

router.get("/create", authMiddleWare, createProductController)
router.post("/new", authMiddleWare, createProductPostController)
router.post("/created", authMiddleWare, productCreatedPostController, productDoesCreated)
router.post("/created/img", authMiddleWare, imgCreated)

module.exports = {
    path: "/products",
    router
}