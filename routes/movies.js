const router = require("express").Router();
const controllers = require("../controllers");

router.get("/recent", controllers.movies.getRecentMovies);
router.get("/search", controllers.movies.getMoviesByTitle);
router.get("/:movieId", controllers.movies.getMovieById);
router.delete("/:movieId", controllers.movies.deleteMovieById);

module.exports = router;
