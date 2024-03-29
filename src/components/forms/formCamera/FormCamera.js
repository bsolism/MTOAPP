import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { toast } from "react-toastify";
import initialValues from "../../../models/camera";
import Text from "../field/Text";
import FieldSelect from "../field/FieldSelect";
import Button from "../field/button";
import PickerDate from "../field/PickerDate";
import SwitchField from "../field/SwitchField";
import SubmitButton from "../field/SubmitButton";
import LayoutForm from "../../../Layout/LayoutForm";
import theme from "./styles";
import useHookFormCamera from "./useHookFormCamera";

export default function FormCamera() {
  const [onLine, setOnLine] = useState(false);
  const [dateInst, setDateInst] = useState(null);
  const [dateBuy, setDateBuy] = useState(null);
  const [idBrand, setIdBrand] = useState("");
  const [idAgency, setIdAgency] = useState("");
  const [idServer, setIdServer] = useState("");
  const [submit] = useHookFormCamera();

  const handleSubmit = (values, { resetForm }) => {
    values.server = null;
    submit(
      values,
      resetForm,
      setDateInst,
      setDateBuy,
      setIdBrand,
      setIdAgency,
      setIdServer
    );
  };
  return (
    <LayoutForm item={initialValues} onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h6" align="center">
            Agregar Cámara
          </Typography>
        </Grid>
        <Grid item xs={12} style={theme.box}>
          <Text required name="ipAddress" label="Ip Address" />
          <Text required name="user" label="User" />
          <Text required name="password" label="Password" type="password" />
          <FieldSelect type="brand" id={idBrand} setId={setIdBrand} />
        </Grid>
        <Grid item xs={12} style={theme.button}>
          <Button source="camera" toast={toast} setOnLine={setOnLine} />
        </Grid>
        <Grid item xs={12} style={theme.box}>
          <Grid item xs={4}>
            <Text required={true} name="name" label="Name" />
            <Text name="mac" label="Mac" />
            <Text name="firmwareVersion" label="FirmwareVersion" />
            <Text name="location" label="Location" />
            <PickerDate
              name="dateBuy"
              label="Buy Date"
              value={dateBuy}
              setValue={setDateBuy}
            />
            <Text name="patchPanel" label="Patch Panel" />
            <Text name="portSwitch" label="Port Sw/NIC" type="number" />
          </Grid>
          <Grid item xs={4}>
            <Text required={true} name="type" label="Type" />
            <Text name="deviceId" label="DeviceId" />
            <Text name="deviceDescription" label="DeviceDescription" />
            <Text name="assetId" label="ActiveNumber" />
            <PickerDate
              name="dateInstallation"
              label="Installation Date"
              value={dateInst}
              setValue={setDateInst}
            />
            <Text name="switch" label="Switch" />
            <Text name="portChannel" label="Port CH" type="number" />
          </Grid>
          <Grid item xs={4}>
            <Text name="model" label="Model" />
            <Text name="serialNumber" label="SerialNumber" />
            <FieldSelect type="agency" id={idAgency} setId={setIdAgency} />
            <FieldSelect type="server" id={idServer} setId={setIdServer} />
            <Text name="connection" label="Conecction" />
            <Text name="portPatchPanel" label="Port PP" type="number" />
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
