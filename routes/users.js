const router = require("express").Router();
const controllers = require("../controllers");

router.get("/", controllers.users.getUsers);

module.exports = router;
