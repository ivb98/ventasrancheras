import React, { useContext } from "react";
import { UserContext, initialUserState } from "../Context/UserContext";
import { useHistory } from "react-router-dom";

const LogOut = props => {
    const [user, setUser] = useContext(UserContext);
    const history = useHistory();

    async function logOut() {
        localStorage.removeItem("login");
        setUser({ ...initialUserState });
        history.push("/");
    }

    return <div>{props.render(logOut)}</div>;
};

export default LogOut;
