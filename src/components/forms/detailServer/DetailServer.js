import React, { useState, useEffect } from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";
import SwitchField from "../Field/SwitchField";
import DatePickerField from "../Field/DatePickerField";
import FieldSelect from "../Field/FieldSelect";
import SubmitButton from "../SubmitButton";
import { apiCamera, apiAgency, apiBrand } from "../../../services";
import Form from "../form";
import Text from "../Field/Text";

import "./DetailServer.scss";

export default function DetailServer({ item, handleClose }) {
  const [checked, setChecked] = useState(true);
  const [dateValue, setDateValue] = useState();
  const [dateValueB, setDateValueB] = useState();
  const [dataSelectAgency, setdataSelectAgency] = useState([]);
  const [dataSelectBrand, setdataSelectBrand] = useState([]);
  const [data, setData] = useState("");
  const [agency, setAgency] = useState("");

  console.log(item);

  useEffect(() => {
    item.map((val) => {
      setData(val.brandId);
      setAgency(val.agenciaId);
      //   setChecked(val.isGoodCondition);
      setDateValueB(val.dateBuys);
      setDateValue(val.dateInstallation);
    });
    getData();
  }, []);

  const handleSubmit = (values) => {
    console.log(values);
    // values.isGoodCondition = checked;
    // values.dateInstallation = dateValue;
    // values.dateBuys = dateValueB;

    // apiCamera.PutCamera(values).then((res) => {
    //   console.log(res);
    //   if (res === undefined) toast.warning("Update error");
    //   if (res.status === 200) {
    //     toast("Update Complete");
    //     handleClose();
    //   }
    // });
  };
  const getData = async () => {
    // const credential = {
    //   ipAddress: item[0].ipAddress,
    //   name: item[0].user,
    //   password: item[0].password,
    //   brand: item[0].brand.name,
    //   nicInterno: item[0].idSwitch,
    // };
    await apiAgency.GetAgency().then((res) => {
      setdataSelectAgency(res.data);
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
        <div className="title">Detail Server</div>
        <Grid container spacing={1}>
          {item.map((val) => (
            <Form initialValues={val} key={val.id} onSubmit={handleSubmit}>
              <div className="detailTop">
                <Grid container spacing={1}>
                  <Text name="name" label="Nombre" xs={15} sm={6} />
                  <Grid item xs={15} sm={6}>
                    <FieldSelect
                      origin="brand"
                      source={dataSelectBrand}
                      data={data}
                      setData={setData}
                    />
                  </Grid>
                  <Text name="model" label="Modelo" xs={15} sm={6} />
                  <Text name="type" label="Tipo" xs={15} sm={6} />
                  <Text name="ipAddress" label="IP" xs={15} sm={6} />
                  <Text name="mac" label="Mac" xs={15} sm={6} />
                  <Text name="serialNumber" label="Serial" xs={15} sm={6} />
                  <Text name="deviceId" label="Device Id" xs={15} sm={6} />
                  <Grid item xs={15} sm={6}>
                    <FieldSelect
                      origin="server"
                      source={dataSelectAgency}
                      data={agency}
                      setData={setAgency}
                    />
                  </Grid>
                  <Text name="location" label="Ubicación" xs={15} sm={6} />
                  <Text
                    name="firmwareVersion"
                    label="Firmware"
                    xs={15}
                    sm={6}
                  />
                  <Text name="cameraCapacity" label="Canales" xs={15} sm={6} />
                  <Text
                    name="cameraAvailable"
                    label="Canales Ocupados"
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
                  <Text
                    name="storage"
                    label="Capacidad almacenamiento"
                    xs={15}
                    sm={6}
                  />
                  <Text
                    name="storageAvailable"
                    label="Almacenamiento Ocupado"
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
