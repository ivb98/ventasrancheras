import React, { useContext } from "react";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import { DataContext } from "../Context/DataContext";

function CustomerPrflView(props) {
    const [data] = useContext(DataContext);

    const customer = props.location.state.row;

    const paquetes = data.packages.filter(pack => pack.customer.id === customer.id);


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
            <Row>
                <SelectProvider>
                    <Col>
                        <StatusTable rol="Package" products={paquetes} />
                    </Col>
                    <Col>
                        <StatusPack rol="Customer" />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default CustomerPrflView;
