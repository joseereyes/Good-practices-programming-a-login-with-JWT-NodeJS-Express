const dao = require("./dao");
const validation = require("./helpers/validator");

module.exports = {

    async createUser(user) {

        const postValidation = await validation.register(user); // validates that all fields are correctly sent from frontend.

        if (postValidation) {

            return postValidation;

        } else {

            const response = await dao.createUser(user);
            return response;
        }
    },
    async getUsers() {

        const response = await dao.getUsers();
        return response;
    },
    async getUser(id) {

        const response = await dao.getUser(id);
        return response;

    },
    async login(user) {

        const postValidation = await validation.login(user);

        if (postValidation) {

            return postValidation;

        } else {

            try {

                const response = dao.login(user);
                return response;

            } catch (error) {

                return error;

            }

        }

    }

}