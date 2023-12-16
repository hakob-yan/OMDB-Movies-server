const axios = require("axios");
const { OMDB_API } = require("../constants");

module.exports = {
  getRecents: async () => {
    try {
      const response = await axios.get(`${OMDB_API}&s=2023&y=2023`);
      if (response.data && response.data.Response === "True") {
        return response.data.Search;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  },
};
