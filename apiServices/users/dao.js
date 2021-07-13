const userSchema = require("./schema");
const hash = require("./helpers/hash");


const createUser = async(user) => {

    // true: return all the info asociated with the email, false: does not exist email.
    const emailExists = await userSchema.findOne({ email: user.email });

    if (emailExists) {

        const response = {
            message: "Email already exists",
            status: 409
        }

        return response;

    } else {

        const hashedPassword = await hash.password(user.password);

        const post = new userSchema({

            name: user.name,
            email: user.email,
            password: hashedPassword

        });

        try {

            const response = await post.save();
            response.status = 201;
            return response;

        } catch (error) {

            error.status = 500;
            return error;
        }

    }
}

const getUsers = async() => {

    try {

        const response = await userSchema.find();

        if (response[0]) {

            response.status = 200;
            return response;

        } else {

            const response = {
                status: 404,
                message: "There are not users"
            }

            return response;
        }

    } catch (error) {

        error.status = 404;
        error;

    }

}

const getUser = async(id) => {

    try {

        const response = await userSchema.findById({ _id: id });
        response.status = 200;
        return response;

    } catch (error) {

        error.status = 404;
        return error;
    }
}

const login = async(user) => {

    // true: return all the info asociated with the email, false: does not exist email.
    const userExists = await userSchema.findOne({ email: user.email });

    if (userExists) {

        // now verify the password  true: password mach  false: password does not mach
        const verifyPassword = await hash.validatePassword(user.password, userExists.password);

        if (verifyPassword) {

            userExists.status = 200;
            return userExists;

        } else {

            const response = {
                status: 409,
                message: "Password does not mach"
            }
            return response;
        }

    } else {

        const response = {
            status: 404,
            message: "Email does not exists"
        }
        return response;
    }

}





module.exports = { createUser, getUser, getUsers, login }