import { toast } from "react-toastify";
import { apiHikvision, apiServer } from "../../../services";
import _ from "lodash";
import EncrypPass from "../../../helper/EncrypPass/EncrypPass";

const useHookDetailServer = (data, setData, item) => {
  const [passEncryp] = EncrypPass();

  const submit = async (values) => {
    if (!_.isEqual(values, item)) {
      updateNameDevice(values, item);
      if (item.password !== values.password) {
        values.password = passEncryp(values.serialNumber, values.password);
      }
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
    }
  };

  const updateNameDevice = async (values, item) => {
    if (item.nombre !== values.nombre) {
      const data = {
        ipAddress: values.ipAddress,
        name: values.user,
        password: values.password,
        nameDevice: values.nombre,
      };
      await apiHikvision.updateName(data).then((res) => {});
    }
  };
  return [submit];
};

export default useHookDetailServer;
