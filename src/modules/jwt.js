const { sign, verify } = require("jsonwebtoken");
const { secretWord } = require("../../config");

module.exports.generateJWT = (payload) => sign(payload, process.env.SECRET_WORD,  {
    algorithm: "HS256",
    expiresIn: "31d",
});

module.exports.verifyJWT = (token) => {
    try {
        return verify(token, process.env.SECRET_WORD)
    } catch (e) {
        return false
    }
}