import React from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { useFormikContext, ErrorMessage } from "formik";
import TextInput from "../textInput";

import "./FieldText.scss";

export default function FieldText({ name, label, type }) {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (e) => {
    if (type === "number") {
      setFieldValue(name, parseInt(e.target.value));
    } else {
      setFieldValue(name, e.target.value);
    }
  };

  return (
    <FormGroup className="form-group">
      <FormControlLabel
        control={
          type === "password" ? (
            <div className="form-field">
              <TextInput
                label={label}
                type="password"
                autoComplete="current-password"
                onChange={(e) => handleChange(e)}
                value={values[name]}
              />
            </div>
          ) : (
            <div className="form-field">
              <TextInput
                label={label}
                type={type}
                onChange={(e) => handleChange(e)}
                value={values[name]}
              />
            </div>
          )
        }
        label=""
        labelPlacement="start"
      />
      <ErrorMessage name={name} component="div" />
    </FormGroup>
  );
}
