const dao = require("./dao");
const validation = require("./helpers/postValidation");


const createUser = async(user) => {

    const postFieldsErr = await validation.register(user); // validates that all fields are correctly sent from frontend.

    if (postFieldsErr) {

        return postFieldsErr;

    } else {

        const response = await dao.createUser(user);
        return response;
    }
}

const getUsers = async() => {

    const response = await dao.getUsers();
    return response;
}

const getUser = async(id) => {

    const response = await dao.getUser(id);
    return response;

}

const login = async(user) => {

    const postValidation = await validation.login(user); // returns true if post.values have error and false if does not exists error

    if (postValidation) {

        return postValidation;

    } else {

        //response will get the user from DB or a response with email error o password error;
        const response = await dao.login(user);
        return response;

    }

}



module.exports = { createUser, getUsers, getUser, login }