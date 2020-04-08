/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useEffect, useContext, useRef, useState} from 'react';
import {UserProvider} from './contexts/userContext';
import {DataProvider} from './contexts/dataContext';
import AppContainer from './AppContainer';
import {NetworkProvider, NetworkConsumer} from 'react-native-offline';
import {PermissionsAndroid} from 'react-native';
import {DataContext} from './contexts/dataContext';
import SplashScreen from './pages/Splashscreen/index';

const App = () => {
  const [permissions, setPermission] = useState(false);

  useEffect(() => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(async permission => {
      setPermission(permission);
      if (!permission) {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );

          setPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
        } catch (err) {
          console.warn(err);
        }
      }
    });
  }, []);

  if (!permissions) {
    return <SplashScreen />;
  }
  return (
    <UserProvider>
      <DataProvider>
        <NetworkProvider>
          <AppContainer />
        </NetworkProvider>
      </DataProvider>
    </UserProvider>
  );
};

export default App;
