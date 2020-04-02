import React from 'react'
import { Link } from 'react-router-dom';


function SellerView() {

    const id = 1;
    return(
            <div>
                 <h1>
                     <Link to={`/Seller/${id}`}>This Profile</Link>
                     
                </h1> 
            </div>
          
        )
    
}

export default SellerView;