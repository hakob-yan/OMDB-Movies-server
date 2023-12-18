const {
  modifyMovieArray,
  modifyFoundMovie,
} = require("../utils/modifyMovieArray");
const { pool } = require("../configs/db");

const omdb = require("../services/omdb");
const modifyOmdbMovie = require("../utils/modifyOmdbMovie");
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
      const userMovie = await pool.query(
        "SELECT * FROM movies WHERE user_id = $1 AND imdb_id = $2",
        [userId, movieId]
      );
      if (userMovie.rows.length) {
        await pool.query(
          `UPDATE movies SET is_deleted = true WHERE user_id = $1 AND imdb_id = $2`,
          [userId, movieId]
        );
      } else {
        const movie = await omdb.getMovieById(movieId || "");
        const modifiedMovie = modifyOmdbMovie(movie, userId);
        modifiedMovie.is_deleted = true;
        const args = [
          modifiedMovie.title,
          modifiedMovie.year,
          modifiedMovie.runtime,
          modifiedMovie.genre,
          modifiedMovie.director,
          modifiedMovie.image,
          modifiedMovie.imdb_id,
          modifiedMovie.is_favorite,
          modifiedMovie.is_deleted,
          userId,
        ];
        await pool.query(
          `INSERT INTO movies (title, year, runtime, genre, director, image, imdb_id, is_favorite, is_deleted, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10) RETURNING *`,
          args
        );
      }
      await res.status(204).send("movie deleted");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
