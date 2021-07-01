const router = require("express").Router();
const userRoutes = require("../apiServices/users/routes");


router.use("/user", userRoutes);



module.exports = router;