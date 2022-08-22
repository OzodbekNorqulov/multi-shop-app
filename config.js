require("dotenv").config()

const { env } = process

module.exports = {
    port: env.PORT,
    mongoUrl: env.MONGO_URL,
    secretWord: env.SECRET_WORD
}