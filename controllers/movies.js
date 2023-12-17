const {
  modifyMovieArray,
  modifyFoundMovie,
} = require("../utils/modifyMovieArray");

const omdb = require("../services/omdb");
module.exports = {
  getRecentMovies: async (req, res) => {
    try {
      const recentMovies = await omdb.getRecents();
      res.status(200).send(modifyMovieArray(recentMovies));
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  getMoviesByTitle: async (req, res) => {
    try {
      const { title } = req.query;
      const searchedMovies = await omdb.getMoviesByTitle(title || "");
      res.status(200).send(modifyMovieArray(searchedMovies));
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { movieId } = req.params;
      const foundMovie = await omdb.getMovieById(movieId || "");
      res
        .status(200)
        .send(foundMovie ? modifyFoundMovie(foundMovie) : foundMovie);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
