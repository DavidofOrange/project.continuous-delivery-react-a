import axios from "axios";
import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default function StateCity({ setShowState, setShowCity }) {
  const [cityObjs, setCityObjs] = useState({});
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [selectedState, setSelectedState] = useState("All");
  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    const fetchCityState = async () => {
      const { data: cityState } = await axios.get("/api/citystates");
      setCityObjs(cityState);
      setAllStates(["All", ...new Set(Object.values(cityState))]);
      setAllCities(["All", ...Object.keys(cityState)]);
      setAvailableCities(["All", ...Object.keys(cityState)]);
    };
    fetchCityState();
  }, []);
  const stateChosen = (e) => {
    setSelectedState(e.target.value);
    setShowState(e.target.value);
    setShowCity("All");

    setAvailableCities([
      "All",
      ...allCities.filter(
        (city) => cityObjs[city] === e.target.value || e.target.value === "All"
      ),
    ]);
  };
  return (
    <div className="filter-section">
      <h1>State, City</h1>
      <FormGroup
        onChange={(e) => {
          stateChosen(e);
        }}
      >
        <Label for="exampleSelect">State</Label>
        <Input type="select" name="select" id="exampleSelect">
          {allStates.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup onChange={() => {}}>
        <Label for="selectcity">City</Label>
        <Input
          type="select"
          name="selectcity"
          id="selectcity"
          onChange={(e) => {
            setShowCity(e.target.value);
          }}
        >
          {availableCities.map((city) => (
            <option
              selected={selectedState === "All" && city === "All"}
              key={city}
            >
              {city}
            </option>
          ))}
        </Input>
      </FormGroup>
    </div>
  );
}
