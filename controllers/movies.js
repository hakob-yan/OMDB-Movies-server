const modifyMovieArray = require("../utils/modifyMovieArray");

const omdb = require("../services/omdb");
module.exports = {
  recent: async (req, res) => {
    const recentMovies = await omdb.getRecents();
    res.status(200).send(modifyMovieArray(recentMovies));
  },
};
