const model = require("./model");
const jwt = require("../../middlewares/jwt");


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

        const user = await model.login(req.body); //user come with all validations 

        if (user._id) { //if user.id exists it means that DB found the user or password maches.

            const response = await jwt.createToken(req, res, user);
            res.json(response);

        } else {

            res.json(user);

        }
    },

    async post(req, res) {

        res.status(200).json(req.user);

    }

}