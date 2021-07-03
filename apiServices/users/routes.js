const router = require("express").Router();
const controllerUser = require("./controller");
const jwt = require("../../middlewares/jwt");

router.get("/", controllerUser.getUsers);
router.get("/:id", controllerUser.getUser);


router.post("/register", controllerUser.createUser);
router.post("/login", controllerUser.login);
router.post("/post", jwt.validateToken, controllerUser.post);

module.exports = router;