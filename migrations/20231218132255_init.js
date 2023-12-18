exports.up = function (knex) {
  return knex.schema.createTable("movies", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("year").notNullable();
    table.string("runtime").notNullable();
    table.string("genre").notNullable();
    table.string("director").notNullable();
    table.string("image").notNullable();
    table.boolean("is_favorite").defaultTo(false);
    table.boolean("is_deleted").defaultTo(false);
    table.integer("user_id").unsigned().references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("movies");
};
