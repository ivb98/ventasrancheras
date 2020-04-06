import React from "react";
import StatusTable from "../Component/StatusTable";
import Assignform from "../Forms/AssignForm";
import StatusPack from "../Component/StatusPack";
import { Container, Col, Row } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";

const customers = [
    {
        id: 111,
        nombre: "Custom1",
        email: "emaileo@email.com",
    },
    {
        id: 212,
        nombre: "Custom2",
        email: "prubeo@email.com",
    },
    {
        id: 332,
        nombre: "Custom3",
        email: "testeo@email.com",
    },
    {
        id: 444,
        nombre: "Custom7",
        email: "custeo@email.com",
    },
];

function SellerPrflView(props) {
    const seller = props.location.state.row;

    return (
        <Container fluid>
            <Row>
                <SelectProvider>
                    <Col xs={12} md={8}>
                        <StatusTable rol="Seller" products={customers} />
                    </Col>
                    <Col xs={6} md={4}>
                        {" "}
                        <Assignform assign="Customer" rol="Seller" />
                        <StatusPack rol="Seller" seller={seller} />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default SellerPrflView;
