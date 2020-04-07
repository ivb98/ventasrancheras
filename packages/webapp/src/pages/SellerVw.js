import React, { useState } from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { LoadingProvider, useLoadingState, useLoadingDispatch } from "../Context/LoadingContext";

const initialState = {
    salesmen: [],
};

const token =
    "";

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

async function getSellers() {
    if (token) {
        config.headers["Authorization"] = token;
    }

    let res = await axios.get("https://vrancheras.herokuapp.com/salesman/", config);
    return res.data;
}

const SellerView = () => {
    const [salesmen, setSalesmen] = useState(initialState);

    const { sellerLoaded } = useLoadingState();

    const dispatch = useLoadingDispatch();

    if (!sellerLoaded) {
        dispatch({ type: "loadSeller" });
        getSellers().then((sales) => setSalesmen(sales));
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8}>
                    {" "}
                    <ProfileTable products={salesmen.salesmen} rol="Seller" />{" "}
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
