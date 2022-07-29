import React, { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import useHookCheck from "./useHookCheck";

export default function CheckboxField({ label, item, setNewValueDate }) {
  const [check, setCheck] = useState(false);
  const [sincDate] = useHookCheck(item, check, setNewValueDate);

  useEffect(() => {
    sincDate();
  }, [check]);

  return (
    <FormGroup>
      <FormControlLabel
        style={{ fontSize: 10, marginLeft: 30 }}
        control={
          <Checkbox
            checked={check}
            onChange={(value) => setCheck(value.target.checked)}
          />
        }
        label={<span style={{ fontSize: 12 }}>{label}</span>}
      />
    </FormGroup>
  );
}
