import { useState, useEffect } from "react";
import { apiServer, apiHikvision } from "../../services";

const useHookServer = (setDataRow) => {
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
      dataRes.map(async (res, index) => {
        dataRes[index].row = index + 1;
        if (res.brandId === 1) {
          const data = {
            ipAddress: res.ipAddress,
            name: res.user,
            password: res.password,
          };
          await apiHikvision.GetDayPlayback(data).then((resp) => {
            if (resp.status === 200) {
              if (dataRes[index].engravedDays !== parseInt(resp.data.content)) {
                dataRes[index].engravedDays = parseInt(resp.data.content);
                apiServer.PutSever(dataRes[index]).then((res) => {});
              }
            }
          });
        }

        return res;
      });
      setData(dataRes);
      setDataRow(dataRes);
    }
  };
  return [data, getData, setData];
};

export default useHookServer;
