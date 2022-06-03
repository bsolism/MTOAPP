import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useFormikContext } from "formik";
import XMLParser from "react-xml-parser";
import apiDeviceInfo from "../../../services/apiDeviceInfo";
import ModalLottie from "../../modal/ModalLottie";

import "./Button.scss";

export default function FormButton({ source, press, toast, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const testConection = async () => {
    handleOpen();
    setFieldValue("name", "");
    setFieldValue("type", "");
    setFieldValue("model", "");
    setFieldValue("mac", "");
    setFieldValue("deviceId", "");
    if (source === "camera") setFieldValue("deviceDescription", "");
    setFieldValue("serialNumber", "");
    setFieldValue("firmwareVersion", "");

    var cred = {
      name: values.user,
      ipAddress: values.ipAddress,
      password: values.password,
      brand: values.brandId,
    };

    if (cred.brand === 5) {
      await apiDeviceInfo.GetCameraInfoHik(cred).then((res) => {
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }
        if (res) {
          var xmlData = new XMLParser().parseFromString(res.data);

          setValue(xmlData);
        }
      });
    }
    if (cred.brand === 11) {
      await apiDeviceInfo.GetCameraInfoViv(cred).then((res) => {
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
            setValue(data);
          }
        }
      });
    }
    handleClose();
  };
  const setValue = (xmlData) => {
    if (values.brandId === 5) {
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
        if (x.name === "deviceDescription") {
          setFieldValue("deviceDescription", x.value);
        }
        if (x.name === "serialNumber") {
          setFieldValue("serialNumber", x.value);
        }
        if (x.name === "firmwareVersion") {
          setFieldValue("firmwareVersion", x.value);
        }
      });
    }
    if (values.brandId === 11) {
      setFieldValue("name", xmlData.system_hostname);
      setFieldValue("type", "IPCamera");
      setFieldValue("deviceId", "n/a");
      setFieldValue("deviceDescription", "n/a");
      setFieldValue("model", xmlData.system_info_modelname);
      setFieldValue("serialNumber", xmlData.system_info_serialnumber);
      setFieldValue("mac", xmlData.system_info_serialnumber);
      setFieldValue("firmwareVersion", xmlData.system_info_firmwareversion);
    }

    // press = false;
  };

  return (
    <>
      <div className="button">
        <Button
          style={{ width: "25%" }}
          onClick={testConection}
          {...otherProps}
        >
          Probar Conección
        </Button>
      </div>
      <ModalLottie open={open} handleClose={handleClose} />
    </>
  );
}
