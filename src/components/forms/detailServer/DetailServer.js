import React, { useState } from "react";
import { Grid } from "@mui/material";
import SwitchField from "../field/SwitchField";
import DatePickerField from "../field/DatePickerField";
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
  const [submit] = useHookDetailServer(data, setData);

  const handleSubmit = (values) => {
    submit(values);
    handleClose();
  };

  return (
    <LayoutForm item={item[0]} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RefreshData item={item[0]} />
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
          <Text label="Total de Cámaras" value={item[0].cameras.length} />
          <DatePickerField
            id="buy"
            label="Date Buys"
            dateValue={item[0].fechaCompra}
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
          <DatePickerField
            id="installation"
            label="Installation Date"
            dateValue={item[0].fechaInstalacion}
          />
        </Grid>
        <Grid item xs={3} display="flex" alignContent="baseline">
          <DatePickerField
            id="dateLive"
            label="Fecha y hora Dispositivo"
            dateValue={newValueDate}
            setNewValueDate={setNewValueDate}
            format="yyyy-MM-dd HH:mm:ss"
            mask="____-__-__ __:__:__"
            item={item[0]}
          />
        </Grid>
        <Grid item xs={3} display="flex" justifyContent="flex-end">
          <CheckboxField
            label="Sinc"
            item={item[0]}
            setNewValueDate={setNewValueDate}
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end">
          <SwitchField label="En Linea" value={item[0].isGoodCondition} />
        </Grid>
        <Grid item xs={6}>
          <SubmitButton title="Save" />
        </Grid>
      </Grid>
    </LayoutForm>
  );
}
