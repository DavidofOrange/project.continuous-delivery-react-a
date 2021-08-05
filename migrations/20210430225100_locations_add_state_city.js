exports.up = function (knex) {
  return knex.schema.table("locations", (table) => {
    table.string("state");
    table.string("city");
  });
};

exports.down = function (knex) {};
