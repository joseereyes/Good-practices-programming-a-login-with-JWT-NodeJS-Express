const model = require("./model");
const jwt = require("../../middlewares/jwt");


const createUser = async(req, res) => {

    const response = await model.createUser(req.body);
    res.json(response);
}

const getUsers = async(req, res) => {

    const response = await model.getUsers();
    res.json(response);

}

const getUser = async(req, res) => {

    const id = req.params.id;


    const response = await model.getUser(id);
    res.json(response);

}

const login = async(req, res) => {

    const user = await model.login(req.body); //user come with all validations 

    if (user._id) { //if user.id exists it means that DB found the user or password maches.

        const response = await jwt.createToken(req, res, user);
        res.json(response);

    } else {

        res.json(user);

    }
}

const post = async(req, res) => {

    res.status(200).json(req.user);

}


module.exports = { createUser, getUsers, getUser, login, post }