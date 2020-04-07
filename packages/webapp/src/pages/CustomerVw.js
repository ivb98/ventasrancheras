import React, { useContext } from "react";
import StatusTable from "../Component/StatusTable";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import { DataContext } from "../Context/DataContext";

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
    const [data] = useContext(DataContext);

    return (
        <Container>
            <Container>
                <p></p>
                <h>Cliente : {}</h>
                <p></p>
                <p>Shipping Address: {}</p>
                <p>Balance: {}</p>
                <p></p>
            </Container>
            <SelectProvider>
                <StatusTable rol="Customer" products={data.customers} />
            </SelectProvider>
        </Container>
    );
}

export default CustomerPrflView;
