const router = require("express").Router();
const controllers = require("../controllers");

router.get("/all", controllers.movies.getAllMovies);
router.get("/search", controllers.movies.getMoviesByTitle);
router.get("/:movieId", controllers.movies.getMovieById);
router.delete("/:movieId", controllers.movies.deleteMovieById);
router.put("/:movieId", controllers.movies.updateMovieById);
router.post("/add", controllers.movies.addMovie);

module.exports = router;
