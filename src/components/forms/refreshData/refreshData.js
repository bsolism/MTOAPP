import React, { useState } from "react";
import { IconButton, Stack } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { useFormikContext } from "formik";
import { apiPanasonic, apiHikvision, apiVivotek } from "../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";

export default function RefreshData({ source, item }) {
  const [data, setData] = useState({});
  const { setFieldValue, values } = useFormikContext();

  const handleSync = async () => {
    const credential = {
      ipAddress: item.ipAddress,
      name: item.user,
      password: item.password,
    };
    if (item.brand.name === "Hikvision") {
      await apiHikvision.GetInfo(credential).then((res) => {
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }
        if (res) {
          var xmlData = new XMLParser().parseFromString(res.data);

          xmlData.children.map((x) => {
            if (x.name === "deviceName") {
              setFieldValue("name", x.value);
            }
            if (x.name === "deviceType") {
              setFieldValue("type", x.value);
            }
            if (x.name === "model") {
              setFieldValue("model", x.value);
            }
            if (x.name === "macAddress") {
              setFieldValue("mac", x.value);
            }
            if (x.name === "deviceID") {
              setFieldValue("deviceId", x.value);
            }

            if (x.name === "serialNumber") {
              setFieldValue("serialNumber", x.value);
            }
            if (x.name === "firmwareVersion") {
              setFieldValue("firmwareVersion", x.value);
            }
          });
        }
      });
    }
    if (values.brand.name === "Vivotek") {
      await apiVivotek.GetInfo(credential).then((res) => {
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }

        if (res) {
          const jsonTest = res.data.replaceAll("=", ":");
          const jsonEnd = jsonTest.split(/\r?\n/);

          if (jsonEnd.length > 0) {
            for (const [index, value] of jsonEnd.entries()) {
              if (index < 29) {
                var res = value.split(":");
                var res2 = res[1].split("'");
                data[res[0]] = res2[1];
              }
            }
            setFieldValue("name", data.system_hostname);
            setFieldValue("type", "IPCamera");
            setFieldValue("deviceId", "n/a");
            setFieldValue("deviceDescription", "n/a");
            setFieldValue("model", data.system_info_modelname);
            setFieldValue("serialNumber", data.system_info_serialnumber);
            setFieldValue("mac", data.system_info_serialnumber);
            setFieldValue("firmwareVersion", data.system_info_firmwareversion);
          }
        }
      });
    }
    if (values.brand.name === "Panasonic") {
      await apiPanasonic.GetInfo(credential).then((res) => {
        if (res.status === 404) return toast.warning(res.data);
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }
        if (res.status === 200) {
          setFieldValue("name", res.data.name);
          setFieldValue("type", "IPCamera");
          setFieldValue("deviceId", "n/a");
          setFieldValue("deviceDescription", "Mini PTZ");
          setFieldValue("model", res.data.model);
          setFieldValue(
            "serialNumber",
            res.data.serialNumber ? res.data.serialNumber : res.data.mac
          );
          setFieldValue("mac", res.data.mac);
          setFieldValue(
            "firmwareVersion",
            res.data.firmware ? res.data.firmware : "n/a"
          );
        }
      });
    }
  };
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="refresh" onClick={handleSync}>
        <SyncIcon />
      </IconButton>
    </Stack>
  );
}
