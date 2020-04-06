import React from "react";
import ProfileTable from "../Component/ProfileTable";
import { Container } from "react-bootstrap";
import axios from "axios";
import { LoadingProvider, useLoadingState, useLoadingDispatch } from "../Context/LoadingContext";

const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE1ODYxMjE5MTUsImV4cCI6MTY0OTIzNzExNX0.Nrx4JW-OQdd7TyeJcwus8Rsv-0gV8KW5klrNmp2K8oI";

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

async function getCustomers() {
    if (token) {
        config.headers["Authorization"] = token;
    }

    let res = await axios.get("/customer/", config);
    console.log(res.data);
    return res.data;
}

function CustomerView() {
    const { customerLoaded } = useLoadingState();

    console.log(customerLoaded);
    const dispatch = useLoadingDispatch();

    if (!customerLoaded) {
        getCustomers().then((customer) => {
            dispatch({ type: "loadCustomer", customers: customer });
        });
    }

    const { customers } = useLoadingState();

    return (
        <Container>
            <ProfileTable products={customers} rol="Customer" />
        </Container>
    );
}

export default CustomerView;
