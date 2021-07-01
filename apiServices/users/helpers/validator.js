const Joi = require("@hapi/joi");


module.exports = {

    async register(user) {

        const schema = Joi.object().keys({

            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email().max(50),
            password: Joi.string().min(6).required()

        });

        const response = await schema.validate(user);

        if (!response.error) {
            return false;
        } else {

            return response.error.message;
        }


    }


}