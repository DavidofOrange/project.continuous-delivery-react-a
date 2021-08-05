import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function SiteType({ setShowType }) {
  return (
    <div className="filter-section">
      <h1>Site Type</h1>
      <Form
        onChange={(e) => {
          setShowType(e.target.value);
        }}
      >
        <FormGroup check>
          <Label check>
            <Input type="radio" name="sitetype" value="All" defaultChecked />
            All
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="sitetype" value="Country Store" /> Country
            Store
          </Label>
        </FormGroup>
        <FormGroup check disabled>
          <Label check>
            <Input type="radio" name="sitetype" value="Travel Stop" /> Travel
            Stop
          </Label>
        </FormGroup>
      </Form>
    </div>
  );
}
