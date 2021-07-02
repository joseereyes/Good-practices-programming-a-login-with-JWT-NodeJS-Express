const bcrypt = require("bcrypt");



module.exports = {

    async password(password) {

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        try {

            const response = await bcrypt.hash(password, salt);
            return response;
        } catch (error) {
            return error;
        }

    },

    async validatePassword(password, hash) {

        try {

            const response = await bcrypt.compare(password, hash);
            return response;

        } catch (error) {

            return error;
        }

    }


}


// const someOtherPlaintextPassword = 'not_bacon';


// bcrypt.genSalt(saltRounds, function(err, salt) {

//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });

// });


// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });