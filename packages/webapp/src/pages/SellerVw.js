import React from "react";
import EmployeeForm from "../Forms/EmployeeForm";
import ProfileTable from "../Component/ProfileTable";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { LoadingProvider, useLoadingState, useLoadingDispatch } from "../Context/LoadingContext";


const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE1ODYxMjE5MTUsImV4cCI6MTY0OTIzNzExNX0.Nrx4JW-OQdd7TyeJcwus8Rsv-0gV8KW5klrNmp2K8oI";

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

async function getSellers() {
    if (token) {
        config.headers["Authorization"] = token;
    }

    let res = await axios.get("/sales/", config);
    console.log(res);
    return res.data;
}

const SellerView = () => {

    const { sellerLoaded } = useLoadingState();

    const dispatch = useLoadingDispatch();

    if (!sellerLoaded) {
        getSellers().then((sales) => {
            dispatch({ type: "loadSeller", sellers: sales.salesmen });

        });
    }

    const { sellers } = useLoadingState();

    console.log(sellers);
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
};

export default SellerView;
