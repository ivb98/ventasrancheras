/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {UserProvider} from './contexts/userContext';
import {DataProvider} from './contexts/dataContext';
import AppContainer from './AppContainer';
import {NetworkProvider} from 'react-native-offline';

const App: () => React$Node = () => {
  return (
    <UserProvider>
      <DataProvider>
        <NetworkProvider
          pingServerUrl="http://10.0.0.10:4000/ping"
          shouldPing={true}
          pingInBackground={true}
          pingOnlyIfOffline={false}
          pingTimeout={1000}
          httpMethod="OPTIONS"
          pingInterval={500}>
          <AppContainer />
        </NetworkProvider>
      </DataProvider>
    </UserProvider>
  );
};

export default App;
