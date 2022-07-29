import { useState, useEffect } from "react";

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
    });

    setDataCam(cam);
    data[0].srvAg.map((res, index) => {
      var item = res.server;
      item.row = index + 1;
      setServer((server) => [...server, item]);
    });
  };

  return [dataCam, server, setData];
};
export default useHookAgencyDetail;
