import React, { useState, useEffect } from "react";
import _ from "lodash";
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
        // stacked: true,
      },
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Graph = ({ liveData }) => {
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
      after: current_time - 18000,
      before: current_time,
    },
    {
      metricName: "casingPressure",
      after: current_time - 18000,
      before: current_time,
    },
    {
      metricName: "oilTemp",
      after: current_time - 18000,
      before: current_time,
    },
    {
      metricName: "waterTemp",
      after: current_time - 18000,
      before: current_time,
    },
    {
      metricName: "injValveOpen",
      after: current_time - 18000,
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
        borderWidth: 1,
      },
      waterTemp: {
        data: [],
        at: [],
        label: "waterTemp",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 1,
      },
      casingPressure: {
        data: [],
        at: [],
        label: "casingPressure",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
      oilTemp: {
        data: [],
        at: [],
        label: "oilTemp",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
      injValveOpen: {
        data: [],
        at: [],
        label: "injValveOpen",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 1,
      },
    };
    getMultipleMeasurements.forEach((element) => {
      element.measurements.forEach((element) => {
        if (element.metric === "tubingPressure") {
          [element].filter((elementData) => {
            mainObject.tubingPressure.data.push(elementData.value);
            mainObject.tubingPressure.at.push(elementData.at);
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
    console.log("already fetched", Object.values({ ...mainObject }));
  };

  useEffect(() => {
    let timeResult = [];
    [...state].map((data) => {
      timeResult.push(data.at);
    });

    const merged = [].concat.apply(
      [],
      timeResult.map((data) => [data].toString().split(",")),
    );

    merged.length = 13;
    const timeResultLast = merged.map((elem) =>
      moment.utc(elem, "HH:mm").toISOString(),
    );

    setstateDate(timeResultLast);
  }, [state]);

  // merge update data
  const updatedChart = (data) => {
    let mainObject = {
      tubingPressure: {
        data: [],
        at: [],
        label: "tubingPressure",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 1,
      },
      waterTemp: {
        data: [],
        at: [],
        label: "waterTemp",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 1,
      },
      casingPressure: {
        data: [],
        at: [],
        label: "casingPressure",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
      },
      oilTemp: {
        data: [],
        at: [],
        label: "oilTemp",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 1,
      },
      injValveOpen: {
        data: [],
        at: [],
        label: "injValveOpen",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderWidth: 1,
      },
    };

    data.forEach((element) => {
      if (element.metric === "tubingPressure") {
        [element].filter((elementData) => {
          mainObject.tubingPressure.data.push(elementData.value);
          mainObject.tubingPressure.at.push(elementData.at);
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

    let filterNoData = [];

    const main1 = [mainObject].map((data) => {
      [data].forEach((data) => {
        const objkey1 = Object.values(data);

        let objkey2 = objkey1.forEach((data) => {
          if (data.data.length === 0) {
            // return "false";
          } else if (data.data.length > 0) {
            // return "yess";
            filterNoData.push(data);
          }
        });
      });
    })[0];

    // djfuos[ahibuioajbldk;saknlbjkljkbljslabjds]
    let dataFilterMerger = [...state, ...[...filterNoData]];

    const origArr = [...state];
    const updatingArr = filterNoData;

    var merge = _.chain(origArr)
      .zip(updatingArr)
      .map(function(item) {
        return _.merge.apply(null, item);
      })
      .value();
  };

  useEffect(() => {
    if (data) {
      filterForChart(data);
    }
  }, [data, loading, error]);

  useEffect(() => {
    updatedChart(liveData);
  }, [liveData, data]);

  return (
    <>
      <Line
        data={{
          labels: stateDate,
          datasets: [...state],
        }}
        options={options}
      />
    </>
  );
};

export default Graph;
