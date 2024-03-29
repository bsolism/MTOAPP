import React from "react";
import { FormControlLabel, FormGroup, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import useHookDate from "./useHookDate";

export default function DatePickerField({
  id,
  label,
  dateValue,
  setNewValueDate,
  format = "yyyy-MM-dd",
  mask = "____-__-__",
  item,
}) {
  const [value, handleChange] = useHookDate(
    id,
    dateValue,
    setNewValueDate,
    item
  );
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <DesktopDatePicker
              label={label}
              inputFormat={format}
              mask={mask}
              value={value !== undefined ? value : null}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField
                  variant="standard"
                  fullWidth
                  sx={{ ml: -2, mr: 2 }}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    style: { fontSize: 14 },
                  }}
                />
              )}
            />
          }
          label=""
          labelPlacement="start"
        />
      </FormGroup>
    </>
  );
}
