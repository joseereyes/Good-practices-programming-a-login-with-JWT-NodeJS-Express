const router = require("express").Router();
const controllerUser = require("./controller");


router.get("/", controllerUser.getUsers);
router.get("/:id", controllerUser.getUser);


router.post("/register", controllerUser.createUser);
router.post("/login", controllerUser.login);


module.exports = router;