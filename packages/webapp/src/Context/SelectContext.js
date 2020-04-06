import React from "react";

const SelectStateContext = React.createContext();
const SelectDispatchContext = React.createContext();

const initialState = {
    pack: { },
    person: {}

}

function selectReducer(state, action) {
    switch (action.type) {
        case "selectPackage": {
            return { pack: action.pack };
        }
        case "selectPerson": {
            return { person: action.person };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function SelectProvider({ children }) {

    const [state, dispatch] = React.useReducer(selectReducer,initialState)
    return (
        <SelectStateContext.Provider value={state}>
            <SelectDispatchContext.Provider value={dispatch}>
                {children}
            </SelectDispatchContext.Provider>
        </SelectStateContext.Provider>
    );
}

function useSelectState() {
    const context = React.useContext(SelectStateContext);
    if (context === undefined) {
        throw new Error("useSelectState must be used within a SelectProvider");
    }
    return context;
}

function useSelectDispatch() {
    const context = React.useContext(SelectDispatchContext);
    if (context === undefined) {
        throw new Error("useSelectDispatch must be used within a SelectProvider");
    }
    return context;
}

export { SelectProvider, useSelectState, useSelectDispatch };
