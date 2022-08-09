import { useState, useEffect } from "react";
import { apiBrand, apiServer, apiAgency } from "../../../../services";
import { useFormikContext } from "formik";

const useHookSelect = (type, id) => {
  const [source, setSource] = useState([]);
  const [data, setData] = useState(id);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (type === "brand") {
      await apiBrand.GetBrand().then((resp) => {
        setSource(resp.data);
      });
    }
    if (type === "server") {
      await apiServer.GetServer().then((resp) => {
        setSource(resp.data);
      });
    }
    if (type === "agency") {
      await apiAgency.GetAgency().then((resp) => {
        setSource(resp.data);
      });
    }
  };
  const handleChange = (event) => {
    const name = source.filter((res) => res.id === event.target.value);
    setData(event.target.value);
    if (type === "server") {
      setFieldValue("serverId", event.target.value);
      setFieldValue("server", name[0]);
    }
    if (type === "agency") setFieldValue("agenciaId", event.target.value);
    if (type === "brand") {
      setFieldValue("brandName", name[0].name);
      setFieldValue("brandId", event.target.value);
    }
  };

  return [source, data, handleChange];
};

export default useHookSelect;
