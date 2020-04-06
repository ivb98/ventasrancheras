/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useEffect, useContext, useRef} from 'react';
import {UserProvider} from './contexts/userContext';
import {DataProvider} from './contexts/dataContext';
import AppContainer from './AppContainer';
import {NetworkProvider, NetworkConsumer} from 'react-native-offline';
import {Text} from 'react-native';
import {DataContext} from './contexts/dataContext';

const NOT_LOADED = 0;
const LOADING = 1;
const LOADED = 2;

const Conditional = ({isConnected}) => {
  const loaded = useRef(NOT_LOADED);
  const [data] = useContext(DataContext);

  useEffect(() => {}, [data.internetConnection]);

  return <AppContainer />;
};

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
          httpMethod="HEAD"
          pingInterval={500}>
          <AppContainer />
        </NetworkProvider>
      </DataProvider>
    </UserProvider>
  );
};

export default App;
