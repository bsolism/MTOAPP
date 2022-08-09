import { state } from "react";
import { apiServer, apiHikvision } from "../../../services";
import { toast } from "react-toastify";

const useHookFormServer = () => {
  const submit = (values) => {
    apiServer.PostServer(values).then((res) => {
      if (res.status === 400) {
        toast.warning(res.data);
      }
      if (res.status === 200) {
        updateNameDevice(values);
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
