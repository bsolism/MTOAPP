import React, { useState, useEffect } from "react";
import { Switch, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { useFormikContext } from "formik";

import "./SwitchField.scss";

export default function SwitchField({ id, label, value }) {
  const [check, setCheck] = useState(value);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setCheck(value);
  }, [value]);

  const handleChange = (e) => {
    setCheck(e.target.checked);
    if (id === "onLine") setFieldValue("online", e.target.checked);
    if (id === "retired") setFieldValue("retired", e.target.checked);
  };
  return (
    <FormGroup className="form-group">
      <FormControlLabel
        control={<Switch checked={check} onChange={handleChange} />}
        label={<span style={{ fontSize: 11 }}>{label}</span>}
        labelPlacement="start"
        style={{ fontSize: 11 }}
      />
    </FormGroup>
  );
}
