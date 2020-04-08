import React, { useContext, useEffect, useState } from "react";
import Nav from "../Navigation/Nav";
import { DataContext } from "../Context/DataContext";
import { LoadingContext } from "../Context/LoadingContext";
import { fetchTheData } from "../libs/request";
import { UserContext } from "../Context/UserContext";
import Loading from "./Loading/index";

function AppContainer() {
    const [loading, setLoading] = useContext(LoadingContext);
    const [user] = useContext(UserContext);
    const [data, setData] = useContext(DataContext);

    useEffect(() => {
        async function fetchAll() {
            setLoading(true);
            await fetchTheData(data, setData, `bearer ${user.access_token}`);
            setLoading(false);
        }

        fetchAll();
    }, []);

    if (loading) {
        return <Loading />;
    } else {
        return (
            <div className="App">
                <Nav />
            </div>
        );
    }
}

export default AppContainer;
