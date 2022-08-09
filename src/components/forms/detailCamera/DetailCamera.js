import React from "react";
import { Grid } from "@mui/material";
import SwitchField from "../field/SwitchField";
import DatePickerField from "../field/DatePickerField";
import FieldSelect from "../field/FieldSelect";
import SubmitButton from "../field/SubmitButton";
import Text from "../field/Text";
import RefreshData from "../refreshData";
import useHookDetailCamera from "./useHookDetailCamera";
import LayoutForm from "../../../Layout/LayoutForm";

import Loader from "../../Loader";
import "./DetailCamera.scss";

export default function DetailCamera({ item, handleClose, data, setData }) {
  const [submit, image, checkedMic, mic, handleChangeMic] = useHookDetailCamera(
    item[0],
    data,
    setData
  );

  const handleSubmit = (values) => {
    submit(values);
    handleClose();
  };

  return (
    <LayoutForm item={item[0]} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <RefreshData item={item[0]} />
          <SwitchField id="retired" label="Retirar" value={item[0].retired} />
        </Grid>
        <Grid item xs={4}>
          <Text name="name" label="Name" />
          <Text name="ipAddress" label="IP" sm={4} />
          <Text name="assetId" label="ActiveNumber" sm={4} />
          <Text name="user" label="User" />
          <Text name="password" label="Pass" type="Password" />
          <FieldSelect type="server" id={item[0].serverId} />
          <FieldSelect type="agency" id={item[0].agenciaId} />
        </Grid>

        <Grid item xs={4}>
          <FieldSelect type="brand" id={item[0].brandId} />
          <Text name="model" label="Model" sm={6} />
          <Text name="type" label="Type" sm={6} />
          <Text name="mac" label="Mac" sm={4} />
          <Text name="serialNumber" label="Serial" sm={12} />
          <Text name="firmwareVersion" label="Firmware" sm={3} />
          <Text name="deviceDescription" label="Description" sm={4} />
        </Grid>
        <Grid item xs={4}>
          {image ? (
            <img
              src={`data:image/jpeg;chartset=utf-8;base64,${image}`}
              style={{ width: "250px", height: "200px" }}
            />
          ) : (
            <Loader origin="detail" />
          )}
        </Grid>

        <Grid item xs={4}>
          <Text name="ubicacionFisica" label="Location" sm={4} />
          <Text name="ubicacionConexion" label="Connection" sm={2} />
          <Text name="patchPanel" label="PatchPanel" sm={2} />
        </Grid>
        <Grid item xs={4}>
          <Text name="switch" label="Switch" sm={2} />
          <Text name="portPatchPanel" label="Port PP" sm={1} />
          <Text name="portSwitch" label="Port Switch/NVR" sm={1} />
        </Grid>
        <Grid item xs={4}>
          <Text name="portChannel" label="PortChannel" sm={2} />
          <DatePickerField
            id="buy"
            label="Date Buys"
            dateValue={item[0].fechaCompra}
          />
          <DatePickerField
            id="installation"
            label="Installation Date"
            dateValue={item[0].fechaInstalacion}
          />
          {mic ? (
            <SwitchField
              handleChange={handleChangeMic}
              label="Mic"
              checked={checkedMic}
            />
          ) : null}
        </Grid>
        <Grid item xs={6} display="flex">
          <SubmitButton title="Save" />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <SwitchField id="onLine" label="En Linea" value={item[0].online} />
        </Grid>
      </Grid>
    </LayoutForm>
  );
}
