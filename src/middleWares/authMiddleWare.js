const { JsonWebTokenError } = require("jsonwebtoken");
const { secretWord } = require("../../config");
const users = require("../models/users")
const { verifyJWT } = require("../modules/jwt")

module.exports = async ( req, res, next ) => {
   try {
    const { token } = req.cookies
    

    const payload = verifyJWT(token)

    if(!payload) throw new Error("token not found")

    const user = await users.findById(payload.userId)

    req.user = user
    next()


   } catch (e) {
    res.render("index", { ok: false, error: e + "" })
		if (e instanceof JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
			return res.status(401).end()
		}
		// otherwise, return a bad request error
		return res.status(400).end()
   }
}