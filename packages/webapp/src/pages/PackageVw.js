import React from "react";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import axios from "axios";
import { LoadingProvider, useLoadingState, useLoadingDispatch } from "../Context/LoadingContext";

const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6Ik1hbmFnZXIiLCJpYXQiOjE1ODYxMjE5MTUsImV4cCI6MTY0OTIzNzExNX0.Nrx4JW-OQdd7TyeJcwus8Rsv-0gV8KW5klrNmp2K8oI";

const config = {
    headers: {
        "Content-type": "application/json",
    },
};

async function getPackages() {
    if (token) {
        config.headers["Authorization"] = token;
    }

    let res = await axios.get("/package/", config);

    return res.data;
}

function PackageView() {
    const { packageLoaded } = useLoadingState();

    const dispatch = useLoadingDispatch();

    if (!packageLoaded) {
        getPackages().then((paquetes) => {
            dispatch({ type: "loadPackage", packs: paquetes });
        });
    }

    const { packs } = useLoadingState();


    return (
        <Container>
            <Row>
                <SelectProvider>
                    <Col>
                        <StatusTable rol="Package" products={packs} />
                    </Col>
                    <Col>
                        <StatusPack rol="Package" />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default PackageView;
