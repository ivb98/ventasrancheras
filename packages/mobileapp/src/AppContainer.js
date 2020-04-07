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
import {get, remove} from './lib/storage/storage';
import {USER_KEY, CACHE_KEY} from './lib/storage/storage.keys';
const Stack = createStackNavigator();
import DeliveryHomescreen from './pages/HomeScreen/DeliveryHomescreen/index';
import SalesmanHomescreen from './pages/HomeScreen/SalesmanHomescreen/index';
import ReceivePackage from './pages/ReceivePackage/index';
import {setAccessToken, setConnectivity, makeJsonRequest} from './lib/request';
import {DataContext} from './contexts/dataContext';
import {fetchInitialData} from './lib/util';
import DeliverPackage from './pages/DeliverPackage/index';
import SalesOrder from './pages/SalesOrder/index';
import Payment from './pages/Payment/index';
import Inventory from './pages/Inventory/index';
import MapScreen from './pages/maps/index';
import {Text} from 'react-native';
import {NetworkConsumer} from 'react-native-offline';
import Geolocation from '@react-native-community/geolocation';

async function getCacheStuff(role, setData) {
  let cached = await get(CACHE_KEY);
  await remove(CACHE_KEY);
  if (cached) {
    cached = JSON.parse(cached);
    cached = cached.sort((a, b) => a.date > b.date);

    for (let i = 0; i < cached.length; i++) {
      setData(prev => ({
        ...prev,
        loading: {
          isLoading: true,
          current: i + 1,
          total: cached.length,
          message: 'Sincronizando data',
        },
      }));
      const cachedRequest = cached[i];
      await makeJsonRequest(
        cachedRequest.endpoint,
        cachedRequest.options,
        true,
        true,
      );
    }
  }
  fetchInitialData(role, setData, {internetConnection: true});
}
const notLoggedScreens = <Stack.Screen name="Home" component={LoginPage} />;
const deliveryScreens = (
  <>
    <Stack.Screen name="Home" component={DeliveryHomescreen} />
    <Stack.Screen name="ReceivePackage" component={ReceivePackage} />
    <Stack.Screen name="DeliverPackage" component={DeliverPackage} />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      initialParams={{next: 'DeliverPackage'}}
    />
  </>
);
const salesmanScreens = (
  <>
    <Stack.Screen name="Home" component={SalesmanHomescreen} />
    <Stack.Screen name="SalesOrder" component={SalesOrder} />
    <Stack.Screen name="Payment" component={Payment} />
    <Stack.Screen name="Inventory" component={Inventory} />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      initialParams={{next: 'Inventory'}}
    />
  </>
);

function toggleData(data, setData, isConnected) {
  setData(prev => ({...prev, internetConnection: isConnected}));
  setConnectivity(isConnected);
}
const AppContainer: () => React$Node = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [data, setData] = useContext(DataContext);

  useEffect(() => {
    Geolocation.getCurrentPosition(pos => {
      console.log(pos);
    });
    async function fetchExistingData() {
      if (!userData.user) {
        let savedUser = await get(USER_KEY);
        let jsonUser = JSON.parse(savedUser);
        if (jsonUser) {
          setAccessToken(jsonUser.access_token);
          fetchInitialData(jsonUser.role, setData, data);
          setUserData(prev => ({
            ...prev,
            isLoading: false,
            user: jsonUser,
          }));
        } else {
          setUserData(prev => ({...prev, isLoading: false}));
        }
      } else {
        setAccessToken(userData.user.access_token);
        fetchInitialData(userData.user.role, setData, data);
      }
    }

    fetchExistingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <NetworkConsumer>
          {({isConnected}) => {
            console.log('is connected', isConnected);
            if (data.internetConnection !== isConnected) {
              toggleData(data, setData, isConnected);
              if (isConnected && userData.user) {
                getCacheStuff(userData.user.role, setData, data);
              }
            }
            return <Text>Internet: {isConnected.toString()}</Text>;
          }}
        </NetworkConsumer>
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
