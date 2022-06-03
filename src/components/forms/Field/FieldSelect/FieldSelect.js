import React, { useState } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useFormikContext } from "formik";

import "./FieldSelect.scss";

export default function FieldSelect({ origin, source, data, setData, value }) {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setData(event.target.value);
    if (origin === "camera") setFieldValue("serverId", event.target.value);
    if (origin === "server") setFieldValue("agenciaId", event.target.value);
    if (origin === "brand") setFieldValue("brandId", event.target.value);
  };
  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="standard" size="small">
        <InputLabel>
          {origin === "camera"
            ? "NVR/Server"
            : origin === "server"
            ? "Agency"
            : "Brand"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          displayEmpty
          value={value > 0 ? value : data}
          label={
            origin === "camera"
              ? "NVR/Server"
              : origin === "server"
              ? "Agency"
              : "Brand"
          }
          defaultValue={11}
          onChange={handleChange}
        >
          {source.map((value) => (
            <MenuItem key={value.id} value={value.id}>
              {origin === "server" ? value.nombre : value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
