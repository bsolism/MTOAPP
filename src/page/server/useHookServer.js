import { useState, useEffect } from "react";
import apiServer from "../../services/apiServer";

const useHookServer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var dataRes = null;
    await apiServer.GetServer().then((res) => {
      dataRes = res.data;
    });
    if (dataRes !== null) {
      dataRes.map((res, index) => {
        dataRes[index].row = index + 1;
        return res;
      });
      setData(dataRes);
    }
  };
  return [data, setData];
};

export default useHookServer;
