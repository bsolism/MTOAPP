import React, { useState, useEffect } from "react";

import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, Grid, Typography } from "@mui/material";
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
import Text from "../Field/Text";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import "./DetailCamera.scss";
const columns = [
  { field: "id", headerName: "ID", width: 50 },
  {
    field: "evento",
    headerName: "Evento",
    width: 150,
    editable: true,
  },
  {
    field: "date",
    headerName: "Fecha",
    width: "10%",
    editable: true,
  },
  {
    field: "comentario",
    headerName: "comentario",
    width: 500,
  },
];

const rows = [
  {
    id: 1,
    evento: "Falla conexion",
    date: "02/08/2021",
    comentario: "Conector dañado",
  },
  {
    id: 2,
    evento: "Falla conexion",
    date: "02/08/2021",
    comentario: "Conector dañado",
  },
  {
    id: 3,
    evento: "Falla conexion",
    date: "02/08/2021",
    comentario: "Conector dañado",
  },
];

export default function DetailCamera({ item }) {
  console.log(item);
  const [checked, setChecked] = useState(true);
  const [dateValue, setDateValue] = useState();
  const [dateValueB, setDateValueB] = useState();
  const [dataSelectServer, setdataSelectServer] = useState([]);
  const [dataSelectBrand, setdataSelectBrand] = useState([]);
  const [data, setData] = useState("");
  const [dataS, setDataS] = useState("");

  useEffect(() => {
    getData();
    item.map((val) => {
      setChecked(val.isGoodCondition);
      setDateValueB(val.dateBuys);
      setDateValue(val.dateInstallation);
    });
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    values.isGoodCondition = checked;
    values.dateInstallation = dateValue;
    values.dateBuys = dateValueB;
    apiCamera.PostCamera(values).then((res) => {
      if (res.status === 400) {
        toast.warning(res.data);
      }
      if (res.status === 200) {
        toast("Registro Ingresado");
        resetForm();
      }
    });
    setData("");
    setDataS("");
    resetForm();
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
        <div className="title">Detail Camera</div>
        {item.map((val) => (
          <Grid container spacing={1}>
            <Form
              initialValues={initialValues}
              validationSchema={validationCamera}
              onSubmit={handleSubmit}
            >
              <div className="detailTop">
                <div className="boxDetail">
                  <Grid container>
                    <Text name="name" label="Name" value={val.name} sm={4} />
                    <Grid item sm={4}>
                      <FieldSelect
                        origin="brand"
                        source={dataSelectBrand}
                        data={data}
                        setData={setData}
                        value={val.brandId}
                      />
                    </Grid>
                    <Text name="model" label="Model" value={val.model} sm={4} />
                    <Text name="type" label="Type" value={val.type} sm={4} />
                    <Text
                      name="ipAddress"
                      label="IP"
                      value={val.ipAddress}
                      sm={4}
                    />
                    <Text name="mac" label="Mac" value={val.mac} sm={4} />
                    <Text
                      name="serialNumber"
                      label="Serial"
                      value={val.serialNumber}
                      sm={12}
                    />
                    <Text
                      name="server"
                      label="Server"
                      value={val.server.name}
                      sm={6}
                    />
                    <Text
                      name="location"
                      label="Location"
                      value={val.location}
                      sm={6}
                    />
                  </Grid>
                </div>
                <div className="boxImage"></div>
              </div>
              <Divider
                style={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
              />
              <Grid container>
                <Text
                  name="locationConnection"
                  label="Connection"
                  value={val.locationConnection}
                  sm={2}
                />
                <Text
                  name="idPatchPanel"
                  label="PatchPanel"
                  value={val.idPatchPanel}
                  sm={2}
                />
                <Text
                  name="idSwitch"
                  label="Switch"
                  value={val.idSwitch}
                  sm={2}
                />
                <Text
                  name="portPatchPanel"
                  label="Port PP"
                  value={val.portPatchPanel}
                  sm={1}
                />
                <Text
                  name="portSwitch"
                  label="Port Switch/NVR"
                  value={val.portSwitch}
                  sm={1}
                />
                <Text
                  name="firmwareVersion"
                  label="Firmware"
                  value={val.firmwareVersion}
                  sm={3}
                />
                <Grid item xs={12} sm={4}>
                  <DatePickerField
                    label="Date Buys"
                    dateValue={dateValueB}
                    handleChange={handleChangeDateB}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DatePickerField
                    label="Installation Date"
                    dateValue={dateValue}
                    handleChange={handleChangeDateI}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <SwitchField
                    handleChange={handleChange}
                    label="En Funcionamiento"
                    checked={checked}
                  />
                </Grid>
                <Divider
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    marginTop: "5px",
                  }}
                />
                <Typography component="h1" variant="h5" align="center">
                  Historico
                </Typography>
                <div style={{ height: "300px", width: "100%" }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                  />
                </div>
              </Grid>

              <SubmitButton title="Save" />
            </Form>
          </Grid>
        ))}
      </div>
    </LocalizationProvider>
  );
}
