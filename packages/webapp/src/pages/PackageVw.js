import React from "react";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/Contexts";

const packages = [
    {
        id: 25,
        clientname: "Fulano",
        delivery: "Otro Fulano",
        productos: [
            {
                name: "Producto1",
                cant: 3,
            },
            {
                name: "Producto2",
                cant: 6,
            },
            {
                name: "Producto4",
                cant: 10,
            },
        ],
        prueba: "prueba",
    },
    {
        id: 22,
        clientname: "Fulano",
        delivery: "Otro Fulano",
        productos: [
            {
                name: "Producto1",
                cant: 3,
            },
            {
                name: "Producto2",
                cant: 6,
            },
            {
                name: "Producto4",
                cant: 10,
            },
        ],
        prueba: "prueba",
    },
    {
        id: 25,
        clientname: "Fulano",
        delivery: "Otro Fulano",
        productos: [
            {
                name: "Producto1",
                cant: 3,
            },
            {
                name: "Producto2",
                cant: 6,
            },
            {
                name: "Producto4",
                cant: 10,
            },
        ],
        prueba: "prueba",
    },
    {
        id: 43,
    },
];


function PackageView() {
    return (
        <Container>
            <Row>
                <SelectProvider>
                    <Col>
                        <StatusTable rol="Package" products={packages} />
                    </Col>
                    <Col>
                        <StatusPack rol="Package"/>
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default PackageView;
