import { useState, useEffect } from "react";
import { apiHikvision } from "../../services";

const useHookAgencyDetail = (data) => {
  const [cam, setCam] = useState(data[0].cameras);
  const [dataCam, setDataCam] = useState([]);
  const [server, setServer] = useState([]);
  useEffect(() => {
    setData();
  }, []);
  const setData = async () => {
    data[0].cameras.map((res, index) => {
      setCam((cam) => [...cam, (cam[index].row = index + 1)]);

      return res;
    });
    setDataCam(cam);
    data[0].srvAg.map((res, index) => {
      var item = res.server;
      item.row = index + 1;
      if (item.brandId === 1) {
        const data = {
          ipAddress: item.ipAddress,
          name: item.user,
          password: item.password,
        };
        apiHikvision.GetDayPlayback(data).then((res) => {
          if (res.status === 200) {
            item.engravedDays = res.data.content;
          }
        });
      }
      setServer((server) => [...server, item]);

      return res;
    });
  };

  return [dataCam, setDataCam, server, setServer];
};
export default useHookAgencyDetail;
