import React from "react";
import { Container } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelectDispatch } from "../Context/Contexts";

function StatusTable(props) {

    const sellerRole = props.rol === "Seller" ? true : false;

    const columns = [
        {
            dataField: "id",
            text: "ID",
        },
        {
            dataField: "nombre",
            text: "Nombre",
            hidden: !sellerRole,
        },
        {
            dataField: "email",
            text: "E-mail",
            hidden: !sellerRole,
        },
        {
            dataField: "info",
            text: "Information",
        },
        {
            dataField: "status",
            text: "Status",
        },
    ];

    const dispatch = useSelectDispatch();

    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#00BFFF",
        onSelect: (row, isSelect, rowIndex, e) => {
            (!sellerRole)? dispatch({ type: "selectPackage", pack: row })
            :dispatch({ type: "selectPerson", person: row })
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
