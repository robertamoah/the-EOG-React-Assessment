import React, { Fragment, useState, useEffect } from "react";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Selector from "../components/Selector";
import Graph from "../components/Graph";
import Card from "../components/Card"
import { Row, Col, Container } from "react-bootstrap";


const DashBoard = () => {
  const [selected, setSelected] = useState([])

  // useEffect(() => {
  //   console.log("DashBoard", selected)
  // }, [selected])

  return (
    <Fragment>
      <Wrapper>
        <Header />
        <Container>
          <Row className="justify-content-center pt-4">
            <Selector selectOption={(data) => setSelected(data)} />
          </Row>

          <div className="justify-content-center pt-4">
            <Card data={selected} />
          </div>

          <div className="mt-5" >
            <Graph />
          </div>
        </Container>
      </Wrapper>
    </Fragment>
  );
};

export default DashBoard;
