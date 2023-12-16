const router = require("express").Router();
const controllers = require("../controllers");

router.get("/recent", controllers.movies.recent);

module.exports = router;
