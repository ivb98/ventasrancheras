import React from "react";
import { Container, Nav } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {Link} from "react-router-dom";

const linkToProfile = (rol, row) => {
    return (
        <Nav>
            <Nav.Item>
                <Link to={{pathname:`/${rol}/${row.id}`, state:{row}}}>Ver mas</Link>
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
            dataField: "name",
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
                return linkToProfile(rol, row);
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
