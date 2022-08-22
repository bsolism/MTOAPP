import { state } from "react";
import { apiServer, apiHikvision } from "../../../services";
import { toast } from "react-toastify";
import { Buffer } from "buffer";

const useHookFormServer = () => {
  const submit = (values, setIdBrand) => {
    let pass = values.password + "|" + values.serialNumber;
    let bufferObj = Buffer.from(pass, "utf8");
    let base64Str = bufferObj.toString("base64");
    window.Buffer = window.Buffer || require("buffer").Buffer;
    values.password = base64Str;
    apiServer.PostServer(values).then((res) => {
      if (res.status === 400) {
        toast.warning(res.data);
      }
      if (res.status === 200) {
        updateNameDevice(values);
        setIdBrand("");
        toast("Registro Ingresado");
      }
    });
  };

  const updateNameDevice = async (values) => {
    const data = {
      ipAddress: values.ipAddress,
      name: values.user,
      password: values.password,
      nameDevice: values.nombre,
    };
    await apiHikvision.updateName(data).then((res) => {});
  };

  return [submit];
};

export default useHookFormServer;
