const jwt = require("jsonwebtoken");


module.exports = {

    async createToken(req, res, object) {

        const token = jwt.sign({ object }, process.env.TOKEN_SECRET_KEY, { expiresIn: "32m" });
        res.header("auth-token", token);
        return token;

    },
    async validateToken(req, res, next) {

        const token = req.header("auth-token");

        if (token) {

            try {

                const verifyToken = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);
                req.user = verifyToken;
                next();

            } catch (error) {

                res.json(error);

            }

        } else {

            res.status(401).json({ Auth: "Token was not sent" });

        }

    }

}