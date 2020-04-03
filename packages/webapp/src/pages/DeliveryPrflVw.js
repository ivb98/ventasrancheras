import React from 'react';
import Assignform from '../Forms/AssignForm';
import { Container } from 'react-bootstrap';
import StatusTable from '../Component/StatusTable';


const packages = [{
    id: 14
},{
    id: 22
},{
    id: 36
},{
    id: 43
},]

function DeliveryPrflView() {
    return(
        <Container>
            <StatusTable rol="Delivery" products={packages}/>
            <Assignform assign="Package" rol="Delivery"/>
        </Container>
          
        )
    
}

export default DeliveryPrflView;