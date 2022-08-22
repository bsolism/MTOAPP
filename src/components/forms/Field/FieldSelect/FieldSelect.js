import React from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

import useHookSelect from "./useHookSelect";

import "./FieldSelect.scss";

export default function FieldSelect({ type, id, setId }) {
  const [source, handleChange] = useHookSelect(type, setId);
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>
        {type === "server"
          ? "NVR/Server"
          : type === "agency"
          ? "Agency"
          : "Brand"}
      </InputLabel>
      <Select
        sx={{ fontSize: 12 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        displayEmpty
        value={id ? id : ""}
        label={
          type === "server"
            ? "NVR/Server"
            : type === "agency"
            ? "Agency"
            : "Brand"
        }
        onChange={handleChange}
      >
        {source.map((value) => (
          <MenuItem key={value.id} value={value.id}>
            {type === "server" || type === "agency" ? value.nombre : value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
