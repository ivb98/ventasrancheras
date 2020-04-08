import React, { useContext } from "react";
import StatusTable from "../Component/StatusTable";
import Assignform from "../Forms/AssignForm";
import StatusPack from "../Component/StatusPack";
import { Container, Col, Row } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import { DataContext } from "../Context/DataContext";
import { UserContext } from "../Context/UserContext";

function SellerPrflView(props) {
    const [data] = useContext(DataContext);
    const [user] = useContext(UserContext);
    const seller = props.location.state.row;

    async function handleFormSubmit({ employeename, assigment }, { setSubmitting, resetForm }) {
        setSubmitting(true);
        const emp = data.salesman.salesmen.find(sman => {
            return employeename === sman.name;
        });
        await fetch("/salesman/assign", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${user.access_token}`,
            },
            body: JSON.stringify({ salesmanId: emp.id, customerId: assigment }),
        });
        resetForm();
    }
    return (
        <Container fluid>
            <Container>
                <h2>Seller: {seller.name}</h2>
                <p></p>
            </Container>
            <Row>
                <SelectProvider>
                    <Col xs={12} md={8}>
                        <StatusTable rol="Seller" products={seller.visits} />
                    </Col>
                    <Col xs={6} md={4}>
                        {" "}
                        <Assignform
                            handleFormSubmit={handleFormSubmit}
                            assign="Customer"
                            rol="Seller"
                            employee={seller}
                        />
                        <StatusPack rol="Seller" />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default SellerPrflView;
