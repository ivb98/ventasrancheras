import React, { useContext } from "react";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { Container, Row, Col } from "react-bootstrap";
import { SelectProvider } from "../Context/SelectContext";
import { DataContext } from "../Context/DataContext";



function PackageView() {
    const [data] = useContext(DataContext);

    return (
        <Container>
            <Row>
                <SelectProvider>
                    <Col>
                        <StatusTable rol="Packs" products={data.packages} />
                    </Col>
                    <Col>
                        <StatusPack rol="Packs" />
                    </Col>
                </SelectProvider>
            </Row>
        </Container>
    );
}

export default PackageView;
