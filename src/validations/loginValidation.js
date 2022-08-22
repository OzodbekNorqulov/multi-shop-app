const Joi = require("joi");

module.exports = Joi.object({
    userName: Joi.string().trim().required().min(5).max(30),
    password: Joi.string().required().trim()
})