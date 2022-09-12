import React, { useState } from "react";
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

export default function DetailServer({ item, handleClose, data, setData }) {
  const [newValueDate, setNewValueDate] = useState();
  const [dateInst, setDateInst] = useState(item[0].fechaInstalacion);
  const [dateBuy, setDateBuy] = useState(item[0].fechaCompra);
  const [dateDevice, setDateDevice] = useState(null);
  const [submit] = useHookDetailServer(data, setData, item[0], setDateDevice);

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
        <Grid item xs={6}>
          <Text name="nombre" label="Nombre" />
          <Text name="modelo" label="Modelo" />
          <Text name="user" label="Usuario" />
          <Text name="ipAddress" label="IP" />
          <Text name="serialNumber" label="Serial" />
          <Text name="assetId" label="ActiveNumber" />
          <Text name="ubicacion" label="Ubicación" />
          <Text name="sataInstalado" label="HDD Instalado" />
          <Text
            label="Total de Cámaras"
            value={item[0].cameras !== null ? item[0].cameras.length : 0}
          />
          <PickerDate
            name="fechaCompra"
            label="Buy Date"
            value={dateBuy}
            setValue={setDateBuy}
          />
        </Grid>
        <Grid item xs={6}>
          <FieldSelect type="brand" id={item[0].brandId} />
          <Text name="type" label="Tipo" />
          <Text name="password" label="Password" type="password" />
          <Text name="mac" label="Mac" />
          <Text name="deviceId" label="Device Id" />
          <Text name="firmwareVersion" label="Firmware" />
          <Text name="engravedDays" label="Dias Grabados" />
          <Text name="capacidadSataInstalado" label="Tamaño HDD (TB)" />
          <Text name="nota" label="Observaciones" />
          <PickerDate
            name="fechaInstalacion"
            label="Installation Date"
            value={dateInst}
            setValue={setDateInst}
          />
        </Grid>
        <Grid item xs={3} display="flex" alignContent="baseline">
          <PickerDate
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
