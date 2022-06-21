import React, { useState } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useFormikContext } from "formik";

import "./FieldSelect.scss";

export default function FieldSelect({ origin, source, data, setData }) {
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const name = source.filter((res) => res.id === event.target.value);
    setData(event.target.value);
    if (origin === "camera") setFieldValue("serverId", event.target.value);
    if (origin === "server") setFieldValue("agenciaId", event.target.value);
    if (origin === "brand") {
      setFieldValue("brandName", name[0].name);
      setFieldValue("brandId", event.target.value);
    }
  };
  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth variant="standard">
        <InputLabel>
          {origin === "camera"
            ? "NVR/Server"
            : origin === "server"
            ? "Agency"
            : "Brand"}
        </InputLabel>
        <Select
          sx={{ fontSize: 12 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          displayEmpty
          value={source.length > 0 ? data : ""}
          label={
            origin === "camera"
              ? "NVR/Server"
              : origin === "server"
              ? "Agency"
              : "Brand"
          }
          onChange={handleChange}
        >
          {source.map((value) => (
            <MenuItem key={value.id} value={value.id}>
              {origin === "server" || origin === "camera"
                ? value.nombre
                : value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
