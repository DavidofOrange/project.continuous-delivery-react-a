const seed = require("../data/import.js");

exports.seed = function (knex) {
  // Deletes ALL existing entries from both locations and amenities then seed
  return knex("locations")
    .del()
    .then(knex("amenities").del().then(knex("restaurants").del().then(seed)));
};
