/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useContext, useEffect, useState} from 'react';

import LoginPage from './pages/Login/container';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from './contexts/userContext';
import SplashScreen from './pages/Splashscreen/index';
import {get} from './lib/storage/storage';
import {USER_KEY} from './lib/storage/storage.keys';
const Stack = createStackNavigator();
import DeliveryHomescreen from './pages/HomeScreen/DeliveryHomescreen/index';
import SalesmanHomescreen from './pages/HomeScreen/SalesmanHomescreen/index';
import ReceivePackage from './pages/ReceivePackage/index';
import {setAccessToken} from './lib/request';
import {DataContext} from './contexts/dataContext';
import {fetchInitialData} from './lib/util';
import DeliverPackage from './pages/DeliverPackage/index';

const notLoggedScreens = <Stack.Screen name="Home" component={LoginPage} />;
const deliveryScreens = (
  <>
    <Stack.Screen name="Home" component={DeliveryHomescreen} />
    <Stack.Screen name="ReceivePackage" component={ReceivePackage} />
    <Stack.Screen name="DeliverPackage" component={DeliverPackage} />
  </>
);
const salesmanScreens = (
  <Stack.Screen name="Home" component={SalesmanHomescreen} />
);
const AppContainer: () => React$Node = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [, setData] = useContext(DataContext);

  useEffect(() => {
    async function fetchExistingData() {
      if (!userData.user) {
        let savedUser = await get(USER_KEY);
        let jsonUser = JSON.parse(savedUser);
        if (jsonUser) {
          setAccessToken(jsonUser.access_token);
          fetchInitialData(jsonUser.role, setData);
          setUserData((prev) => ({...prev, isLoading: false, user: jsonUser}));
        } else {
          setUserData((prev) => ({...prev, isLoading: false}));
        }
      } else {
        fetchInitialData(userData.user.role, setData);
      }
    }

    fetchExistingData();
  }, [userData.user]);

  if (userData.isLoading) {
    return <SplashScreen />;
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
