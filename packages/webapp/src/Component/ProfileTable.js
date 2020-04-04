import React from "react";
import { Container, Nav } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";

const linkToProfile = (rol, id) => {
    return (
        <Nav>
            <Nav.Item>
                <Nav.Link href={`/${rol}/${id}`}>This Profile</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};

function ProfileTable(props) {
    const rol = props.rol;

    const columns = [
        {
            dataField: "id",
            text: "ID",
        },
        {
            dataField: "nombre",
            text: "Nombre",
        },
        {
            dataField: "email",
            text: "E-mail",
        },
        {
            dataField: "Profile",
            isDummyField: true,
            text: "Detalles",
            formatter: (cell, row, rowIndex) => {
                return linkToProfile(rol, row.id);
            },
        },
    ];

    return (
        <Container fluid="md">
            <BootstrapTable keyField="id" data={props.products} columns={columns} />
        </Container>
    );
}

export default ProfileTable;
