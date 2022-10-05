import React from "react";
import { Formik } from "formik";

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  innerRef,
}) {
  return (
    <Formik
      innerRef={innerRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
