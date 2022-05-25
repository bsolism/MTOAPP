import React, { useState, useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = [100, 200, 300, 400, 500, 600, 700];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};
export default function LineChart({ dataSource }) {
  const [bueno, setBueno] = useState(0);
  const [malo, setMalo] = useState(0);
  const data = {
    datasets: [
      {
        label: "Buenas",
        data: [7, 16],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Malas",
        data: [1, 2],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
    labels: ["3era ", "Procahsa"],
  };

  useEffect(() => {
    const good = dataSource.filter((camera) => camera.isGoodCondition == 1);
    const bad = dataSource.filter((camera) => camera.isGoodCondition == 0);
    setBueno(good.length);
    setMalo(bad.length);
  }, [dataSource]);
  const datas = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
      ],
      labels,
    };
  }, []);
  return <Bar data={data} />;
}
