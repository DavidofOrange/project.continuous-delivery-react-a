import axios from "axios";
import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default function Restaurants({ setShowHasRestaurant }) {
  const [allRestaurants, setAllRestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data: restaurants } = await axios.get("/api/restaurants");
      setAllRestaurants(["All", ...restaurants]);
    };
    fetchRestaurants();
  }, []);
  return (
    <div className="filter-section">
      <h1>Restaurants</h1>
      <FormGroup
        onChange={(e) => {
          setShowHasRestaurant(e.target.value);
        }}
      >
        <Label for="select-restaurants">Restaurants</Label>
        <Input type="select" name="select-restaurants" id="select-restaurants">
          {allRestaurants.map((restaurant) => (
            <option key={restaurant}>{restaurant}</option>
          ))}
        </Input>
      </FormGroup>
    </div>
  );
}
