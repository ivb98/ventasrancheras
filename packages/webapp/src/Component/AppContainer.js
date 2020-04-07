import React, { useContext, useEffect, useState } from "react";
import Nav from "../Navigation/Nav";
import { DataContext } from "../Context/DataContext";
import { LoadingContext } from "../Context/LoadingContext";
import { fetchTheData } from "../libs/request";

function AppContainer() {
    const [loading, setLoading] = useContext(LoadingContext);
    const [data, setData] = useContext(DataContext);

    useEffect(() => {
        if(!loading){async function fetchAll() {
            
            fetchTheData(data, setData);
            setLoading(true);
        }

        fetchAll();
    }
    }, [loading]);

    console.log(data);

    return (
        <div className="App">
            <Nav />
        </div>
    );
}

export default AppContainer;
