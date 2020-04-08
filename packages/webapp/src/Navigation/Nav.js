import React, { useContext, useEffect } from "react";
import Navbar from "../Component/Navbar";
import SellerView from "../pages/SellerVw";
import SellerPrflView from "../pages/SellerPrflVw";
import PackageView from "../pages/PackageVw";
import DeliveryView from "../pages/DeliveryVw";
import DeliveryPrflView from "../pages/DeliveryPrflVw";
import CustomerView from "../pages/CustomerVw";
import CustomerPrflView from "../pages/CustomerPrflVw";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Login from "../Component/LoginWrapper";

//  let auth = true;
// const isLogged = JSON.parse(localStorage.getItem("login"))

// const PrivateRoute = ({ component: Component, ...rest } ) => (
//      <UserContext.Consumer>
//     <Route
//         {...rest}
//         render={(props) => (auth === true ? <Component {...props} /> : <Redirect to="Login" />)}
//     />
//      </UserContext.Consumer>
// );

function Nav() {
    const [user, setUser] = useContext(UserContext);
    const notLoggedNavigation = <Route exact path="/" component={Login} />;

    const loggedNavigation = (
        <>
            <Route exact path="/" component={SellerView} />
            <Route path="/Seller" exact component={SellerView} />
            <Route path="/Delivery" exact component={DeliveryView} />
            <Route path="/Package" exact component={PackageView} />
            <Route path="/Customer" exact component={CustomerView} />
            <Route path="/Seller/:id" component={SellerPrflView} />
            <Route path="/Delivery/:id" component={DeliveryPrflView} />
            <Route path="/Customer/:id" component={CustomerPrflView} />
        </>
    );

    return (
        <Router>
            {user.login && <Navbar />}
            <Switch>{user.login ? loggedNavigation : notLoggedNavigation}</Switch>
        </Router>
    );
}

export default Nav;
