const { Router } = require("express")
const homeGetController = require("../controllers/homeGetController")
const authMiddleWare = require("../middleWares/authMiddleWare")

const router = Router()

router.get("/", authMiddleWare, homeGetController)



module.exports = {
    path: "/",
    router
}