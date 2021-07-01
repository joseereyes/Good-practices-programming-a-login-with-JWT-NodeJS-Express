const router = require("express").Router();
const controllerUser = require("./controller");


router.get("/", controllerUser.getUsers);

router.post("/register", controllerUser.createUser);



module.exports = router;