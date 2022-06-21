import React from "react";
import { FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import "./DatePickerField.scss";

export default function DatePickerField({
  label,
  dateValue,
  handleChange,
  format = "yyyy-MM-dd",
  mask = "____-__-__",
  marginTop,
}) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <DesktopDatePicker
            label={label}
            inputFormat={format}
            mask={mask}
            value={dateValue}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField
                variant="standard"
                fullWidth
                {...params}
                inputProps={{ ...params.inputProps, style: { fontSize: 14 } }}
              />
            )}
          />
        }
        label=""
        labelPlacement="start"
      />
    </FormGroup>
  );
}
