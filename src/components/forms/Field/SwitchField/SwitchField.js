import React from "react";
import { Switch, FormControlLabel, FormGroup } from "@mui/material";

import "./SwitchField.scss";

export default function SwitchField({ handleChange, label, checked }) {
  return (
    <FormGroup className="form-group">
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={label}
        labelPlacement="start"
      />
    </FormGroup>
  );
}
