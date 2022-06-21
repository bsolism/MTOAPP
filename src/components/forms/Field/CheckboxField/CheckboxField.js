import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function CheckboxField({ checkbox, setCheckbox }) {
  return (
    <FormGroup>
      <FormControlLabel
        style={{ fontSize: 10 }}
        control={
          <Checkbox
            checked={checkbox}
            onChange={(value) => setCheckbox(value.target.checked)}
          />
        }
        label={
          <span style={{ fontSize: 12 }}>Sincronizar con este equipo</span>
        }
      />
    </FormGroup>
  );
}
