import { useState } from "react";
import { apiCamera } from "../../services";

const useHookCamera = (setDataRow) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    await apiCamera.GetCamera().then((res) => {
      if (res.status === 200) {
        res.data.map((value, index) => {
          res.data[index].row = index + 1;
          setData(res.data);
          setDataRow(res.data);
          return value;
        });

        //setData(res.data);
      }
    });
  };

  return [data, getData, setData];
};

export default useHookCamera;
