import React from "react";
import { IconButton, Stack } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import { useFormikContext } from "formik";
import { apiDeviceInfo } from "../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";

export default function RefreshContent({ item }) {
  const { setFieldValue, values } = useFormikContext();
  console.log(item);

  const handleSync = async () => {
    const credential = {
      ipAddress: item.ipAddress,
      name: item.user,
      password: item.password,
    };
    if (item.brand.name === "Hikvision") {
      await apiDeviceInfo.GetCameraInfoHik(credential).then((res) => {
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }
        if (res) {
          var xmlData = new XMLParser().parseFromString(res.data);

          xmlData.children.map((x) => {
            if (x.name === "deviceName") {
              setFieldValue("nombre", x.value);
            }
            if (x.name === "deviceType") {
              setFieldValue("type", x.value);
            }
            if (x.name === "model") {
              setFieldValue("modelo", x.value);
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
  };
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="refresh" onClick={handleSync}>
        <SyncIcon />
      </IconButton>
    </Stack>
  );
}
