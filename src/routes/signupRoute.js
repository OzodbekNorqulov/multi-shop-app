const { Router } = require("express")
const signupPostController = require("../controllers/signupPostController")


const router = Router()

router.post("/create", signupPostController)

module.exports = {
    path: "/",
    router
}

