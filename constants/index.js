const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  OMDB_API: process.env.OMDB_API,
};
