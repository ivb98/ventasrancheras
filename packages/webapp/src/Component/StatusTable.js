import React from "react";
import { Container } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelectDispatch } from "../Context/SelectContext";

const visited = value => {
    return value === true ? <p>Yes</p> : <p>No</p>;
};

function StatusTable(props) {
    const sellerRole = props.rol === "Seller" ? true : false;

    const columns = [
        {
            dataField: "id",
            text: "ID",
        },
        {
            dataField: "customer.displayName",
            text: "Information",
            hidden: props.rol !== "Customer",
        },
        {
            dataField: "Info",
            text: "Ver",
            isDummyField: true,
            hidden: props.rol !== "Package",
        },
        {
            dataField: "status",
            text: "Status",
            hidden: props.rol === "Seller",
        },
        {
            dataField: "visited",
            text: "Visited",
            hidden: props.rol !== "Seller",
            formatter: (cell, row, rowIndex) => {
                return visited(row.visited);
            },
        },
    ];

    const dispatch = useSelectDispatch();

    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#00BFFF",
        onSelect: (row, isSelect, rowIndex, e) => {
            !sellerRole
                ? dispatch({ type: "selectPackage", pack: row })
                : dispatch({ type: "selectPerson", person: row });
        },
    };

    return (
        <Container fluid="md">
            <BootstrapTable
                keyField="id"
                data={props.products}
                columns={columns}
                selectRow={selectRow}
            />
        </Container>
    );
}

export default StatusTable;
