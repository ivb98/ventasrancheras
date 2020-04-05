import React from "react";
import "./styles/Navbar.css";
import * as ReactBootStrap from "react-bootstrap";
function Navbar() {

    return (
       
            <ReactBootStrap.Navbar bg="dark" variant="dark"expand="lg">
              <ReactBootStrap.Navbar.Brand href="/Seller">Nav-Bar</ReactBootStrap.Navbar.Brand>
              <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
              <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                <ReactBootStrap.Nav className="mr-auto">
                  <ReactBootStrap.Nav.Link href="/Seller">Seller</ReactBootStrap.Nav.Link>
                  <ReactBootStrap.Nav.Link href="/Delivery">Delivery</ReactBootStrap.Nav.Link>
                  <ReactBootStrap.Nav.Link href="/Package">Package</ReactBootStrap.Nav.Link>
                  <ReactBootStrap.Nav.Link href="/Customer">Customer</ReactBootStrap.Nav.Link>

                </ReactBootStrap.Nav>

              </ReactBootStrap.Navbar.Collapse>
            </ReactBootStrap.Navbar>
    );
}

export default Navbar;

