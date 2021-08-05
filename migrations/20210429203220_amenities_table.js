exports.up = function (knex) {
  return knex.schema.createTable("amenities", (table) => {
    table.integer("id");
    table.string("amenity");
  });
};

exports.down = function (knex) {};
