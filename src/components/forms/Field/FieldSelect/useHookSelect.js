import { useState, useEffect } from "react";
import { apiBrand, apiServer, apiAgency } from "../../../../services";
import { useFormikContext } from "formik";

const useHookSelect = (type, setId) => {
  const [source, setSource] = useState([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (type === "brand") {
      await apiBrand.GetBrand().then((resp) => {
        setSource(resp.data);
      });
    } else if (type === "server") {
      await apiServer.GetServer().then((resp) => {
        setSource(resp.data);
      });
    } else if (type === "agency") {
      await apiAgency.GetAgency().then((resp) => {
        setSource(resp.data);
      });
    }
  };
  const handleChange = (event) => {
    const name = source.filter((res) => res.id === event.target.value);
    setId(event.target.value);

    if (type === "server") {
      setFieldValue("serverId", event.target.value);
      setFieldValue("server", name[0]);
    }
    if (type === "agency") setFieldValue("agencyId", event.target.value);
    if (type === "brand") {
      setFieldValue("brandName", name[0].name);
      setFieldValue("brandId", event.target.value);
    }
  };

  return [source, handleChange];
};

export default useHookSelect;
