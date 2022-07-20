import React, { useState, useEffect } from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, Grid } from "@mui/material";
import SwitchField from "../Field/SwitchField";
import DatePickerField from "../Field/DatePickerField";
import FieldSelect from "../Field/FieldSelect";
import SubmitButton from "../SubmitButton";
import CheckboxField from "../Field/CheckboxField";
import Domain from "./Domain";
import Form from "../form";
import Text from "../Field/Text";
import RefreshData from "../refreshData";

import "./DetailServer.scss";

export default function DetailServer({ item, handleClose, getDta }) {
  const [checked, setChecked] = useState(true);
  const [dateValue, setDateValue] = useState();
  const [dateValueB, setDateValueB] = useState();
  const [dataSelectBrand, setdataSelectBrand] = useState([]);
  const [data, setData] = useState("");
  const [dateTime, setDateTime] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [dateOld, setDateOld] = useState();
  const [dataServer, setDataServer] = useState(item[0]);

  useEffect(() => {
    setData(dataServer.brandId);
    setChecked(dataServer.isGoodCondition);
    setDateValueB(dataServer.fechaCompra);
    setDateValue(dataServer.fechaInstalacion);

    Domain.getDataTime(dataServer, setdataSelectBrand, setDateTime, setDateOld);
  }, []);

  useEffect(() => {
    Domain.sincronizer(checkbox, setDateTime, dateOld);
  }, [checkbox]);

  const handleSubmit = (values) => {
    Domain.handleSubmit(
      values,
      checked,
      dateValue,
      dateValueB,
      checkbox,
      dateTime,
      handleClose,
      getDta
    );
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
        <Grid container spacing={1}>
          <Form initialValues={dataServer} onSubmit={handleSubmit}>
            <div className="detailTop">
              <Grid container spacing={1}>
                <Grid item sm={12}>
                  <RefreshData item={dataServer} />
                </Grid>
                <Text name="nombre" label="Nombre" xs={15} sm={6} />
                <Grid item xs={15} sm={6}>
                  <FieldSelect
                    origin="brand"
                    source={dataSelectBrand}
                    data={data}
                    setData={setData}
                  />
                </Grid>
                <Text name="modelo" label="Modelo" xs={15} sm={6} />
                <Text name="type" label="Tipo" xs={15} sm={6} />
                <Text name="user" label="Usuario" xs={15} sm={6} />
                <Text
                  name="password"
                  label="Password"
                  xs={15}
                  sm={6}
                  type="password"
                />
                <Text name="ipAddress" label="IP" xs={15} sm={6} />
                <Text name="mac" label="Mac" xs={15} sm={6} />
                <Text name="serialNumber" label="Serial" xs={15} sm={6} />
                <Text name="deviceId" label="Device Id" xs={15} sm={6} />
                <Text name="ubicacion" label="Ubicación" xs={15} sm={6} />
                <Text name="firmwareVersion" label="Firmware" xs={15} sm={6} />

                <Text
                  name="sataInstalado"
                  label="HDD Instalado"
                  xs={15}
                  sm={6}
                />
                <Text
                  name="capacidadSataInstalado"
                  label="Tamaño HDD (TB)"
                  xs={15}
                  sm={6}
                />

                <Text
                  label="Total de Cámaras"
                  xs={15}
                  sm={6}
                  value={dataServer.cameras.length}
                />
                <Text
                  name="engravedDays"
                  label="Dias Grabados"
                  xs={15}
                  sm={6}
                />
                <Divider
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
                <Grid item xs={15} sm={3}>
                  <DatePickerField
                    label="Fecha y hora Dispositivo"
                    dateValue={dateTime}
                    handleChange={handleChangeDateB}
                    format="yyyy-MM-dd HH:mm:ss"
                    mask="____-__-__ __:__:__"
                  />
                </Grid>
                <Grid
                  className="checkbox"
                  item
                  xs={15}
                  sm={6}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                >
                  <CheckboxField
                    checkbox={checkbox}
                    setCheckbox={setCheckbox}
                  />
                </Grid>
                <Divider
                  style={{
                    width: "100%",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />

                <Grid item xs={15} sm={3}>
                  <DatePickerField
                    label="Date Buys"
                    dateValue={dateValueB}
                    handleChange={handleChangeDateB}
                  />
                </Grid>
                <Grid item xs={15} sm={3}>
                  <DatePickerField
                    label="Installation Date"
                    dateValue={dateValue}
                    handleChange={handleChangeDateI}
                  />
                </Grid>
                <Grid item xs={15} sm={3}>
                  <SwitchField
                    handleChange={handleChange}
                    label="En Linea"
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
                <Text
                  name="nota"
                  label="Observaciones"
                  xs={15}
                  sm={6}
                  multiline
                  minrows={2}
                  maxRows={4}
                />
                <Divider
                  style={{
                    width: "100%",
                    marginBottom: "5px",
                    marginTop: "5px",
                  }}
                />
              </Grid>
            </div>
            <SubmitButton title="Save" />
          </Form>
        </Grid>
      </div>
    </LocalizationProvider>
  );
}
