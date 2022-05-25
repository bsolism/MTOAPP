import React, { useState, useEffect } from "react";
import { Box, Container, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Divider, Grid, CssBaseline } from "@mui/material";
import { toast } from "react-toastify";
import Form from "../form";
import initialValues from "../../../models/server";
import validationCamera from "../../../validation/validationCamera";
import { apiCamera, apiAgency, apiBrand, apiServer } from "../../../services";
import Text from "../Field/Text";
import FieldSelect from "../Field/FieldSelect";
import Button from "../button";
import DatePickerField from "../Field/DatePickerField";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import SwitchField from "../Field/SwitchField";
import SubmitButton from "../SubmitButton";

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
    values.dateInstallation = dateValue;
    values.dateBuys = dateValueB;
    console.log(values);
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
    resetForm();
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
                    <Text required={true} name="password" label="Password" />
                    <Grid item xs={12} sm={3}>
                      <FieldSelect
                        origin="brand"
                        source={dataSelectBrand}
                        data={data}
                        setData={setData}
                      />
                    </Grid>
                    <Button className="button" source="server" />
                    <Divider style={{ width: "100%" }} />
                    <Text required={true} name="name" label="Name" />
                    <Text required={true} name="type" label="Type" />
                    <Text name="model" label="Model" />
                    <Text name="mac" label="Mac" />
                    <Text name="deviceId" label="DeviceId" />
                    <Text name="serialNumber" label="SerialNumber" />
                    <Text name="firmwareVersion" label="FirmwareVersion" />
                    <Text name="location" label="Location" />
                    <Grid item xs={12} sm={3}>
                      <DatePickerField
                        label="Date Installation"
                        dateValue={dateValue}
                        handleChange={handleChangeDateI}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <DatePickerField
                        label="Date Buys"
                        dateValue={dateValueB}
                        handleChange={handleChangeDateB}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FieldSelect
                        origin="server"
                        source={dataSelectServer}
                        data={dataS}
                        setData={setDataS}
                      />
                    </Grid>
                    <Text name="cameraCapacity" label="Cam. Cap." />
                    <Text name="cameraAvailable" label="Cam. Disp." />
                    <Text name="storage" label="Cap. Storage" />
                    <Text
                      name="storageAvailable"
                      label="Storage Disp."
                      sm={2}
                    />
                    <Text name="engravedDays" label="Days Engraved" sm={2} />
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
