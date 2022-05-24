import React from "react";
import { FormControlLabel, FormGroup, Stack, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

export default function DatePickerField({ label, dateValue, handleChange }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Stack spacing={3}>
            <DesktopDatePicker
              label={label}
              inputFormat="dd/MM/yyyy"
              value={dateValue}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField variant="standard" fullWidth {...params} />
              )}
            />
          </Stack>
        }
        label=""
        labelPlacement="start"
      />
    </FormGroup>
  );
}
