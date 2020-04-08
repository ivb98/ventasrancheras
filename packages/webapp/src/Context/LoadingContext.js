import React, { useState } from "react";

export const LoadingContext = React.createContext();


export const LoadingProvider = props => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {props.children}
    </LoadingContext.Provider>
  );
};
