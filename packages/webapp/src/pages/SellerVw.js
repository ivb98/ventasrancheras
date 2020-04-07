import React, { useContext } from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";
import { DataContext } from "../Context/DataContext";



const SellerView = () => {
    const [data] = useContext(DataContext);

        //console.log(data);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8}>
                    {" "}
                    <ProfileTable products={data.salesman.salesmen} rol="Seller" />{" "}
                </Col>

                <Col xs={6} md={4}>
                    {" "}
                    <EmployeeForm rol="Seller" />{" "}
                </Col>
            </Row>
        </Container>
    );
};

export default SellerView;