exports.up = function (knex) {
  return knex.schema.createTable("restaurants", (table) => {
    table.integer("id");
    table.string("restaurant");
  });
};

exports.down = function (knex) {};
