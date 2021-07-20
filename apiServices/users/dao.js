const userSchema = require("./schema");
const hash = require("./helpers/hash");
const dto = require("./dto");

const createUser = async(user) => {

    // true: return all the info asociated with the email, false: does not exist email.
    const emailExists = await userSchema.findOne({ email: user.email });

    if (emailExists) {

        const response = {

            status: 200,
            data: "Email already exists"
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

            const result = await post.save();
            const response = {
                status: 201,
                data: "Your account has been created successfully."
            }
            return response;

        } catch (error) {

            const response = {
                status: 500,
                data: error
            }
            return response;
        }

    }
}

const getUsers = async() => {

    try {

        const usersFromDB = await userSchema.find();

        if (usersFromDB[0]) {

            const users = dto.getUsers(usersFromDB);

            const response = {
                status: 200,
                data: users
            }
            return response;

        } else {

            const response = {
                status: 404,
                data: "There are not users"
            }

            return response;
        }

    } catch (error) {

        response = {
            status: 404,
            data: error
        }

    }

}

const getUser = async(id) => {

    try {

        const userFromDB = await userSchema.findById({ _id: id });
        user = dto.getUser(userFromDB);

        const response = {
            status: 200,
            data: user
        }
        return response;

    } catch (error) {

        const response = {
            status: 404,
            data: "No found the: " + error.stringValue
        }
        return response;
    }
}

const login = async(user) => {

    // true: return all the info asociated with the email, false: does not exist email.
    const userExists = await userSchema.findOne({ email: user.email });

    if (userExists) {

        // now verify the password  true: password mach  false: password does not mach
        const verifyPassword = await hash.validatePassword(user.password, userExists.password);

        if (verifyPassword) {

            user = dto.getUser(userExists);

            const response = {
                status: 200,
                data: user
            }
            return response;

        } else {

            const response = {
                status: 401,
                data: "Password does not match"
            }
            return response;
        }

    } else {

        const response = {
            status: 404,
            data: "Email does not exists"
        }
        return response;
    }

}





module.exports = { createUser, getUser, getUsers, login }