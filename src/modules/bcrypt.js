const { hash, genSalt } = require("bcrypt")
const { verify } = require("jsonwebtoken")

module.exports.generateHash = async (password) => {
    const salt = await genSalt(12)
    return await hash(password, salt)
}

module.exports.compareHash = async (password, hash) => {
    return await verify(password, hash)
}