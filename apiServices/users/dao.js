const userSchema = require("./schema");
const hash = require("./helpers/hash");


module.exports = {

    async createUser(user) {

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



    },

    async getUsers() {

        try {

            const response = await userSchema.find();
            return response;

        } catch (error) {

            return error;

        }

    },

    async getUser(id) {

        try {
            const response = await userSchema.findById({ _id: id });
            return response;
        } catch (error) {

            return error;
        }
    },

    async login(user) {

        // true: return all the info asociated with the email, false: does not exist email.
        const emailExists = await userSchema.findOne({ email: user.email });

        if (emailExists) {

            // now verify the password

            const verifyPassword = await hash.validatePassword(user.password, emailExists.password);

            if (verifyPassword) {

                return emailExists;
            } else {

                return "Password does not mach";
            }

        } else {

            return "Email does not exists";

        }


    }

}