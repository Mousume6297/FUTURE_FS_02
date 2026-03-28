import React from "react";
import { Bar } from "react-chartjs-2";

function LeadsChart({ data }) {

  const chartData = {
    labels: data?.labels || ["New","Contacted","Converted"],
    datasets: [
      {
        label: "Leads",
        data: data?.values || [0,0,0],
        backgroundColor: ["#4e73df","#f6c23e","#1cc88a"]
      }
    ]
  };

  return(
    <div style={{height:"220px"}}>
      <Bar data={chartData}/>
    </div>
  );

}

export default LeadsChart;