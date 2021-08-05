import React, { useState } from "react";
import "./App.css";
import Map from "./containers/Map";
import Banner from "./components/Banner";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [showType, setShowType] = useState("All");
  const [showState, setShowState] = useState("All");
  const [showCity, setShowCity] = useState("All");
  const [showHasRestaurant, setShowHasRestaurant] = useState("All");
  const [showHasAmenities, setShowHasAmenities] = useState([]);
  return (
    <div className="App" style={{ height: "100%" }}>
      <Banner />
      <div className="outside-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar
            setShowType={setShowType}
            setShowState={setShowState}
            setShowCity={setShowCity}
            setShowHasRestaurant={setShowHasRestaurant}
            setShowHasAmenities={setShowHasAmenities}
          />
        </div>

        <div className="map-wrapper">
          <Map
            id="map"
            showType={showType}
            showState={showState}
            showCity={showCity}
            showHasRestaurant={showHasRestaurant}
            showHasAmenities={showHasAmenities}
          />
        </div>
      </div>
    </div>
  );
}
