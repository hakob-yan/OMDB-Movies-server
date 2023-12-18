const axios = require("axios");
const { OMDB_API } = require("../constants");

module.exports = {
  getMoviesByTitle: async (title) => {
    const response = await axios.get(`${OMDB_API}&s=${title}`);
    if (response.data && response.data.Response === "True") {
      return response.data.Search;
    } else {
      return [];
    }
  },
  getMovieById: async (movieId) => {
    const response = await axios.get(`${OMDB_API}&i=${movieId}`);
    if (response.data && response.data.Response === "True") {
      return response.data;
    } else {
      return null;
    }
  },
};
