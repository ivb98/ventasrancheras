import React, { useContext} from "react";
import Assignform from "../Forms/AssignForm";
import { Container, Row, Col } from "react-bootstrap";
import StatusTable from "../Component/StatusTable";
import StatusPack from "../Component/StatusPack";
import { SelectProvider } from "../Context/SelectContext";
import { DataContext } from "../Context/DataContext";

const packages = [
    {
        id: 14,
    },
    {
        id: 22,
    },
    {
        id: 36,
    },
    {
        id: 43,
    },
];

function DeliveryPrflView(props) {

    const delivery = props.location.state.row;

    const [data] = useContext(DataContext);

    
    

    return (
        <Container fluid>
            <SelectProvider>
                <Row>
                    <Col xs={12} md={8}>
                        <StatusTable rol="Delivery" products={delivery.packages} />
                    </Col>
                    <Col xs={6} md={4}>
                        {" "}
                        <Assignform assign="Package" rol="Delivery" />
                        <StatusPack rol="Delivery"  />
                    </Col>
                </Row>
            </SelectProvider>
        </Container>
    );
}

export default DeliveryPrflView;
