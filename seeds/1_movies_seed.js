const { default: axios } = require("axios");
const omdb = require("../services/omdb");
const { OMDB_API } = require("../constants");
const {modifyMovieArray} = require("../utils/modifyMovieArray");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("movies").del();
  const response = await axios.get(`${OMDB_API}&s=top`);
  const movies = response.data.Search;
  console.log(modifyMovieArray(movies));
  await knex("movies").insert([
    {
      title: "Custom Movie",
      year: "2025",
      runtime: "112 min",
      genre: "Action",
      director: "Me",
    },
  ]);
};

// is_favorite: true,
// is_deleted: false,
// user_id: 3,
