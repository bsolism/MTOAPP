import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useFormikContext } from "formik";
import XMLParser from "react-xml-parser";
import apiDeviceInfo from "../../../services/apiDeviceInfo";

import "./Button.scss";

export default function FormButton({ source, press, ...otherProps }) {
  const { setFieldValue, values } = useFormikContext();
  const [xml, setXml] = useState({
    children: [],
  });
  const [dataText, setDataText] = useState({
    name: "",
    model: "",
    serialNumber: "",
    mac: "",
    firmwareVersion: "",
  });
  const [data, setData] = useState({});

  useEffect(() => {
    setValue();
  }, [xml, dataText]);

  const setValue = () => {
    if (values.brandId === 5) {
      xml.children.map((x) => {
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
      setFieldValue("name", dataText.system_hostname);
      setFieldValue("model", dataText.system_info_modelname);
      setFieldValue("serialNumber", dataText.system_info_serialnumber);
      setFieldValue("mac", dataText.system_info_serialnumber);
      setFieldValue("firmwareVersion", dataText.system_info_firmwareversion);
    }

    press = false;
  };

  const testConection = async () => {
    setFieldValue("name", "");
    setFieldValue("type", "");
    setFieldValue("model", "");
    setFieldValue("mac", "");
    setFieldValue("deviceId", "");
    setFieldValue("deviceDescription", "");
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
        if (res) {
          var xmlData = new XMLParser().parseFromString(res.data);

          setXml(xmlData);
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
            setDataText(data);
          }
        }
      });
    }
    setValue();
  };

  return (
    <div className="button">
      <Button style={{ width: "25%" }} onClick={testConection} {...otherProps}>
        Probar Conección
      </Button>
    </div>
  );
}
