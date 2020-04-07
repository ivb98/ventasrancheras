import React, { useState } from "react";

export const DataContext = React.createContext();
export const initialDataState = {
  packages: [],
  deliveries: [],
  customers: [],
  salesmen: [],
  loading: {
    isLoading: false,
    current: 1,
    total: 1
  }
};

export const DataProvider = props => {
  const [data, setData] = useState(initialDataState);

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
