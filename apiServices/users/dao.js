const userSchema = require("./schema");
const hash = require("./helpers/hash");


const createUser = async(user) => {

    // true: return all the info asociated with the email, false: does not exist email.
    const emailExists = await userSchema.findOne({ email: user.email });

    if (emailExists) {

        return "Email already exists";

    } else {

        const hashedPassword = await hash.password(user.password);

        const post = new userSchema({

            name: user.name,
            email: user.email,
            password: hashedPassword

        });

        try {

            const response = await post.save();
            return response;

        } catch (error) {

            return error;
        }

    }
}

const getUsers = async() => {

    try {

        const response = await userSchema.find();
        return response;

    } catch (error) {

        return error;

    }

}

const getUser = async(id) => {

    try {
        const response = await userSchema.findById({ _id: id });
        return response;
    } catch (error) {

        return error;
    }
}

const login = async(user) => {

    // true: return all the info asociated with the email, false: does not exist email.
    const userFromDb = await userSchema.findOne({ email: user.email });

    if (userFromDb) {

        // now verify the password  true: password mach  false: password does not mach
        const verifyPassword = await hash.validatePassword(user.password, userFromDb.password);

        if (verifyPassword) {

            return userFromDb;

        } else {

            return "Password does not mach";
        }

    } else {

        return "Email does not exists";
    }

}





module.exports = { createUser, getUser, getUsers, login }