import { useState, useEffect } from "react";

const useHookBarChart = (dataSource) => {
  const [bueno, setBueno] = useState([]);
  const [malo, setMalo] = useState([]);
  const [agencia, setAgencia] = useState([]);

  useEffect(() => {
    handleData();
  }, [dataSource]);

  const handleData = () => {
    setAgencia([]);
    setBueno([]);
    setMalo([]);
    dataSource.map((res) => {
      setAgencia((agencia) => [...agencia, res.nombre]);

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

  return [bueno, malo, agencia];
};

export default useHookBarChart;
