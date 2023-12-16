const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./configs/db");
const routes = require("./routes");
DB.connect();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/movies", routes.movies);

app.listen(process.env.PORT || 5000, () => {
  console.log("App listenong to 5000 port");
});
