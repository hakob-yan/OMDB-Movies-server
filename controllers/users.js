const { pool } = require("../configs/db");
const omdb = require("../services/omdb");
module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await pool.query(
        `SELECT * FROM public.users  ORDER BY id ASC `
      );
      res.status(200).send(users.rows);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  addUsers: async (req, res) => {
    try {
      const { user_name } = req.body;
      const newUser = await pool.query(
        `INSERT INTO users (name) VALUES ($1) RETURNING *`,
        [user_name]
      );
      res.status(201).send(newUser.rows[0]);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
};
