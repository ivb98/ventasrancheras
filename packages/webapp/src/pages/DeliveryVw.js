import React, { useContext } from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";
import { DataContext } from "../Context/DataContext";

function DeliveryView() {
    const [data] = useContext(DataContext);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8}>
                    <ProfileTable products={data.deliveries} rol="Delivery" />
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
