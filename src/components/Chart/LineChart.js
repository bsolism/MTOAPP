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
  responsive: true,
  scale: {
    y: {
      ticks: {
        max: 100,
        stepSize: 10,
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart({ dataSource }) {
  const [bueno, setBueno] = useState([]);
  const [malo, setMalo] = useState([]);
  const [agencia, setAgencia] = useState([]);

  useEffect(() => {
    setAgencia([]);
    setBueno([]);
    setMalo([]);
    dataSource.map((res) => {
      setAgencia((agencia) => [...agencia, res.nombre]);

      let count = 0;
      let count2 = 0;
      const good = res.cameras.filter(
        (camera) => camera.isGoodCondition === true
      );
      const bad = res.cameras.filter(
        (camera) => camera.isGoodCondition === false
      );
      count = count + good.length;
      count2 = count2 + bad.length;

      setBueno((bueno) => [...bueno, count]);
      setMalo((malo) => [...malo, count2]);
    });
  }, [dataSource]);

  const data = {
    datasets: [
      {
        label: "Buenas",
        data: bueno,
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
      {
        label: "Malas",
        data: malo,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
    ],
    labels: agencia,
  };

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
  return <Bar data={data} options={options} width={"30%"} height={"30%"} />;
}
