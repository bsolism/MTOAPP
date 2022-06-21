import React, { useState, useEffect } from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";
import SwitchField from "../Field/SwitchField";
import DatePickerField from "../Field/DatePickerField";
import FieldSelect from "../Field/FieldSelect";
import SubmitButton from "../SubmitButton";
import XMLParser from "react-xml-parser";
import CheckboxField from "../Field/CheckboxField";

import { apiBrand, apiHikvision, apiServer } from "../../../services";
import Form from "../form";
import Text from "../Field/Text";

import "./DetailServer.scss";

export default function DetailServer({ item, handleClose }) {
  const [checked, setChecked] = useState(true);
  const [dateValue, setDateValue] = useState();
  const [dateValueB, setDateValueB] = useState();
  const [dataSelectBrand, setdataSelectBrand] = useState([]);
  const [data, setData] = useState("");
  const [dateTime, setDateTime] = useState();
  const [checkbox, setCheckbox] = useState(false);
  const [dateOld, setDateOld] = useState();

  useEffect(() => {
    item.map((val) => {
      setData(val.brandId);
      setChecked(val.isGoodCondition);
      setDateValueB(val.fechaCompra);
      setDateValue(val.fechaInstalacion);
    });
    getData();
  }, []);

  useEffect(() => {
    sincronizer();
  }, [checkbox]);

  const handleSubmit = (values) => {
    values.isGoodCondition = checked;
    values.fechaInstalacion = dateValue;
    values.fechaCompra = dateValueB;
    console.log(values);
    if (checkbox) {
      if (values.brand.name === "Hikvision") {
        apiHikvision.updateTime(dateTime, values).then((res) => {});
      }
    }
    apiServer.PutSever(values).then((res) => {
      if (res === undefined) toast.warning("Update error");
      if (res.status === 200) {
        toast("Update Complete");
        handleClose();
      }
    });
  };
  const sincronizer = () => {
    if (checkbox) {
      var date = new Date();
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const min =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const sec =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      const newDate =
        year +
        "-" +
        month +
        "-" +
        day +
        "T" +
        hour +
        ":" +
        min +
        ":" +
        sec +
        "-06:00";
      console.log(newDate);
      setDateTime(newDate);
    } else {
      setDateTime(dateOld);
    }
  };
  const getData = async () => {
    const credential = {
      ipAddress: item[0].ipAddress,
      name: item[0].user,
      password: item[0].password,
    };

    await apiBrand.GetBrand().then((res) => {
      setdataSelectBrand(res.data);
    });
    if (item[0].brand.name === "Hikvision") {
      await apiHikvision.GetTime(credential).then((res) => {
        if (res.status === 500) toast.warning("no se pudo sincronizar");
        if (res.status === 200) {
          var xmlData = new XMLParser().parseFromString(res.data);
          xmlData.children.map((x) => {
            if (x.name === "localTime") {
              setDateTime(x.value);
              setDateOld(x.value);
            }
          });
        }
      });
    }
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
        <div className="title">Detail Server</div>
        <Grid container spacing={1}>
          {item.map((val) => (
            <Form initialValues={val} key={val.id} onSubmit={handleSubmit}>
              <div className="detailTop">
                <Grid container spacing={1}>
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
                  <Text name="ipAddress" label="IP" xs={15} sm={6} />
                  <Text name="mac" label="Mac" xs={15} sm={6} />
                  <Text name="serialNumber" label="Serial" xs={15} sm={6} />
                  <Text name="deviceId" label="Device Id" xs={15} sm={6} />
                  <Text name="ubicacion" label="Ubicación" xs={15} sm={6} />
                  <Text
                    name="firmwareVersion"
                    label="Firmware"
                    xs={15}
                    sm={6}
                  />
                  <Text name="sata" label="Cantidad Sata" xs={15} sm={6} />
                  <Text
                    name="capacidadSata"
                    label="Capacidad por Sata"
                    xs={15}
                    sm={6}
                  />
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
                  <Text name="canalesIP" label="Canales IP" xs={15} sm={6} />
                  <Text name="portIpPoe" label="Puertos Poe" xs={15} sm={6} />
                  <Text
                    name="portAnalogo"
                    label="Puertos Analogos"
                    xs={15}
                    sm={6}
                  />

                  <Text
                    label="Total de Cámaras"
                    xs={15}
                    sm={6}
                    value={val.cameras.length}
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
          ))}
        </Grid>
      </div>
    </LocalizationProvider>
  );
}
