import { apiCamera, apiHikvision } from "../../../services";
import { toast } from "react-toastify";

const useHookFormCamera = () => {
  const submit = (values, resetForm) => {
    apiCamera.PostCamera(values).then((res) => {
      if (res.status === 400) {
        toast.warning(res.data);
      }
      if (res.status === 200) {
        updateNameDevice(values);
        toast("Registro Ingresado");
        resetForm();
      }
    });
  };

  const updateNameDevice = async (values) => {
    const data = {
      ipAddress: values.ipAddress,
      name: values.user,
      password: values.password,
      nameDevice: values.name,
    };
    console.log(data);
    await apiHikvision.updateName(data).then((res) => {
      console.log(res);
    });
  };

  return [submit];
};

export default useHookFormCamera;
