import React from "react";
import Navbar from "../Component/Navbar";
import Login from "../pages/Login";
import SellerView from "../pages/SellerVw";
import SellerPrflView from "../pages/SellerPrflVw";
import PackageView from "../pages/PackageVw";
import DeliveryView from "../pages/DeliveryVw";
import DeliveryPrflView from "../pages/DeliveryPrflVw";
import CustomerView from "../pages/CustomerVw";
import CustomerPrflView from "../pages/CustomerPrflVw";
import { 
        BrowserRouter as Router, 
        Switch, 
        Route,
        Redirect
        } from "react-router-dom";

const auth = true;

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true ? <Component {...props} />
        : <Redirect to="Login"/>
    )}/> 
)

function Nav() {

    return (
        <Router>
            <div className="Nav">
                <Navbar />
                <Switch>
                    <Route path="/Login" component={Login}/>
                    <PrivateRoute path="/Seller" exact component={SellerView}/> 
                    <PrivateRoute path="/Delivery" exact component={DeliveryView}/>
                    <PrivateRoute path="/Package" exact component={PackageView}/>
                    <PrivateRoute path="/Customer" exact component={CustomerView}/>
                    <PrivateRoute path="/Seller/:id" component={SellerPrflView}/>
                    <PrivateRoute path="/Delivery/:id" component={DeliveryPrflView}/>
                    <PrivateRoute path="/Customer/:id" component={CustomerPrflView}/>
                </Switch>
            </div>
        </Router>
    );
}

export default Nav;