import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

export default function Text({
  sm = 3,
  required = false,
  name,
  label,
  xs = 12,
  ...props
}) {
  return (
    <Grid item xs={xs} sm={sm}>
      <TextField
        type={
          name === "password"
            ? "password"
            : name === "portPatchPanel" || name === "portSwitch"
            ? "number"
            : "text"
        }
        required={required}
        id={name}
        name={name}
        label={label}
        fullWidth
        variant="standard"
        {...props}
      />
    </Grid>
  );
}
