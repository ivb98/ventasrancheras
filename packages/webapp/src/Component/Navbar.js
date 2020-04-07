import React from "react";
import "./styles/Navbar.css";
import * as ReactBootStrap from "react-bootstrap";
import {Link} from 'react-router-dom';
function Navbar() {

    return (
       
            <ReactBootStrap.Navbar bg="dark" variant="dark"expand="lg">
              < Link to="/Seller">Nav-Bar </Link>
              <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
              <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                  <Link to="/Seller">Seller</Link>
                  <Link to="/Delivery">Delivery</Link>
                  <Link to="/Package">Package</Link>
                  <Link to="/Customer">Customer</Link>

                </ReactBootStrap.Nav>
                
              </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
    );
}

export default Navbar;

