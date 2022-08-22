const Joi = require("joi");

module.exports = Joi.object({
    fullName: Joi.string().trim().required(),
    email: Joi.string().pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
    userName: Joi.string().trim().required().min(5),
    password: Joi.string().required().trim()
})