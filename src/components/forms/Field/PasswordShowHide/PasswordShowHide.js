import React, { useState } from "react";
import { Field } from "formik";

import "./PasswordShowHide.scss";

export default function PasswordShowHide({ field, form }) {
  const [showHidePass, setShowHidePass] = useState(false);
  const hasError = form.touched[field.name] && form.errors[field.name];
  return (
    <div>
      <Field
        type={showHidePass ? "text" : "password"}
        {...field}
        className="form-control-label"
        placeholder="Password"
      />
      <i onClick={() => setShowHidePass(!showHidePass)} className="icon-hide">
        i
      </i>
    </div>
  );
}
