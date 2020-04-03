import React from 'react';
import EmployeeForm from '../Forms/EmployeeForm';
import ProfileTable from '../Component/ProfileTable';


const sellers = [{
    id: 1,
    nombre: "Email",
    email: "email@email.com"
},{
    id: 2,
    nombre: "Prueba",
    email: "prueba@email.com"
},{
    id: 3,
    nombre: "Test",
    email: "test@email.com"
},{
    id: 4,
    nombre: "Exito",
    email: "exito@email.com"
},]

function SellerView() {

    return(
        <div>
            <ProfileTable products={sellers} rol="Seller" />
            <EmployeeForm rol="Seller"/>
        </div>   
        )    
}

export default SellerView;