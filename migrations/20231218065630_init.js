// migrations/20220101000000_migration_name.js

exports.up = function (knex) {
  return knex.schema.createTable("example_table", function (table) {
    // table.increments("id").primary();
    // table.string("column_name");
    // // Add other columns as needed
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("example_table");
};
