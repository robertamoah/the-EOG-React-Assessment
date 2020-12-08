import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";

const options = {
  title: {
    display: true,
    text: "Live Info",
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 10000,
        },
      },
    ],
  },
};

const Graph = ({ metadata, cardData }) => {
  const [state, setstate] = useState("");
  const [stateDate, setstateDate] = useState("");

  const [current_time] = useState(new Date().valueOf());

  const GETMULTIPLEMULTIPLE = gql`
    query getMultipleMeasurements($input: [MeasurementQuery]) {
      getMultipleMeasurements(input: $input) {
        metric
        measurements {
          at
          value
          metric
          unit
        }
      }
    }
  `;

  const obj1 = [
    {
      metricName: "tubingPressure",
      after: current_time - 1800000,
      before: current_time,
    },
    {
      metricName: "casingPressure",
      after: current_time - 1800000,
      before: current_time,
    },
    {
      metricName: "oilTemp",
      after: current_time - 1800000,
      before: current_time,
    },
    {
      metricName: "waterTemp",
      after: current_time - 1800000,
      before: current_time,
    },
    {
      metricName: "injValveOpen",
      after: current_time - 1800000,
      before: current_time,
    },
  ];

  const { data, loading, error } = useQuery(GETMULTIPLEMULTIPLE, {
    variables: {
      input: obj1,
    },
  });

  const filterForChart = ({ getMultipleMeasurements }) => {
    let mainObject = {
      tubingPressure: {
        data: [],
        at: [],
        label: "tubingPressure",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },

      waterTemp: {
        data: [],
        at: [],
        label: "waterTemp",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },

      casingPressure: {
        data: [],
        at: [],
        label: "casingPressure",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },

      oilTemp: {
        data: [],
        at: [],
        label: "oilTemp",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },

      injValveOpen: {
        data: [],
        at: [],
        label: "injValveOpen",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
      },
    };

    getMultipleMeasurements.forEach((element) => {
      element.measurements.forEach((element) => {
        if (element.metric === "tubingPressure") {
          [element].filter((elementData) => {
            mainObject.tubingPressure.data.push(elementData.value);
          });
        } else if (element.metric === "waterTemp") {
          [element].filter((elementData) => {
            mainObject.waterTemp.data.push(elementData.value);
            mainObject.waterTemp.at.push(elementData.at);
          });
        } else if (element.metric === "casingPressure") {
          [element].filter((elementData) => {
            mainObject.casingPressure.data.push(elementData.value);
            mainObject.casingPressure.at.push(elementData.at);
          });
        } else if (element.metric === "oilTemp") {
          [element].filter((elementData) => {
            mainObject.oilTemp.data.push(elementData.value);
            mainObject.oilTemp.at.push(elementData.at);
          });
        } else if (element.metric === "injValveOpen") {
          [element].filter((elementData) => {
            mainObject.injValveOpen.data.push(elementData.value);
            mainObject.injValveOpen.at.push(elementData.at);
          });
        }
      });
    });
    setstate(Object.values({ ...mainObject }));
  };

  useEffect(() => {
    setstateDate(
      [...state].map((data) => moment(parseInt(data.at)).format("LT")),
    );
  }, [state]);
  useEffect(() => {
    if (data) {
      filterForChart(data);
    }
  }, [data, loading, error]);

  return (
    <>
      <Line
        data={{
          labels: stateDate,
          datasets: [...state],
        }}
        // width={10}
        // height={400}
        options={options}
      />
    </>
  );
};

export default Graph;
