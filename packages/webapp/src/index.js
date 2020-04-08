import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css';
import './global.css'
import { UserProvider } from './Context/UserContext'

ReactDOM.render(
    <UserProvider>
    <App />
    </UserProvider>
    
    , document.getElementById("root"));
