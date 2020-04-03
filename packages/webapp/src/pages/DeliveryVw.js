import React from 'react';
import EmployeeForm from '../Forms/EmployeeForm';
import { Link } from 'react-router-dom';


function DeliveryView() {

    const id = 1;
    
    return(
            <div>
                 <h1>
                    <EmployeeForm/>
                     <Link to={`/Delivery/${id}`}>This Profile</Link>
                     
                </h1>  
            </div>
          
        )
    
}

export default DeliveryView;