import React, { useState } from "react";
import { Grid } from "@mui/material";
import SwitchField from "../field/SwitchField";
import DatePickerField from "../field/DatePickerField";
import PickerDate from "../field/PickerDate";
import FieldSelect from "../field/FieldSelect";
import SubmitButton from "../field/SubmitButton";
import Text from "../field/Text";
import RefreshData from "../refreshData";
import useHookDetailCamera from "./useHookDetailCamera";
import LayoutForm from "../../../Layout/LayoutForm";

import Loader from "../../Loader";
import "./DetailCamera.scss";

export default function DetailCamera({ item, handleClose, data, setData }) {
  const [dateInst, setDateInst] = useState(item[0].dateInstallation);
  const [dateBuy, setDateBuy] = useState(item[0].dateBuy);
  const [idAgency, setIdAgency] = useState(item[0].agencyId);
  const [idServer, setIdServer] = useState(item[0].serverId);
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
          <RefreshData source="camera" item={item[0]} />
          <SwitchField id="retired" label="Retirar" value={item[0].retired} />
        </Grid>
        <Grid item xs={4}>
          <Text name="name" label="Name" />
          <Text name="ipAddress" label="IP" sm={4} />
          <Text name="assetId" label="ActiveNumber" sm={4} />
          <Text name="user" label="User" />
          <Text name="password" label="Pass" type="Password" />
          <FieldSelect type="server" id={idServer} setId={setIdServer} />
          <FieldSelect type="agency" id={idAgency} setId={setIdAgency} />
        </Grid>

        <Grid item xs={4}>
          <FieldSelect type="brand" id={item[0].brandId} disabled />
          <Text name="model" label="Model" sm={6} disabled />
          <Text name="type" label="Type" sm={6} disabled />
          <Text name="mac" label="Mac" sm={4} disabled />
          <Text name="serialNumber" label="Serial" sm={12} disabled />
          <Text name="firmwareVersion" label="Firmware" sm={3} disabled />
          <Text name="deviceDescription" label="Description" sm={4} />
        </Grid>
        <Grid item xs={4}>
          {image !== undefined ? (
            <img
              src={`data:image/jpeg;chartset=utf-8;base64,${image}`}
              style={{ width: "250px", height: "200px" }}
            />
          ) : (
            <Loader origin="detail" />
          )}
        </Grid>

        <Grid item xs={4}>
          <Text name="location" label="Location" sm={4} />
          <Text name="connection" label="Connection" sm={2} />
          <Text name="patchPanel" label="PatchPanel" sm={2} />
        </Grid>
        <Grid item xs={4}>
          <Text name="switch" label="Switch" sm={2} />
          <Text name="portPatchPanel" label="Port PP" sm={1} />
          <Text name="portSwitch" label="Port Switch/NVR" sm={1} />
        </Grid>
        <Grid item xs={4}>
          <Text name="portChannel" label="PortChannel" sm={2} />
          <PickerDate
            name="dateBuy"
            label="Buy Date"
            value={dateBuy}
            setValue={setDateBuy}
          />
          <PickerDate
            name="dateInstallation"
            label="Installation Date"
            value={dateInst}
            setValue={setDateInst}
          />
          {/* <DatePickerField
            id="buy"
            label="Date Buys"
            dateValue={item[0].dateBuy}
          /> */}
          {/* <DatePickerField
            id="installation"
            label="Installation Date"
            dateValue={item[0].dateInstallation}
          /> */}
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
