import React, { useContext } from "react";
import { UserContext, initialUserState } from "../Context/UserContext";

const LogOut = props => {
    const [user, setUser] = useContext(UserContext);

    async function logOut() {
        localStorage.removeItem("login");
        setUser({ ...initialUserState });
    }

    return <div>{props.render(logOut)}</div>;
};

export default LogOut;
