import React from "react";
import "./styles/Navbar.css";

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div>
            <u1 className="navbar-nav mr-auto">
                <li className="nav-item active">
                <a className="nav-link" href="/Seller">Sellers</a>
                </li>
                <li className="nav-item active">
                <a className="nav-link" href="/Delivery">Delivery</a>
                </li>
                <li className="nav-item active">
                <a className="nav-link" href="/Package">Package</a>
                </li>
                <li className="nav-item active">
                <a className="nav-link" href="/Customer">Customer</a>
                </li>
             </u1>
            </div>
        </nav>
    );
}

export default Navbar;

