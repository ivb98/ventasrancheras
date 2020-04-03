import React from 'react';
import StatusTable from '../Component/StatusTable';
import Assignform from '../Forms/AssignForm';
import { Container } from 'react-bootstrap';

const customers = [{
    id: 111,
    nombre: "Custom1",
    email: "emaileo@email.com"
},{
    id: 212,
    nombre: "Custom2",
    email: "prubeo@email.com"
},{
    id: 332,
    nombre: "Custom3",
    email: "testeo@email.com"
},{
    id: 444,
    nombre: "Custom7",
    email: "custeo@email.com"
},]

function SellerPrflView() {
    return(
            <Container>
                <StatusTable rol="Seller" products={customers}/>
                <Assignform assign="Customer" rol="Seller" />
            </Container>
          
        )
    
}

export default SellerPrflView;