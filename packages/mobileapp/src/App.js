/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {UserProvider} from './contexts/userContext';
import AppContainer from './AppContainer';

const App: () => React$Node = () => {
  return (
    <UserProvider>
      <AppContainer />
    </UserProvider>
  );
};

export default App;
