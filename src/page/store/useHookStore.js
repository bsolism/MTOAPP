import { useState, useEffect } from "react";
import apiService from "../../services/apiAgency";

const useHookStore = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var dataResp = null;
    await apiService.GetAgency().then((res) => {
      dataResp = res.data;
    });
    if (dataResp !== null) {
      dataResp.map((ag, index) => {
        dataResp[index].row = index + 1;
        return ag;
      });
    }

    setData(dataResp);
  };
  return [data];
};

export default useHookStore;
