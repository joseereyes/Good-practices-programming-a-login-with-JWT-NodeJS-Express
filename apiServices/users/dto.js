const { response } = require("express");

const getUser = (object) => {

    const { _id, name, email } = object;

    const response = {

        _id,
        name,
        email
    }

    return response;
}

const getUsers = (object) => {

    const response = [];
    for (var i = 0; i < object.length; i++) {

        const { _id, name, email } = object[i];

        response.push({

            _id,
            name,
            email

        })
    }

    return response;
}

module.exports = { getUser, getUsers }