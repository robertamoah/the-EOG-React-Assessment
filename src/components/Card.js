import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const CardMain = ({ metadata, cardData }) => {
  const mapedData = metadata.map((data, indexOf) => {
    return (
      <Col key={indexOf} md={2} sm={1} className="mr-2">
        <div style={{ width: "150px", height: "100px" }}>
          <Card border="light">
            <Card.Body>
              {cardData.map((l, indexOf) => {
                if (l.metric === data) {
                  return <Card.Text key={indexOf}>{l.metric}</Card.Text>;
                }
              })}

              {cardData.map((l, indexOf) => {
                if (l.metric === data) {
                  return <Card.Title key={indexOf}>{l.value} </Card.Title>;
                }
              })}
            </Card.Body>
          </Card>
        </div>
      </Col>
    );
  });

  return <Row>{mapedData}</Row>;
};

export default CardMain;
