const mongoose = require("mongoose");

module.exports = {

    async db() {

        try {

            const response = await mongoose.connect(process.env.DB_URI, {

                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
                useCreateIndex: true


            });
            console.log("connected to DB!");


        } catch (error) {

            console.log(error);
        }


    },

    server: {

        port: process.env.PORT || 5000,
        host: ""

    }




}