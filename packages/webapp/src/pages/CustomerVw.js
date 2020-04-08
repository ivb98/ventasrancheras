import React, { useContext } from "react";
import ProfileTable from "../Component/ProfileTable";
import { Container } from "react-bootstrap";
import { DataContext } from "../Context/DataContext";

function CustomerView() {
    const [data] = useContext(DataContext);

    return (
        <Container>
            <ProfileTable products={data.customers} rol="Clients" />
        </Container>
    );
}

export default CustomerView;
