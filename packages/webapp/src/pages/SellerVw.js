import React from 'react';
import EmployeeForm from '../Forms/EmployeeForm';
import { Link } from 'react-router-dom';


function SellerView() {

    const id = 1;
    return(
            <div>
                 <h1>
                     <EmployeeForm/>
                     <Link to={`/Seller/${id}`}>This Profile</Link>
                     
                </h1> 
            </div>
          
        )
    
}

export default SellerView;