import React from "react";
import StatusTable from "../Component/StatusTable";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/Contexts";

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
            <SelectProvider>
            <StatusTable rol="Customer" products={packages} />
            </SelectProvider>
        </Container>
    );
}

export default CustomerPrflView;
