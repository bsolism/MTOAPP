import React, { useState, useEffect } from "react";

import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";

import initialValues from "../../../models/camera";
import FieldText from "../Field/TextField";
import SwitchField from "../Field/SwitchField";
import DatePickerField from "../Field/DatePickerField";
import FieldSelect from "../Field/FieldSelect";
import SubmitButton from "../SubmitButton";
import { apiCamera, apiServer, apiBrand } from "../../../services";
import Form from "../form";
import Button from "../button";
import validationCamera from "../../../validation/validationCamera";

import "./addCamera.scss";

export default function AddCamera() {
  const [checked, setChecked] = useState(true);
  const [dateValue, setDateValue] = useState(new Date("2022-03-23T13:53"));
  const [dateValueB, setDateValueB] = useState(new Date("2022-03-23T13:53"));
  const [dataSelectServer, setdataSelectServer] = useState([]);
  const [dataSelectBrand, setdataSelectBrand] = useState([]);
  const [data, setData] = useState("");
  const [dataS, setDataS] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    // values.isGoodCondition = checked;
    // values.dateInstallation = dateValue;
    // values.dateBuys = dateValueB;
    // apiCamera.PostCamera(values).then((res) => {
    //   if (res.status === 400) {
    //     toast.warning(res.data);
    //   }
    //   if (res.status === 200) {
    //     toast("Registro Ingresado");
    //     resetForm();
    //   }
    // });
    // setData("");
    // setDataS("");
    // resetForm();
  };

  const getData = async () => {
    await apiServer.GetServer().then((res) => {
      setdataSelectServer(res.data);
    });

    await apiBrand.GetBrand().then((res) => {
      setdataSelectBrand(res.data);
    });
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleChangeDateI = (value) => {
    setDateValue(value);
  };
  const handleChangeDateB = (value) => {
    setDateValueB(value);
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div className="form-class">
        <div className="title">Ingreso de Equipo</div>
        <Form initialValues={initialValues} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FieldText name="ipAddress" label="Ip Address" type="text" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldText name="user" label="User" type="text" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldText name="password" label="Password" type="password" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FieldSelect
                origin="brand"
                source={dataSelectBrand}
                data={data}
                setData={setData}
              />
            </Grid>

            <Button className="button" source="camera" />
            <Divider />
            <div className="content">
              <FieldText name="name" label="Nombre" type="text" />
              <FieldText name="type" label="Type" type="text" />
              <FieldText name="model" label="Model" type="text" />
              <FieldText name="mac" label="Mac" type="text" />
            </div>
            <div className="content">
              <FieldText name="deviceId" label="DeviceId" type="text" />
              <FieldText
                name="deviceDescription"
                label="DeviceDescription"
                type="text"
              />
              <FieldText name="serialNumber" label="SerialNumber" type="text" />
              <FieldText
                name="firmwareVersion"
                label="FirmwareVersion"
                type="text"
              />
            </div>
            <Divider />
            <div className="content">
              <FieldText name="location" label="Location" type="text" />
              <DatePickerField
                label="Date Installation"
                dateValue={dateValue}
                handleChange={handleChangeDateI}
              />
              <DatePickerField
                label="Date Buys"
                dateValue={dateValueB}
                handleChange={handleChangeDateB}
              />
              <FieldSelect
                origin="camera"
                source={dataSelectServer}
                data={dataS}
                setData={setDataS}
              />
            </div>
            <Divider />
            <div className="content">
              <FieldText
                name="locationConnection"
                label="Location Connection"
                type="text"
              />
              <FieldText
                name="idPatchPanel"
                label="PatchPanel ID"
                type="text"
              />
              <FieldText name="idSwitch" label="Switch ID" type="text" />
              <FieldText
                name="portPatchPanel"
                label="Port PatchPanel"
                type="number"
              />
            </div>
            <div className="content">
              <FieldText name="portSwitch" label="Port Switch" type="number" />
            </div>
            <div className="content">
              <SwitchField
                handleChange={handleChange}
                label="En Funcionamiento"
                checked={checked}
              />
            </div>
            <SubmitButton title="Save" />
          </Grid>
        </Form>
      </div>
    </LocalizationProvider>
  );
}
