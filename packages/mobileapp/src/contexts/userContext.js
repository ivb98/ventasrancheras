import React, {useState} from 'react';

export const UserContext = React.createContext();
export const initialUserState = {isLoading: true, user: null};

export const UserProvider = props => {
  const [userData, setUserData] = useState(initialUserState);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {props.children}
    </UserContext.Provider>
  );
};
