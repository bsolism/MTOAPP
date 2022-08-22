import { useState, useEffect } from "react";
import { apiServer, apiHikvision } from "../../services";

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
        if (res.brandId === 1) {
          const data = {
            ipAddress: res.ipAddress,
            name: res.user,
            password: res.password,
          };
          apiHikvision.GetDayPlayback(data).then((resp) => {
            if (resp.status === 200) {
              dataRes[index].engravedDays = resp.data.content;
            }
          });
        }

        return res;
      });
      setData(dataRes);
    }
  };
  return [data, setData];
};

export default useHookServer;
