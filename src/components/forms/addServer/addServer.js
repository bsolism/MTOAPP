import React, { useState, useEffect } from "react";

import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Divider from "@mui/material/Divider";

import initialValues from "../../../models/server";
import FieldText from "../Field/TextField";
import SwitchField from "../Field/SwitchField";
import DatePickerField from "../Field/DatePickerField";
import FieldSelect from "../Field/FieldSelect";
import SubmitButton from "../SubmitButton";
import apiServer from "../../../services/apiServer";
import apiAgency from "../../../services/apiAgency";
import apiBrand from "../../../services/apiBrand";
import { toast } from "react-toastify";
import Form from "../form";
import Button from "../button";
import validationServer from "../../../validation/validationServer";

import "./addServer.scss";

export default function AddServer() {
  const [checked, setChecked] = useState(true);
  const [dateValue, setDateValue] = useState(new Date("2022-03-23T13:53"));
  const [dateValueB, setDateValueB] = useState(new Date("2022-03-23T13:53"));
  const [data, setData] = useState([]);
  const [dataA, setDataA] = useState("");
  const [dataB, setDataB] = useState("");
  const [dataSelectBrand, setdataSelectBrand] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await apiAgency.GetAgency().then((res) => {
      setData(res.data);
    });
    await apiBrand.GetBrand().then((res) => {
      setdataSelectBrand(res.data);
    });
  };

  const handleSubmit = (values, { resetForm }) => {
    values.isGoodCondition = checked;
    values.dateInstallation = dateValue;
    values.dateBuys = dateValueB;
    apiServer.PostServer(values).then((res) => {
      if (res.status === 400) toast.warning(res.data);
      if (res.status === 200) {
        toast("Registro Ingresado");
        resetForm();
      }
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
        <div className="title">Ingreso de NVR / Server</div>
        <Form
          initialValues={initialValues}
          validationSchema={validationServer}
          onSubmit={handleSubmit}
        >
          <div className="content">
            <FieldText name="ipAddress" label="Ip Address" type="text" />
            <FieldText name="user" label="User" type="text" />
            <FieldText name="password" label="Password" type="password" />
            <FieldSelect
              origin="brand"
              source={dataSelectBrand}
              data={dataA}
              setData={setDataA}
            />
          </div>
          <Button className="button" source="server" />
          <Divider />
          <div className="content">
            <FieldText name="name" label="Nombre" type="text" />
            <FieldText name="type" label="Type" type="text" />
            <FieldText name="model" label="Model" type="text" />
            <FieldText name="mac" label="Mac" type="text" />
          </div>
          <Divider />
          <div className="content">
            <FieldText name="deviceId" label="DeviceId" type="text" />
            <FieldText name="serialNumber" label="SerialNumber" type="text" />
            <FieldText
              name="firmwareVersion"
              label="FirmwareVersion"
              type="text"
            />
            <FieldText name="location" label="Location" type="text" />
          </div>
          <Divider />
          <div className="content">
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
              origin="server"
              source={data}
              data={dataB}
              setData={setDataB}
            />
            <FieldText
              name="cameraCapacity"
              label="Camera Capacity"
              type="number"
            />
          </div>
          <div className="content">
            <FieldText
              name="cameraAvailable"
              label="Camera Available"
              type="number"
            />
            <FieldText name="storage" label="Storage Capacity" type="text" />
            <FieldText
              name="storageAvailable"
              label="Storage Available"
              type="text"
            />
            <FieldText
              name="engravedDays"
              label="Engraved Days"
              type="number"
            />
          </div>
          <div className="content">
            <SwitchField
              handleChange={handleChange}
              label="En Funcionamiento"
              checked={checked}
            />
          </div>
          <SubmitButton title="Save" />
        </Form>
      </div>
    </LocalizationProvider>
  );
}
