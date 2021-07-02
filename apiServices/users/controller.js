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

    async getUser(req, res) {

        const id = req.params.id;


        const response = await model.getUser(id);
        res.json(response);

    },

    async login(req, res) {

        const response = await model.login(req.body);
        res.json(response);

    }

}