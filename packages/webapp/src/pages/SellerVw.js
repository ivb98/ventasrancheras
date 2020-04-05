import React from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";

const sellers = [
    {
        id: 1,
        nombre: "Email",
        email: "email@email.com",
    },
    {
        id: 2,
        nombre: "Prueba",
        email: "prueba@email.com",
    },
    {
        id: 3,
        nombre: "Test",
        email: "test@email.com",
    },
    {
        id: 4,
        nombre: "Exito",
        email: "exito@email.com",
    },
];

class SellerView extends React.Component {

// componentDidMount (){
//     this.fetchSellers()
// }

// fetchSellers = async ()=>{
//     const data = await fetch('')
// }

    render(){
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8}>
                    {" "}
                    <ProfileTable products={sellers} rol="Seller" />{" "}
                </Col>

                <Col xs={6} md={4}>
                    {" "}
                    <EmployeeForm rol="Seller" />{" "}
                </Col>
            </Row>
        </Container>
    );
}
}

export default SellerView;
