/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("movies").del();
  await knex("users").insert([
    { name: "user_1" },
    { name: "user_2" },
    { name: "user_3" },
  ]);
};
