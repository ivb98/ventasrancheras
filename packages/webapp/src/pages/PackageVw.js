import React from 'react';
import StatusTable from '../Component/StatusTable';
import { Container } from 'react-bootstrap';

const packages = [{
    id: 14
},{
    id: 22
},{
    id: 36
},{
    id: 43
},]


function PackageView() {

    return(
        <Container>
            <StatusTable rol="Package" products={packages}/>
        </Container>
          
        )
    
}

export default PackageView;