import React from "react";
import "./styles/Navbar.css";
import * as ReactBootStrap from "react-bootstrap";
import {Link} from 'react-router-dom';
function Navbar() {

    return (
       
            <ReactBootStrap.Navbar bg="dark" variant="dark"expand="lg">
              < Link className="Navbar__brand" to="/Seller">Nav-Bar </Link>
              <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
              <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                  <Link className="Navbar__brand" to="/Seller">Seller</Link>
                  <Link className="Navbar__brand" to="/Delivery">Delivery</Link>
                  <Link className="Navbar__brand" to="/Package">Package</Link>
                  <Link className="Navbar__brand" to="/Customer">Customer</Link>

                </ReactBootStrap.Nav>
                
              </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
    );
}

export default Navbar;

