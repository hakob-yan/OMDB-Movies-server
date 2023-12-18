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
};
