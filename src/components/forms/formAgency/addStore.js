import React from "react";

import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import initialValues from "../../../models/agency";
import FieldText from "../field/TextField";
import SubmitButton from "../field/SubmitButton";
import { apiAgency } from "../../../services";
import Form from "../form";
import validation from "../../../validation/validationStore";
import { toast } from "react-toastify";

export default function AddStore() {
  const handleSubmit = (values, { resetForm }) => {
    apiAgency.Post(values).then((res) => {
      if (res.status === 400) toast.warning(res.data);
      if (res.status === 200) {
        toast("Registro Ingresado");
        resetForm();
      }
    });
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="form-class">
        <div className="title">Ingreso de Local / Agencia</div>
        <Form
          initialValues={initialValues}
          validationSchema={validation}
          onSubmit={handleSubmit}
        >
          <div className="content">
            <FieldText name="name" label="Name Store" type="text" />
            <FieldText name="city" label="City" type="text" />
            <FieldText name="address" label="Address" type="text" />
          </div>

          <SubmitButton title="Save" />
        </Form>
      </div>
    </LocalizationProvider>
  );
}
