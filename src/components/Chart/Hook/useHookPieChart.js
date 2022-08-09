import { useState, useEffect } from "react";

const useHookPieChart = (dataSource) => {
  const [bueno, setBueno] = useState(0);
  const [malo, setMalo] = useState(0);

  useEffect(() => {
    const good = dataSource.filter((camera) => camera.online === true);
    const bad = dataSource.filter((camera) => camera.online === false);
    setBueno(good.length);
    setMalo(bad.length);
  }, [dataSource]);

  return [bueno, malo];
};

export default useHookPieChart;
