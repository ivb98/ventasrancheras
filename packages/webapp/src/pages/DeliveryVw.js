import React from 'react';
import EmployeeForm from '../Forms/EmployeeForm';
import ProfileTable from '../Component/ProfileTable';

const drivers = [{
    id: 14,
    nombre: "Delivery1",
    email: "del1@email.com"
},{
    id: 22,
    nombre: "Driver",
    email: "driver@email.com"
},{
    id: 36,
    nombre: "Delivery2",
    email: "del2@email.com"
},{
    id: 43,
    nombre: "Driver2",
    email: "driver2@email.com"
},]


function DeliveryView() {


    return(
            <div>
                <ProfileTable products={drivers} rol="Delivery" />
                <EmployeeForm rol="Delivery"/>
            </div>   
        )
    
}

export default DeliveryView;