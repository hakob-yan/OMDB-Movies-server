const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  connect: async () => {
    const client = new Client({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    await client.connect();
  },
};
