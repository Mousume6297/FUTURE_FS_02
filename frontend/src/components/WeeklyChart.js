import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WeeklyChart({ data }) {

  const chartData = {
    labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    datasets: [
      {
        label: "Leads",
        data: data || [0,0,0,0,0,0,0],
        backgroundColor: [
          "#ff7a18",
          "#ffd200",
          "#ff4e50",
          "#8e2de2",
          "#00c9ff",
          "#00b09b",
          "#4facfe"
        ],
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{height:"220px"}}>
      <Bar data={chartData} options={options}/>
    </div>
  );

}

export default WeeklyChart;