import { fontSize } from '@material-ui/system';
import React, { useState } from 'react';
import { Bar, Line, Pie } from "react-chartjs-2"

const Graph = () => {

  const [state, setstate] = useState({
    chartData: {
      labels: [
        "boston", "worcester"
      ],
      datasets: [
        {
          lable: "Population", data: [
            322132,
            23432432

          ],
          backgroundColor: [
            "rgba(255, 99, 132 ,0.6)",
            "rgba(155, 99, 132 ,0.6)"
          ]

        }
      ]
    }
  })

  return (
    <>
      <Line data={state.chartData}
        options={{

          tile: {
            display: true,
            text: "mainWeather",
            fontSize: 25
          },
          legend: {
            dispaly: true,
            position: "right"
          }
        }}
      />
    </>
  );
}


export default Graph;