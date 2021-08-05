import React from "react";
import SiteType from "./SiteType";
import StateCity from "./StateCity";
import Restaurants from "./Restaurants";
import Amenities from "./Amenities";
import "./Sidebar.css";

export default function Sidebar({
  setShowType,
  setShowState,
  setShowCity,
  setShowHasRestaurant,
  setShowHasAmenities,
}) {
  return (
    <>
      <SiteType setShowType={setShowType} />
      <StateCity setShowState={setShowState} setShowCity={setShowCity} />
      <Restaurants setShowHasRestaurant={setShowHasRestaurant} />
      <Amenities setShowHasAmenities={setShowHasAmenities} />
    </>
  );
}
