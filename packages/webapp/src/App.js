import React from "react";
import AppContainer from "./Component/AppContainer";
import { DataProvider } from "./Context/DataContext";
import { LoadingProvider } from "./Context/LoadingContext";

function App() {
    return (
        <LoadingProvider>
            <DataProvider>
                <AppContainer />
            </DataProvider>
        </LoadingProvider>
    );
}

export default App;
