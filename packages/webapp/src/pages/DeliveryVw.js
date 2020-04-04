import React from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";

const drivers = [
    {
        id: 14,
        nombre: "Delivery1",
        email: "del1@email.com",
    },
    {
        id: 22,
        nombre: "Driver",
        email: "driver@email.com",
    },
    {
        id: 36,
        nombre: "Delivery2",
        email: "del2@email.com",
    },
    {
        id: 43,
        nombre: "Driver2",
        email: "driver2@email.com",
    },
];

function DeliveryView() {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8}>
                    <ProfileTable products={drivers} rol="Delivery" />
                </Col>
                <Col xs={6} md={4}>
                    {" "}
                    <EmployeeForm rol="Delivery" />
                </Col>
            </Row>
        </Container>
    );
}

export default DeliveryView;
