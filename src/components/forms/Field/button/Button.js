import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useFormikContext } from "formik";
import XMLParser from "react-xml-parser";
import { apiPanasonic, apiVivotek, apiHikvision } from "../../../../services";
import ModalLottie from "../../../modal/ModalLottie";
import EncrypPass from "../../../../helper/EncrypPass/EncrypPass";

import "./Button.scss";

export default function FormButton({
  source,
  toast,
  setOnLine,
  ...otherProps
}) {
  const { setFieldValue, values } = useFormikContext();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [passEncryp] = EncrypPass();

  const testConection = async () => {
    handleOpen();
    var cred = {
      name: values.user,
      ipAddress: values.ipAddress,
      password: passEncryp(values.serialNumber, values.password),
    };

    if (values.brandName === "Hikvision") {
      await apiHikvision.GetInfo(cred).then((res) => {
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }
        if (res) {
          var xmlData = new XMLParser().parseFromString(res.data);
          setValue(xmlData);
          if (source !== "camera") {
            apiHikvision.GetDayPlayback(cred).then((res) => {
              console.log(res);
              if (res.status === 200) {
                setFieldValue("engravedDays", res.data.content);
              }
            });
          }
        }
      });
    }
    if (values.brandName === "Vivotek") {
      await apiVivotek.GetInfo(cred).then((res) => {
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }

        if (res) {
          var jsonTest = '"' + res.data.replaceAll("'", '"');
          var json2 = jsonTest.replaceAll("=", '":');

          const jsonEnd = json2.split(/\r?\n/);
          if (jsonEnd.length > 0) {
            var values = {
              system_hostname: "",
              system_info_modelname: "",
              system_info_serialnumber: "",
              system_info_firmwareversion: "",
            };
            for (const [index, value] of jsonEnd.entries()) {
              if (index < 29) {
                var res = value.split(":");
                var res2 = res[1].split("'");
                var prop = res[0].replaceAll('"', "");
                var val = res2[0].replaceAll('"', "");
                if (prop === "system_hostname") values.system_hostname = val;
                if (prop === "system_info_modelname")
                  values.system_info_modelname = val;
                if (prop === "system_info_serialnumber")
                  values.system_info_serialnumber = val;
                if (prop === "system_info_firmwareversion")
                  values.system_info_firmwareversion = val;
              }
            }
            setValue(values);
          }
        }
      });
    }
    if (values.brandName === "Panasonic") {
      var data = "";
      await apiPanasonic.GetInfo(cred).then((res) => {
        console.log(res);
        if (res.status === 404) return toast.warning(res.data);
        if (res.status === 401) return toast.warning(res.data);
        if (res.status === 500) {
          return toast.warning("No se estableció conexión");
        }
        if (res.status === 200) {
          data = res.data;
        }
      });

      setValue(data);
    }
    handleClose();
  };
  const setValue = (xmlData) => {
    console.log(values);
    console.log(xmlData);
    if (values.brandName === "Hikvision") {
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
    if (values.brandName === "Vivotek") {
      setFieldValue("name", xmlData.system_hostname);
      setFieldValue("type", "IPCamera");
      setFieldValue("deviceId", "n/a");
      setFieldValue("deviceDescription", "n/a");
      setFieldValue("model", xmlData.system_info_modelname);
      setFieldValue("serialNumber", xmlData.system_info_serialnumber);
      setFieldValue("mac", xmlData.system_info_serialnumber);
      setFieldValue("firmwareVersion", xmlData.system_info_firmwareversion);
    }
    if (values.brandName === "Panasonic") {
      setFieldValue("name", xmlData.name);
      setFieldValue("type", "IPCamera");
      setFieldValue("deviceId", "n/a");
      setFieldValue("deviceDescription", "Mini PTZ");
      setFieldValue("model", xmlData.model);
      setFieldValue(
        "serialNumber",
        xmlData.serialNumber ? xmlData.serialNumber : xmlData.mac
      );
      setFieldValue("mac", xmlData.mac);
      setFieldValue(
        "firmwareVersion",
        xmlData.firmware ? xmlData.firmware : "n/a"
      );
    }
    setFieldValue("onLine", true);
    setOnLine(true);
  };

  return (
    <>
      <div>
        <Button onClick={testConection} {...otherProps}>
          Connection Test
        </Button>
      </div>
      <ModalLottie open={open} handleClose={handleClose} />
    </>
  );
}
