const Joi = require("@hapi/joi");
const schema = require("../schema");


const register = async(user) => {

    const schema = Joi.object().keys({

        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email().max(50),
        password: Joi.string().min(6).required()

    });

    const validation = await schema.validate(user);

    if (validation.error) {

        const response = {
            status: 200,
            data: validation.error.message
        }
        return response;

    } else {
        return false;
    }

}

const login = async(user) => {

    const schema = Joi.object().keys({

        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    const response = await schema.validate(user);

    if (response.error) {

        const error = {
            status: 401,
            data: response.error.message
        }

        return error;

    } else {

        return false;
    }
}

module.exports = { register, login }