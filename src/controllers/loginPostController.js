const { sign } = require("jsonwebtoken");
const { secretWord } = require("../../config");
const users = require("../models/users");
const { compareHash } = require("../modules/bcrypt");
const { generateJWT } = require("../modules/jwt");
const loginValidation = require("../validations/loginValidation");
// const { generateJWT } = require("../modules/jwt")
module.exports = async (req, res) => {
    try {
        const { userName, password } = await loginValidation.validateAsync(req.body);

        let user = await users.findOne({
            userName: userName.toLowerCase()
        });

        if(!user) throw new Error("User Not Found");

        const isPasswordTrue = await compareHash(password, user.password)

        if(!isPasswordTrue) throw new Error("Username or Password incorrect")
        
        const token = generateJWT({
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            password: user.password,
            userId: user._id
        })

        res.cookie("token", token).redirect('/')
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}