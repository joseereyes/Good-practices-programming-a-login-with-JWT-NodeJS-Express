const router = require("express").Router();
const controllerUser = require("./controller");
const jwt = require("../../middlewares/jwt");

router.get("/", jwt.validateToken, controllerUser.getUsers);
router.get("/:id", jwt.validateToken, controllerUser.getUser);


router.post("/register", controllerUser.createUser);
router.post("/login", controllerUser.login);
router.post("/post", jwt.validateToken, controllerUser.post);

module.exports = router;