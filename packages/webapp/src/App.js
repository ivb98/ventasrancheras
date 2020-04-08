import React, { useEffect, useState, useContext } from "react";
import AppContainer from "./Component/AppContainer";
import { DataProvider } from "./Context/DataContext";
import { LoadingProvider } from "./Context/LoadingContext";
import Loading from "./Component/Loading/index";
import { UserContext } from "./Context/UserContext";

function App() {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useContext(UserContext);
    useEffect(() => {
        let data = localStorage.getItem("login");
        if (data) {
            data = JSON.parse(data);
            setUser({ ...data, login: true });
        }
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <Loading />;
    }

    return (
        <LoadingProvider>
            <DataProvider>
                <AppContainer />
            </DataProvider>
        </LoadingProvider>
    );
}

export default App;
