import { useState } from "react";
import { apiCamera, apiHikvision, apiVivotek } from "../../../services";
import { toast } from "react-toastify";
import { Buffer } from "buffer";

const useHookFormCamera = () => {
  const submit = (
    values,
    resetForm,
    setDateInst,
    setDateBuy,
    setIdBrand,
    setIdAgency,
    setIdServer
  ) => {
    let pass = values.serialNumber + "|" + values.password;
    let bufferObj = Buffer.from(pass, "utf8");
    let base64Str = bufferObj.toString("base64");
    window.Buffer = window.Buffer || require("buffer").Buffer;
    values.password = base64Str;
    apiCamera.PostCamera(values).then((res) => {
      if (res.status === 400) {
        toast.warning(res.data);
      }
      if (res.status === 200) {
        updateNameDevice(values);
        toast("Registro Ingresado");
        setDateInst(null);
        setDateBuy(null);
        setIdBrand("");
        setIdAgency("");
        setIdServer("");
        resetForm();
      }
    });
  };

  const updateNameDevice = async (values) => {
    if (values.brandName === "Hikvision") {
      await apiHikvision.updateName(values).then((res) => {
        console.log(res);
      });
      await apiHikvision.updateNameOSD(values).then((res) => {
        console.log(res);
      });
    }
    if (values.brandName === "Vivotek") {
      await apiVivotek.SetName(values).then((res) => {});
      await apiVivotek.SetNameOSD(values).then((res) => {});
    }
  };

  return [submit];
};

export default useHookFormCamera;
