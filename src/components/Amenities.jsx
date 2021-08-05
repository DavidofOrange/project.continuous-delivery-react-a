import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function Amenities({ setShowHasAmenities }) {
  const [allAmenities, setAllAmenities] = useState([]);
  const [currentSelection, setCurrentSelection] = useState([]);
  useEffect(() => {
    const fetchAmenities = async () => {
      const { data: amenities } = await axios.get("/api/amenities");
      setAllAmenities(amenities);
    };
    fetchAmenities();
  }, []);

  useEffect(() => {
    setShowHasAmenities(currentSelection);
  }, [currentSelection]);

  const checkboxClicked = async (e) => {
    if (e.target.checked) {
      setCurrentSelection([...currentSelection, e.target.value]);
    } else {
      setCurrentSelection(
        currentSelection.filter((amenity) => amenity !== e.target.value)
      );
    }
  };
  return (
    <div className="filter-section">
      <h1>Amenities</h1>
      <Form
        onChange={(e) => {
          checkboxClicked(e);
        }}
      >
        <FormGroup check>
          {allAmenities.map((amenity) => {
            return (
              <div className="checkbox" key={amenity}>
                <Label check>
                  <Input type="checkbox" value={amenity} /> {amenity}
                </Label>
              </div>
            );
          })}
        </FormGroup>
      </Form>
    </div>
  );
}
