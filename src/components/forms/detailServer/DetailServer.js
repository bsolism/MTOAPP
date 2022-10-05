import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import SwitchField from "../field/SwitchField";
import DatePickerField from "../field/DatePickerField";
import PickerDate from "../field/PickerDate";
import FieldSelect from "../field/FieldSelect";
import SubmitButton from "../field/SubmitButton";
import CheckboxField from "../field/CheckboxField";
import Text from "../field/Text";
import LayoutForm from "../../../Layout/LayoutForm";
import useHookDetailServer from "./useHookDetailServer";
import RefreshData from "../refreshData";

import "./DetailServer.scss";

export default function DetailServer({
  item,
  handleClose,
  data,
  setData,
  setDataCam,
  dataCam,
}) {
  const ref = useRef(null);
  const [dateInst, setDateInst] = useState(item[0].dateInstallation);
  const [dateBuy, setDateBuy] = useState(item[0].dateBuy);
  const [dateDevice, setDateDevice] = useState(null);
  const [idBrand, setIdBrand] = useState(item[0].brandId);
  const [submit] = useHookDetailServer(
    data,
    setData,
    item[0],
    setDateDevice,
    ref,
    setDataCam,
    dataCam
  );
  const handleSubmit = (values) => {
    submit(values);
    handleClose();
  };

  return (
    <LayoutForm item={item[0]} onSubmit={handleSubmit} innerRef={ref}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <RefreshData source="device" item={item[0]} />
          <SwitchField id="retired" label="Retirar" value={item[0].retired} />
        </Grid>
        <Grid item xs={6}>
          <Text name="name" label="Nombre" />
          <Text name="model" label="Modelo" disabled />
          <Text name="user" label="Usuario" />
          <Text name="ipAddress" label="IP" />
          <Text name="serialNumber" label="Serial" disabled />
          <Text name="assetId" label="ActiveNumber" />
          <Text name="location" label="Ubicación" />
          <Text name="sataAvailable" label="HDD Instalado" />
          <Text
            label="Total de Cámaras"
            disabled
            value={item[0].cameras !== null ? item[0].cameras.length : 0}
          />
          <PickerDate
            name="dateBuy"
            label="Buy Date"
            value={dateBuy}
            setValue={setDateBuy}
          />
        </Grid>
        <Grid item xs={6}>
          <FieldSelect type="brand" id={idBrand} setId={setIdBrand} />
          <Text name="type" label="Tipo" />
          <Text name="password" label="Password" type="password" />
          <Text name="mac" label="Mac" disabled />
          <Text name="deviceId" label="Device Id" disabled />
          <Text name="firmwareVersion" label="Firmware" disabled />
          <Text name="engravedDays" label="Dias Grabados" />
          <Text name="capacityTotal" label="Tamaño HDD (TB)" />
          <Text name="note" label="Observaciones" />
          <PickerDate
            name="dateInstallation"
            label="Installation Date"
            value={dateInst}
            setValue={setDateInst}
          />
        </Grid>
        <Grid item xs={3} display="flex" alignContent="baseline">
          <PickerDate
            disabled
            name="DateDevice"
            label="Date Device"
            value={dateDevice}
            setValue={setDateDevice}
            format="yyyy-MM-dd HH:mm"
            mask="____-__-__ __:__"
          />
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="flex-end">
          <CheckboxField
            label="Sinc"
            item={item[0]}
            setNewValueDate={setDateDevice}
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <SwitchField id="onLine" label="En Linea" value={item[0].online} />
        </Grid>
        <Grid item xs={6}>
          <SubmitButton title="Save" />
        </Grid>
      </Grid>
    </LayoutForm>
  );
}
