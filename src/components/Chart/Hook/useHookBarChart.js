import { useState, useEffect } from "react";

const useHookBarChart = (dataSource) => {
  const [bueno, setBueno] = useState([]);
  const [malo, setMalo] = useState([]);
  const [agency, setAgency] = useState([]);

  useEffect(() => {
    handleData();
  }, [dataSource]);

  const handleData = () => {
    setAgency([]);
    setBueno([]);
    setMalo([]);
    if (dataSource.length === 0) return;
    dataSource.map((res) => {
      setAgency((agency) => [...agency, res.name]);

      let count = 0;
      let count2 = 0;
      const good = res.cameras.filter((camera) => camera.online === true);
      const bad = res.cameras.filter((camera) => camera.online === false);
      count = count + good.length;
      count2 = count2 + bad.length;

      setBueno((bueno) => [...bueno, count]);
      setMalo((malo) => [...malo, count2]);
    });
  };

  return [bueno, malo, agency];
};

export default useHookBarChart;
