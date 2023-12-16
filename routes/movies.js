const router = require("express").Router();
const movies = require("../controllers/movies");

router.get("/recent", movies.recent);

module.exports = router;
