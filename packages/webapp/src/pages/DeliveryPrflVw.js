import React from "react";
import Assignform from "../Forms/AssignForm";
import { Container, Row, Col } from "react-bootstrap";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { SelectProvider } from "../Context/SelectContext";

const packages = [
    {
        id: 14,
    },
    {
        id: 22,
    },
    {
        id: 36,
    },
    {
        id: 43,
    },
];

function DeliveryPrflView() {
    return (
        <Container fluid>
            <SelectProvider>
                <Row>
                    <Col xs={12} md={8}>
                        <StatusTable rol="Delivery" products={packages} />
                    </Col>
                    <Col xs={6} md={4}>
                        {" "}
                        <Assignform assign="Package" rol="Delivery" />
                        <StatusPack rol="Delivery"/>
                    </Col>
                </Row>
            </SelectProvider>
        </Container>
    );
}

export default DeliveryPrflView;
