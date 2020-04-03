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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";




function Nav() {
    const user=false;

    const loggedNavigation = (
        <Router>
        <div className="Nav">
            <Navbar />
            <Switch>
                <Route path="/Seller" exact component={SellerView}/> 
                <Route path="/Delivery" exact component={DeliveryView}/>
                <Route path="/Package" exact component={PackageView}/>
                <Route path="/Customer" exact component={CustomerView}/>
                <Route path="/Seller/:id" component={SellerPrflView}/>
                <Route path="/Delivery/:id" component={DeliveryPrflView}/>
                <Route path="/Customer/:id" component={CustomerPrflView}/>
            </Switch>
        </div>
    </Router>
    )

    const notLoggedNavigation =(
            <Router>
                <Switch>  <Route path="/Login" component={Login}/> </Switch>
            </Router>
    )

    if(user)
    return loggedNavigation;

    else {return notLoggedNavigation}
    
}

export default Nav;

