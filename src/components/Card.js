import React, { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap'

const CardMain = ({ data }) => {

    useEffect(() => {

        console.log("Card Component", data)

    }, [data])



    const mapedData = data.map((data, indexOf) => {
        return (
            <Col key={indexOf} md={2} sm={12} className='ml-4'>
                <div style={{ width: "190px", height: "100px" }} >
                    <Card border="light">
                        <Card.Body>
                            <Card.Text>
                                {data}
                            </Card.Text>
                            <Card.Title>3281239</Card.Title>
                        </Card.Body>
                    </Card>

                </div>
            </Col>
        )
    })

    return (
        <>
            <Container >
                <Row>
                    {mapedData}
                </Row>
            </Container>
        </>

    );
}

export default CardMain;