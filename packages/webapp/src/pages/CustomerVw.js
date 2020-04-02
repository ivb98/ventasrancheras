import React from 'react';
import { Link } from 'react-router-dom';


function CustomerView() {

    const id = 1;
    
    return(
            <div>
                 <h1>
                     <Link to={`/Customer/${id}`}>This Profile</Link>
                     
                </h1>  
            </div>
          
        )
    
}

export default CustomerView;