import React from "react";
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
import useHookBarChart from "./Hook/useHookBarChart";

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

export default function BarChart({ dataSource }) {
  const [bueno, malo, agency] = useHookBarChart(dataSource);

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
    labels: agency,
  };
  return <Bar data={data} options={options} width={"30%"} height={"30%"} />;
}
