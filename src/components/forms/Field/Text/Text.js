import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useFormikContext, ErrorMessage } from "formik";

export default function Text({
  sm = 3,
  required = false,
  name,
  label,
  xs = 12,
  type,
  value,
  disabled = false,
  ...props
}) {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (e) => {
    if (type === "number") {
      setFieldValue(name, parseInt(e.target.value));
    } else {
      setFieldValue(name, e.target.value);
    }
  };
  return (
    <TextField
      type={type}
      required={required}
      disabled={disabled}
      id={name}
      name={name}
      label={label}
      fullWidth
      variant="standard"
      onChange={(e) => handleChange(e)}
      value={value !== undefined ? value : values[name]}
      inputProps={{ style: { fontSize: 12 } }}
      {...props}
    />
  );
}
