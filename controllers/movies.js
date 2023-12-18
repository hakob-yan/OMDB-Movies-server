const {
  modifyMovieArray,
  modifyFoundMovie,
} = require("../utils/modifyMovieArray");
const { pool } = require("../configs/db");

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

  deleteMovieById: async (req, res) => {
    try {
      const userId = req.headers.authorization || "";
      const { movieId } = req.params;
      const movie = await omdb.getMovieById(movieId || "");

      console.log(0, userId, movieId);
      const userMovie = await pool.query(
        "SELECT * FROM movies WHERE user_id = $1 AND imdb_id = $2",
        [userId, movieId]
      );
      await res.status(204).send("movie deleted");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
