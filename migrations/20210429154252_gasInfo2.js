exports.up = function (knex) {
  return knex.schema.table("locations", (table) => {
    table.float("unleaded");
    table.float("midgrade");
    table.float("premium");
    table.string("phone");
    table.string("sitetype");
  });
};

exports.down = function (knex) {};
