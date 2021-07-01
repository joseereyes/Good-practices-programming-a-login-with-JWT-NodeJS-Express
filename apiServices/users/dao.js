const userSchema = require("./schema");

module.exports = {

    async createUser(user) {

        const post = new userSchema({

            name: user.name,
            email: user.email,
            password: user.password

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

    }
}