const path = require("path");
const fs = require("fs");
const db = require("../server/knex.js");

(async () => {
  try {
    // --------------- SEED LOCATIONS ---------------
    const locations = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "./locations.json"))
    );
    for (const location of locations) {
      const id = location.Site.SiteId;
      const latitude = location.Site.Latitude;
      const longitude = location.Site.Longitude;
      const name = location.Site.SitePreferredName;
      const phone = location.ContactMethods.filter(
        (method) => method.ContactMethodTypeId === 1
      )[0].Data;
      const sitetype = location.FacilitySubtype.Name;
      const state = location.Addresses[0].State;
      const city = location.Addresses[0].City;
      let unleaded;
      let midgrade;
      let premium;

      for (let i = 0; i < location.Site.FuelPrices.length; i++) {
        if (location.Site.FuelPrices[i].FuelType === "Unleaded") {
          unleaded = location.Site.FuelPrices[i].CashPrice;
        } else if (location.Site.FuelPrices[i].FuelType === "Midgrade") {
          midgrade = location.Site.FuelPrices[i].CashPrice;
        } else if (location.Site.FuelPrices[i].FuelType === "Premium") {
          premium = location.Site.FuelPrices[i].CashPrice;
        }
      }

      await db("locations").insert({
        id,
        latitude,
        longitude,
        name,
        unleaded,
        midgrade,
        premium,
        phone,
        sitetype,
        state,
        city,
      });

      // --------------- SEED AMENITIES ---------------
      for (let amenity of location.AdditionalAmenities) {
        amenity = amenity.SiteManagementItem.Title;
        await db("amenities").insert({
          id,
          amenity,
        });
      }

      // --------------- SEED RESTAURANTS ---------------
      for (let restaurant of location.Site.Concepts) {
        restaurant = restaurant.Concept.Name;
        await db("restaurants").insert({
          id,
          restaurant,
        });
      }

      console.log("Location seeded");
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
})();
