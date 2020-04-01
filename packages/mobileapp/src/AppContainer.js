/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {PRIMARY_COLOR} from './styles/theme.style';

import {Formik, FieldArray} from 'formik';
import Button from './base/Button/index';
import Select from './base/Form/Select/index';
import InputField from './base/Form/InputField/index';
import ProductPicker from './base/Form/ProductPicker/index';
import LoginForm from './pages/Login/LoginForm/index';
import useRequest from './hooks/useRequest';
import LoginPage from './pages/Login/container';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from './contexts/userContext';
const Stack = createStackNavigator();

const notLoggedScreens = <Stack.Screen name="Home" component={LoginPage} />;
const deliveryScreens = (
  <Stack.Screen name="Home" component={() => <Text>Hello Delivery</Text>} />
);
const salesmanScreens = (
  <Stack.Screen name="Home" component={() => <Text>Hello Salesman</Text>} />
);
const AppContainer: () => React$Node = () => {
  let [userData, setUserData] = useContext(UserContext);
  useEffect(() => {
    setTimeout(() => {
      setUserData(prev => ({...prev, isLoading: false}));
    }, 1000);
  }, []);

  console.log(userData);
  if (userData.isLoading) {
    return <Text>Loading....</Text>;
  } else {
    let stackScreens = notLoggedScreens;
    if (userData.user && userData.user.role === 'Delivery') {
      stackScreens = deliveryScreens;
    } else if (userData.user && userData.user.role === 'Salesman') {
      stackScreens = salesmanScreens;
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: 'Ventas Rancheras',
          }}>
          {stackScreens}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppContainer;
