const { Router } = require("express");
const loginPostController = require("../controllers/loginPostController");

const router = Router()

router.post("/login", loginPostController)

module.exports = {
    path: "/",
    router
}