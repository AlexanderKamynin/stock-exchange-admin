import React, { useState } from 'react';
import { HistoricalDataService } from "../services/historicalData.service.tsx"
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { Link, useParams } from "react-router-dom";


Chart.register(...registerables);

export function ViewHistoricalData() {
  const { historicalData } = HistoricalDataService();
  const { id } = useParams();

  const companyId = id ? parseInt(id) : -1;
  
  const companyHistory = historicalData[historicalData.map(data => {
    return data.id
  }).indexOf(companyId)];

  let xData = [];
  let yData = [];
  companyHistory?.stocks.map(stock => {
    xData.push(stock.date);
    yData.push(parseInt(stock.open));
  });
  xData.reverse();
  yData.reverse();

  //console.log(xData);
  //console.log(yData);

  const graphic = {
    labels: xData,
    datasets: [
      {
        label: companyHistory?.label,
        data: yData,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgb(75,192,108)"
      }
    ]
  };

  console.log(graphic);

  return (
    <>
      <Link to="http://localhost:3000/stocks">
        <button>Back</button>
      </Link>
      <div>
        <Line data={graphic}/>
      </div>
    </>
  )
}

