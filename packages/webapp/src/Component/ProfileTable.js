import React from "react";
import { Container, Nav, Form, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import { RolesConstants } from "@vranch/common";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

const { SearchBar } = Search;

const linkToProfile = (rol, row) => {
    return (
        <Nav>
            <Nav.Item>
                <Link to={{ pathname: `/${rol}/${row.id}`, state: { row } }}>Ver mas</Link>
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
            hidden: rol === "Customer",
        },
        {
            dataField: "displayName",
            text: "Nombre",
            hidden: rol !== "Customer",
        },
        {
            dataField: "shipAddr.stringified",
            text: "Address",
            hidden: rol !== "Customer",
        },
        {
            dataField: "email",
            text: "E-mail",
            hidden: rol === "Customer",
        },
        {
            dataField: "Profile",
            isDummyField: true,
            text: "Detalles",
            formatter: (cell, row, rowIndex) => {
                return linkToProfile(rol === RolesConstants.SALESMAN ? "Sales" : rol, row);
            },
        },
    ];

    return (
        <Container fluid="sm">
            <ToolkitProvider
                keyField="id"
                data={props.products}
                columns={columns}
                search={{
                    searchFormatted: true,
                }}
            >
                {props => (
                <div>
                    <SearchBar {...props.searchProps} />
                    <hr />
                    <BootstrapTable pagination={paginationFactory()} {...props.baseProps} />
                </div>
                )}
            </ToolkitProvider>
        </Container>
    );
}

export default ProfileTable;
