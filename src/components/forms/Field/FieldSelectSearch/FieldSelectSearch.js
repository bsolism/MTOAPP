import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
const dtaSelect = [
  {
    id: 1,
    name: "Nombre",
  },
  {
    id: 2,
    name: "Marca",
  },
  {
    id: 3,
    name: "Modelo",
  },
  {
    id: 4,
    name: "IP",
  },
  {
    id: 5,
    name: "Serie",
  },
  {
    id: 6,
    name: "No. Activo",
  },
];

export default function FieldSelectSearch({ id, setId }) {
  const handleChange = (event) => {
    setId(event.target.value);
  };
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>Field</InputLabel>
      <Select
        sx={{ fontSize: 12 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={id}
        displayEmpty
        defaultValue=""
        label="Field"
        onChange={handleChange}
      >
        {dtaSelect.map((value) => (
          <MenuItem key={value.id} value={value.id}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
