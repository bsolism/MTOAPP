import React from "react";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "chart.piecelabel.js";
import useHookPieChart from "./Hook/useHookPieChart";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

export default function PieChart({ dataSource }) {
  const [bueno, malo] = useHookPieChart(dataSource);
  const data = {
    datasets: [
      {
        data: [bueno, malo],
        backgroundColor: ["rgba(53, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
      },
    ],

    labels: ["Bueno " + bueno, "Malo " + malo],
  };

  return <Pie data={data} />;
}
