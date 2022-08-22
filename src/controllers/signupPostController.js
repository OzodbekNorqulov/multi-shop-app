const users = require("../models/users")
const { generateHash } = require("../modules/bcrypt")
const { generateJWT } = require("../modules/jwt")
const signupValidation = require("../validations/signupValidation")

module.exports = async (req, res) => {
    // return socket.emit("new_user", user)
    try {
        const { userName, email, password, fullName } = await signupValidation.validateAsync(req.body)

        console.log(req.body);

        const user = await users.findOne({
            userName: userName.toLowerCase()
        })

        if(user) throw new Error("user is already exists !")

        const pass = await generateHash(password)

        const newUser = await users.create({
            fullName: fullName.toLowerCase(),
            userName,
            email,
            password: pass
        })

        const token = generateJWT({
            fullName: newUser.fullName,
            userName: newUser.userName,
            email: newUser.email,
            password: newUser.password,
            userId: newUser._id
        })

        res.cookie("token", token).redirect("/")
    } catch (e) {
        res.status(400).json({
            ok: false,
            message: e + ""
        })
    }
}