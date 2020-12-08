import React, { Fragment, useState, useEffect } from "react";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Selector from "../components/Selector";
import Graph from "../components/Graph";
import Card from "../components/Card";
import { Row, Container } from "react-bootstrap";
import { gql, useSubscription } from "@apollo/client";

const DashBoard = () => {
  // Lamda funtion from Card Component
  const [selected, setSelected] = useState([]);

  // Keeps track of NewMeasurement
  const [filteredPolling, setFilteredPolling] = useState([]);

  const GETNEWMEASUREMENT = gql`
    subscription {
      newMeasurement {
        metric
        value
        unit
        at
      }
    }
  `;

  const { data } = useSubscription(GETNEWMEASUREMENT);

  const clonefilter = ({ newMeasurement }) => {
    if (newMeasurement.metric === "oilTemp") {
      setFilteredPolling([{ ...newMeasurement }]);
    } else if (newMeasurement.metric === "tubingPressure") {
      setFilteredPolling([newMeasurement, ...filteredPolling]);
    } else if (newMeasurement.metric === "casingPressure") {
      setFilteredPolling([newMeasurement, ...filteredPolling]);
    } else if (newMeasurement.metric === "waterTemp") {
      setFilteredPolling([newMeasurement, ...filteredPolling]);
    } else if (newMeasurement.metric === "injValveOpen") {
      setFilteredPolling([newMeasurement, ...filteredPolling]);
    } else if (newMeasurement.metric === "flareTemp") {
      setFilteredPolling([newMeasurement, ...filteredPolling]);
    }
  };

  useEffect(() => {
    if (data) {
      clonefilter(data);
    }
  }, [data, clonefilter]);

  return (
    <Fragment>
      <Wrapper>
        <Header />
        <Container>
          <Row className="justify-content-center pt-4">
            <Selector selectOption={(res) => setSelected(res)} data={data} />
          </Row>
          <div className="justify-content-center mt-5 mb-4">
            <Card metadata={selected} cardData={filteredPolling} />
          </div>
          <div className="mt-5">
            <Graph metadata={selected} cardData={filteredPolling} />
          </div>
        </Container>
      </Wrapper>
    </Fragment>
  );
};

export default DashBoard;
