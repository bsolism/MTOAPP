import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const score = [30, 5];
const label = ["Bueno", "Malo"];
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function Pie() {
  const data = useMemo(function () {
    return {
      dataset: [
        {
          label: "Mis Datos",
          data: score,
        },
      ],
      label,
    };
  }, []);
  return <Line data={data} options={options} />;
}
