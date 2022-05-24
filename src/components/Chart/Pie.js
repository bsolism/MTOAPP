import React, { useState, useEffect } from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

export default function PieChart({ dataSource }) {
  const [bueno, setBueno] = useState(0);
  const [malo, setMalo] = useState(0);
  const data = {
    datasets: [
      {
        data: [bueno, malo],
        backgroundColor: ["blue", "red"],
      },
    ],
    labels: ["Bueno " + bueno, "Malo " + malo],
  };

  useEffect(() => {
    const good = dataSource.filter((camera) => camera.isGoodCondition == 1);
    const bad = dataSource.filter((camera) => camera.isGoodCondition == 0);
    setBueno(good.length);
    setMalo(bad.length);
  }, [dataSource]);

  return <Pie data={data} />;
}
