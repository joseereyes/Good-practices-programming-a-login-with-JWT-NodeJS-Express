const userSchema = require("./schema");
const hash = require("./helpers/hashPassword");


module.exports = {

    async createUser(user) {

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

    },

    async getUsers() {

        try {

            const response = await userSchema.findOne();
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

        const dbInfo = await userSchema.findOne({ email: user.email });

        try {

            const response = await hash.validatePassword(user.password, dbInfo.password);
            return response;

        } catch (error) {
            return error;
        }


    }
}