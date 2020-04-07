import React from "react";
import StatusTable from "../Component/StatusTable";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import { DataProvider } from "../Context/DataContext";

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

function CustomerPrflView(props) {
    
    const customer = props.location.state.row;




    return (
        <Container>
            <Container>
            <p></p>
            <h>Cliente : {customer.displayName}</h>
            <p></p>
            <p>Shipping Address: {customer.shipAddr.stringified}</p>
            <p>Balance: {customer.balance}</p>
            <p></p>
            </Container>
            <SelectProvider>
                <StatusTable rol="Customer" products={packages} />
            </SelectProvider>
        </Container>
    );
}

export default CustomerPrflView;