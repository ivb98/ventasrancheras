import React from 'react';
import { Container } from 'react-bootstrap';
import BootstrapTable  from 'react-bootstrap-table-next';


function StatusTable (props) {

    const rol = props.rol;

    const hide = (rol === "Seller")? false : true;

    const columns = [{
        dataField: 'id',
        text: 'ID'
    }, {
        dataField: 'nombre',
        text: 'Nombre',
        hidden: hide
    }, {
        dataField: 'email',
        text: 'E-mail',
        hidden: hide
    },{  
        dataField: 'info',
        text: 'Information'
    },{  
        dataField: 'status',
        text: 'Status'
    }]

    return (
        <Container fluid="md" >
           <BootstrapTable keyField='id' data={ props.products } columns={ columns } />

        </Container>
    );
}

export default StatusTable;

