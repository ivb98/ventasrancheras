import React, {useContext} from 'react';
import Button from '../../base/Button/index';
import {clearAll} from '../../lib/storage/storage';
import {UserContext} from '../../contexts/userContext';

async function logOut(setUserData) {
  await clearAll();
  setUserData(prev => ({...prev, isLoading: false, user: null}));
}
const LogOutButton = () => {
  const [, setUserData] = useContext(UserContext);
  return (
    <Button
      text="Log Out"
      onPress={() => {
        logOut(setUserData);
      }}
    />
  );
};

export default LogOutButton;
