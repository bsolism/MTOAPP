import { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { apiHikvision } from "../../../../services";
import { toast } from "react-toastify";
import XMLParser from "react-xml-parser";

const useHookDate = (id, dateValue, setNewValueDate, item) => {
  const [value, setValue] = useState(dateValue);
  const [dateDevice, setDateDevice] = useState();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    getDateDevice();
  }, []);

  useEffect(() => {
    setValue(dateValue);
  }, [dateValue]);

  const handleChange = (value) => {
    setValue(value);
    if (id === "buy") setFieldValue("dateBuy", value);
    if (id === "installation") setFieldValue("dateInstallation", value);
  };
  const getDateDevice = async () => {
    if (item !== undefined) {
      if (item.brandId === 1) {
        const credential = {
          ipAddress: item.ipAddress,
          name: item.user,
          password: item.password,
        };
        await apiHikvision.GetTime(credential).then((res) => {
          if (res.status === 500) toast.warning("no se pudo sincronizar");
          if (res.status === 200) {
            var xmlData = new XMLParser().parseFromString(res.data);
            xmlData.children.map((x) => {
              if (x.name === "localTime") {
                setValue(x.value);
                setDateDevice(x.value);
                setNewValueDate(x.value);
              }
            });
          }
        });
      }
    }
  };

  return [value, handleChange];
};

export default useHookDate;
