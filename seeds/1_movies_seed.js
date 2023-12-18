const { default: axios } = require("axios");
const omdb = require("../services/omdb");
const { OMDB_API } = require("../constants");
const modifyOmdbMovie = require("../utils/modifyOmdbMovie");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  try {
    await knex("movies").del();
    const response = await axios.get(`${OMDB_API}&s=top`);
    const movies = response.data.Search;
    const moviesData = await Promise.all(
      movies.slice(0, 20).map((el) => {
        return omdb.getMovieById(el.imdbID || "");
      })
    );
    const insertMovies = (userId) =>
      moviesData.map((el) => modifyOmdbMovie(el, userId));

    await Promise.all(
      [1, 2, 3].map((el) => knex("movies").insert(insertMovies(el)))
    );
  } catch (error) {
    console.log(error);
  }
};
