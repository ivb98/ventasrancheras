import React from "react";
import StatusTable from "../Component/StatusTable";
import { Container, Row, Col } from "react-bootstrap";

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

function CustomerPrflView() {
    return (
        <Container>
            <StatusTable rol="Customer" products={packages} />
        </Container>
    );
}

export default CustomerPrflView;
