const bcrypt = require("bcrypt");


const password = async(password) => {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    try {

        const response = await bcrypt.hash(password, salt);
        return response;
    } catch (error) {
        return error;
    }

}

const validatePassword = async(password, hash) => {

    try {

        const response = await bcrypt.compare(password, hash);
        return response;

    } catch (error) {

        return error;
    }

}

module.exports = { password, validatePassword }