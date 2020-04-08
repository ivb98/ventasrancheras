import React, { useContext } from "react";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import { DataContext } from "../Context/DataContext";

function CustomerPrflView(props) {
    const [data] = useContext(DataContext);

    const custId = props.location.state.row.id;

    const customer = data.customers.find(customer => {
  
        return customer.id === custId;
    });

    const paquetes = data.packages.filter(pack => pack.customer.id === custId);

    return (
        <Container>
            <Container>
                <p></p>
                <h3>Cliente : {customer.displayName}</h3>
                <p></p>
                <p>Shipping Address: {customer.shipAddr.stringified}</p>
                <p>Balance: {customer.balance}</p>
                <p></p>
            </Container>
            <Row>
                <SelectProvider>
                    <Col>
                        <StatusTable rol="Packs" products={paquetes} />
                    </Col>
                    <Col>
                        <StatusPack rol="Clients" />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default CustomerPrflView;
