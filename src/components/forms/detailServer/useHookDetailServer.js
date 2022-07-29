import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  apiBrand,
  apiHikvision,
  apiServer,
  apiDeviceInfo,
} from "../../../services";

const useHookDetailServer = (data, setData) => {
  const submit = async (values) => {
    updateNameDevice(values);
    await apiServer.PutSever(values).then((res) => {
      if (res === undefined) toast.warning("Update error");
      if (res.status === 200) {
        data.map((val, index) => {
          if (val.id === values.id) {
            let newArr = [...data];
            values.row = index + 1;
            newArr[index] = values;
            setData(newArr);
          }
        });

        toast("Update Complete");
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

export default useHookDetailServer;
