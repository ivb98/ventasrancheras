import React, { useContext } from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { DataContext } from "../Context/DataContext";

const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE1ODYxMjE5MTUsImV4cCI6MTY0OTIzNzExNX0.Nrx4JW-OQdd7TyeJcwus8Rsv-0gV8KW5klrNmp2K8oI";

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

async function getDelivery() {
    if (token) {
        config.headers["Authorization"] = token;
    }

    let res = await axios.get("/delivery/", config);
    return res.data;
}
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
