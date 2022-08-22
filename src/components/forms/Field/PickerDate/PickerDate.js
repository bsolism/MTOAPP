import React, { useState, useEffect } from "react";
import { FormControlLabel, FormGroup, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { useFormikContext } from "formik";

export default function PickerDate({ name, label, value, setValue }) {
  const { setFieldValue } = useFormikContext();
  const handleChange = (value) => {
    setValue(value);
    setFieldValue(name, value);
  };
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <DesktopDatePicker
              label={label}
              inputFormat="yyyy-MM-dd"
              mask="____-__-__"
              value={value}
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
