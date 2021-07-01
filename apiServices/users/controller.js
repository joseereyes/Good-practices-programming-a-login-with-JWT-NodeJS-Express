const model = require("./model");


module.exports = {

    async createUser(req, res) {

        const response = await model.createUser(req.body);
        res.json(response);
    },

    async getUsers(req, res) {

        const response = await model.getUsers();
        res.json(response);

    },



}