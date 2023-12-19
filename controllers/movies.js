const {
  modifyMovieArray,
  modifyFoundMovie,
} = require("../utils/modifyMovieArray");
const { pool } = require("../configs/db");

const omdb = require("../services/omdb");
const modifyOmdbMovie = require("../utils/modifyOmdbMovie");
const { imageSRC } = require("../constants");
module.exports = {
  getAllMovies: async (req, res) => {
    try {
      const userId = req.headers.authorization || "";
      const dbMovies = await pool.query(
        `SELECT * FROM movies WHERE user_id = $1`,
        [userId]
      );
      res.status(200).send(dbMovies.rows.filter((el) => !el.is_deleted) || []);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  getMoviesByTitle: async (req, res) => {
    try {
      const { title } = req.query;
      const userId = req.headers.authorization || "";
      const searchedMovies = await omdb.getMoviesByTitle(title || "");
      const modifiedMovies = modifyMovieArray(searchedMovies);
      const dbMovies = await pool.query(
        `SELECT * FROM movies WHERE user_id = $1`,
        [userId]
      );
      const dbMoviesRows = dbMovies.rows || [];
      if (dbMoviesRows.length) {
        const finalMoviedata = modifiedMovies.map((movie) => {
          const dbMovie = dbMoviesRows.find(
            (el) => el.imdb_id === movie.imdb_id
          );
          return dbMovie ? dbMovie : movie;
        });
        res.status(200).send(finalMoviedata.filter((el) => !el.is_deleted));
      } else {
        res.status(200).send(modifiedMovies);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  getMovieById: async (req, res) => {
    try {
      const userId = req.headers.authorization || "";
      const { movieId } = req.params;
      const userMovie = await pool.query(
        "SELECT * FROM movies WHERE user_id = $1 AND imdb_id = $2",
        [userId, movieId]
      );
      if (userMovie.rows[0]) {
        res.status(200).send(userMovie.rows[0]);
      } else {
        const foundMovie = await omdb.getMovieById(movieId || "");
        res
          .status(200)
          .send(foundMovie ? modifyFoundMovie(foundMovie) : foundMovie);
      }
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
      //aslo can send 204 ,
      await res.status(200).send(movieId);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  updateMovieById: async (req, res) => {
    try {
      const { title, year, runtime, genre, director, is_favorite } =
        req.body.data;
      const userId = req.headers.authorization || "";
      const { movieId } = req.params;

      const userMovie = await pool.query(
        "SELECT * FROM movies WHERE user_id = $1 AND imdb_id = $2",
        [userId, movieId]
      );
      const foundMovie = userMovie.rows[0];
      if (foundMovie) {
        const updateMovie = await pool.query(
          `UPDATE movies SET title = $3, year = $4, runtime = $5, genre = $6, director = $7, is_favorite = $8  WHERE user_id = $1 AND imdb_id = $2  RETURNING *`,
          [
            userId,
            movieId,
            title || foundMovie.title,
            year || foundMovie.year,
            runtime || foundMovie.runtime,
            genre || foundMovie.genre,
            director || foundMovie.director,
            is_favorite !== undefined ? is_favorite : foundMovie.is_favorite,
          ]
        );
        res.status(200).send(updateMovie.rows[0]);
      } else {
        const movie = await omdb.getMovieById(movieId || "");
        const modifiedMovie = modifyOmdbMovie(movie, userId);
        const args = [
          title || modifiedMovie.title,
          year || modifiedMovie.year,
          runtime || modifiedMovie.runtime,
          genre || modifiedMovie.genre,
          director || modifiedMovie.director,
          modifiedMovie.image,
          modifiedMovie.imdb_id,
          is_favorite !== undefined ? is_favorite : foundMovie.is_favorite,
          modifiedMovie.is_deleted,
          userId,
        ];
        const newMovie = await pool.query(
          `INSERT INTO movies (title, year, runtime, genre, director, image, imdb_id, is_favorite, is_deleted, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10) RETURNING *`,
          args
        );
        res.status(200).send(newMovie.rows[0]);
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  addMovie: async (req, res) => {
    try {
      const userId = req.headers.authorization || "";
      const { title, year, runtime, genre, director } = req.body;
      const args = [
        title,
        year,
        runtime,
        genre,
        director,
        imageSRC,
        new Date(),
        false,
        false,
        userId,
      ];

      const newMovie = await pool.query(
        `INSERT INTO movies (title, year, runtime, genre, director, image, imdb_id, is_favorite, is_deleted, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9, $10) RETURNING *`,
        args
      );
      res.status(200).send(newMovie.rows[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
