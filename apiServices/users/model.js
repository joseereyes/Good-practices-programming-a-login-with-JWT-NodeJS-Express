const dao = require("./dao");
const validation = require("./helpers/validator");

module.exports = {

    async createUser(user) {

        const userValidation = await validation.register(user);

        if (userValidation) {

            return userValidation;

        } else {

            const response = await dao.createUser(user);
            return response;
        }
    },
    async getUsers() {

        const response = await dao.getUsers();
        return response;
    }

}