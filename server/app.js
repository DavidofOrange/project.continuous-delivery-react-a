// server/app.js
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const db = require("./knex.js");

const app = express();
app.use(cors({ credentials: true, origin: true }));

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/locations", async (req, res) => {
  try {
    const locations = await db.select().table("locations");
    for (let location of locations) {
      location.amenities = (location.amenities = await db
        .select("amenity")
        .table("amenities")
        .where("id", location.id)).map((amenity) => amenity.amenity);

      location.restaurants = await (
        await db
          .select("restaurant")
          .table("restaurants")
          .where("id", location.id)
      ).map((restaurant) => restaurant.restaurant);
    }

    res.json(locations);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/citystates", async (req, res) => {
  try {
    const cities = await db.select("city", "state").table("locations");
    const citiesMap = {};
    cities.forEach((cityObj) => {
      citiesMap[cityObj.city] = cityObj.state;
    });

    res.json(citiesMap);
  } catch (err) {
    console.error("Error loading cities/states!", err);
    res.sendStatus(500);
  }
});

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await db
      .select("restaurant")
      .distinct("restaurant")
      .table("restaurants");
    res.json(restaurants.map((restaurantObj) => restaurantObj.restaurant));
  } catch (err) {
    console.error("Error loading restaurants!", err);
    res.sendStatus(500);
  }
});

app.get("/api/amenities", async (req, res) => {
  try {
    const amenities = await db
      .select("amenity")
      .distinct("amenity")
      .table("amenities");
    res.json(amenities.map((amenityObj) => amenityObj.amenity));
  } catch (err) {
    console.error("Error loading amenities!", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, so react-router render the route in the client
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

module.exports = app;
