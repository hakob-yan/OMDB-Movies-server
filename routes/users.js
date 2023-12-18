const router = require("express").Router();
const controllers = require("../controllers");

router.get("/", controllers.users.getUsers);
router.post("/add", controllers.users.addUsers);

module.exports = router;
