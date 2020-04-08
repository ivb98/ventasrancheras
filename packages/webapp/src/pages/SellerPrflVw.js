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
    const saleId = props.location.state.row.id;

    
    const seller = data.salesman.salesmen.find(sale => {
  
        return sale.id === saleId;
    });

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
                        <StatusTable rol="SalesMen" products={seller.visits} />
                    </Col>
                    <Col xs={6} md={4}>
                        {" "}
                        <Assignform
                            handleFormSubmit={handleFormSubmit}
                            assign="Clients"
                            rol="SalesMen"
                            employee={seller}
                        />
                        <StatusPack rol="SalesMen" />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default SellerPrflView;
