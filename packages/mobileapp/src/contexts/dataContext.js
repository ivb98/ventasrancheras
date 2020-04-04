import React, {useState} from 'react';

export const DataContext = React.createContext();
export const initialDataState = {
  packages: [],
  items: [],
  customers: [],
  visits: [],
  me: [],
};

export const DataProvider = (props) => {
  const [data, setData] = useState(initialDataState);

  return (
    <DataContext.Provider value={[data, setData]}>
      {props.children}
    </DataContext.Provider>
  );
};
