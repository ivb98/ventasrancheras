import React from "react";
import "./Navbar.css";
import { Link } from 'react-router-dom';

function Navbar() {

    const style = {
        color: 'white'
    }

    
    return (
        <nav>
            <h3>NavBar</h3>
            <u1 className="nav-links">
                <Link style={style} to="/Login">
                    <li>Login</li>
                </Link>
                <Link style={style} to="/Seller">
                    <li>Seller</li>
                </Link>
                <Link style={style} to="/Delivery">
                    <li>Delivery</li>
                </Link>
                <Link style={style} to="/Package">
                    <li>Package</li>
                </Link>
                <Link style={style} to="/Customer">
                    <li>Customer</li>
                </Link>
            </u1>
            
        </nav>
    );
}

export default Navbar;


