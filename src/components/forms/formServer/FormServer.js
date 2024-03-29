import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import initialValues from "../../../models/server";
import Text from "../field/Text";
import FieldSelect from "../field/FieldSelect";
import Button from "../field/button";
import DatePickerField from "../field/DatePickerField";
import SwitchField from "../field/SwitchField";
import SubmitButton from "../field/SubmitButton";
import LayoutForm from "../../../Layout/LayoutForm";
import PickerDate from "../field/PickerDate";
import theme from "./styles";
import useHookFormServer from "./useHookFormServer";

export default function FormServer() {
  const [onLine, setOnLine] = useState(false);
  const [idBrand, setIdBrand] = useState("");
  const [idAgency, setIdAgency] = useState("");
  const [dateInst, setDateInst] = useState(null);
  const [dateBuy, setDateBuy] = useState(null);
  const [submit] = useHookFormServer();

  const handleSubmit = (values, { resetForm }) => {
    submit(values, setIdBrand, setIdAgency, setDateInst, setDateBuy);
    resetForm();
  };

  return (
    <LayoutForm item={initialValues} onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6" align="center">
            Agregar Server/NVR/DVR
          </Typography>
        </Grid>
        <Grid item xs={12} style={theme.box}>
          <Text required name="ipAddress" label="Ip Address" />
          <Text required name="user" label="User" />
          <Text required name="password" label="Password" type="password" />
          <FieldSelect type="brand" id={idBrand} setId={setIdBrand} />
        </Grid>
        <Grid item xs={12} style={theme.button}>
          <Button source="server" toast={toast} setOnLine={setOnLine} />
        </Grid>
        <Grid item xs={12} style={theme.box}>
          <Grid item xs={4}>
            <Text required={true} name="name" label="Name" />
            <Text name="mac" label="Mac" />
            <Text name="firmwareVersion" label="FirmwareVersion" />
            <Text name="location" label="Location" />
          </Grid>
          <Grid item xs={4}>
            <Text required={true} name="type" label="Type" />
            <Text name="deviceId" label="DeviceId" />
            <Text name="assetId" label="ActiveNumber" />

            <PickerDate
              name="dateBuy"
              label="Buy Date"
              value={dateBuy}
              setValue={setDateBuy}
            />
          </Grid>
          <Grid item xs={4}>
            <Text name="model" label="Model" />
            <Text name="serialNumber" label="SerialNumber" />
            <FieldSelect type="agency" id={idAgency} setId={setIdAgency} />
            <PickerDate
              name="dateInstallation"
              label="Installation Date"
              value={dateInst}
              setValue={setDateInst}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={theme.box}>
          <Grid item xs={4}>
            <Text name="portAnalogo" label="Port Analogos" type="number" />
            <Text name="slotSata" label="HDDs Slot" type="number" />
            <Text name="capacityTotal" label="Total Alm." type="number" />
          </Grid>
          <Grid item xs={4}>
            <Text name="portIpPoe" label="Port IP Poe" type="number" />
            <Text name="capacityBySlot" label="Cap/Slot" type="number" />
            <Text name="engravedDays" label="Days Engraved" type="number" />
          </Grid>
          <Grid item xs={4}>
            <Text name="channelIP" label="Canales IP" type="number" />
            <Text name="sataAvailable" label="HDD Inst." type="number" />
            <SwitchField id="onLine" label="En Linea" value={onLine} />
          </Grid>
        </Grid>
        <Grid item xs={12} style={theme.box}>
          <Grid item xs={12}>
            <Text name="note" label="Observaciones" />
            <SubmitButton title="Save" />
          </Grid>
        </Grid>
      </Grid>
    </LayoutForm>
  );
}
