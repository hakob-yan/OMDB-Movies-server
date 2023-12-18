const { default: axios } = require("axios");
const omdb = require("../services/omdb");
const { OMDB_API } = require("../constants");
const { modifyMovieArray } = require("../utils/modifyMovieArray");

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

    const finalMoviesData = moviesData.map((el) => ({
      title: el.Title || "",
      year: el.Year || "",
      runtime: el.Runtime || "",
      genre: el.Genre || "",
      director: el.Director || "",
      image: el.iamge || "",
      is_favorite: true,
      is_deleted: false,
      user_id: 3,
    }));
    await knex("movies").insert(finalMoviesData);
  } catch (error) {
    console.log(error);
  }
};
