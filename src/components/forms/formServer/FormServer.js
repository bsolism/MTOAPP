import React, { useState, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Grid, CssBaseline } from "@mui/material";
import { toast } from "react-toastify";
import Form from "../form";
import initialValues from "../../../models/server";
import { apiAgency, apiBrand, apiServer } from "../../../services";
import Text from "../field/Text";
import FieldSelect from "../field/FieldSelect";
import Button from "../field/button";
import DatePickerField from "../field/DatePickerField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import SwitchField from "../field/SwitchField";
import SubmitButton from "../field/SubmitButton";

const theme = createTheme();

export default function FormServer() {
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
    values.isGoodCondition = checked;
    values.fechaInstalacion = dateValue;
    values.fechaCompra = dateValueB;
    values.brand = null;

    apiServer.PostServer(values).then((res) => {
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
  };

  const getData = async () => {
    await apiAgency.GetAgency().then((res) => {
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h6" align="center">
              Agregar Server/NVR/DVR
            </Typography>
            <React.Fragment>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Grid container spacing={3}>
                  <Form initialValues={initialValues} onSubmit={handleSubmit}>
                    <Text required={true} name="ipAddress" label="Ip Address" />
                    <Text required={true} name="user" label="User" />
                    <Text
                      required={true}
                      name="password"
                      label="Password"
                      type="password"
                    />
                    <Grid item xs={12} sm={3}>
                      <FieldSelect
                        origin="brand"
                        source={dataSelectBrand}
                        data={data}
                        setData={setData}
                      />
                    </Grid>
                    <Button className="button" source="server" toast={toast} />
                    <Divider style={{ width: "100%" }} />
                    <Text required={true} name="nombre" label="Name" />
                    <Text required={true} name="type" label="Type" />
                    <Text name="modelo" label="Model" />
                    <Text name="mac" label="Mac" />
                    <Text name="deviceId" label="DeviceId" />
                    <Text name="serialNumber" label="SerialNumber" />
                    <Text name="firmwareVersion" label="FirmwareVersion" />
                    <Text name="assetId" label="ActiveNumber" />
                    <Text name="sata" label="Cant. Sata" type="number" />
                    <Text
                      name="capacidadSata"
                      label="TB / Sata"
                      type="number"
                    />

                    <Text
                      name="portAnalogo"
                      label="Port Analogos"
                      type="number"
                    />
                    <Text name="portIpPoe" label="Port IP Poe" type="number" />
                    <Text name="canalesIP" label="Canales IP" type="number" />
                    <Divider style={{ width: "100%", marginTop: "25px" }} />
                    <Text
                      name="sataInstalado"
                      label="Sata Disp."
                      type="number"
                    />
                    <Text
                      name="capacidadSataInstalado"
                      label="Total Alm. TB"
                      type="number"
                    />
                    <Text
                      name="engravedDays"
                      label="Days Engraved"
                      sm={2}
                      type="number"
                    />
                    <Grid item xs={12} sm={3}>
                      <FieldSelect
                        origin="server"
                        source={dataSelectServer}
                        data={dataS}
                        setData={setDataS}
                      />
                    </Grid>
                    <Text name="ubicacion" label="Location" />

                    <Grid item xs={12} sm={3}>
                      <DatePickerField
                        label="Date Installation"
                        dateValue={dateValue}
                        handleChange={handleChangeDateI}
                        marginTop="20px"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <DatePickerField
                        label="Date Buys"
                        dateValue={dateValueB}
                        handleChange={handleChangeDateB}
                      />
                    </Grid>
                    <Text name="nota" label="Observaciones" />
                    <Grid item xs={12} sm={12}>
                      <SwitchField
                        handleChange={handleChange}
                        label="En Funcionamiento"
                        checked={checked}
                      />
                    </Grid>
                    <Divider
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    />

                    <SubmitButton title="Save" />
                  </Form>
                </Grid>
              </Box>
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
