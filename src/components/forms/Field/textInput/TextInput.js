import React from "react";
import { Box, TextField } from "@mui/material";

import "./TextInput.scss";

export default function TextInput({ label, ...otherProps }) {
  return (
    <Box component="form" sx={{ m: 1, width: "25ch" }}>
      <TextField
        id="outlined-size-small"
        label={label}
        variant="standard"
        size="small"
        fullWidth
        {...otherProps}
      />
    </Box>
  );
}
