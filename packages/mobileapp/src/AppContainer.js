/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useContext, useEffect} from 'react';

import LoginPage from './pages/Login/container';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from './contexts/userContext';
import SplashScreen from './pages/Splashscreen/index';
import {get, save} from './lib/storage/storage';
import {
  USER_KEY,
  CUSTOMER_KEY,
  ITEM_KEY,
  ME_KEY,
  PACKAGE_KEY,
} from './lib/storage/storage.keys';
const Stack = createStackNavigator();
import DeliveryHomescreen from './pages/HomeScreen/DeliveryHomescreen/index';
import SalesmanHomescreen from './pages/HomeScreen/SalesmanHomescreen/index';
import ReceivePackage from './pages/ReceivePackage/index';
import {makeJsonRequest, setAccessToken} from './lib/request';
import {DataContext} from './contexts/dataContext';

async function fetchInitialData(role, setData) {
  console.log('data');
  let packageData = await makeJsonRequest('/package', {}, true);
  console.log('done');
  if (packageData.error) {
  } else {
    await save(PACKAGE_KEY, packageData);
  }

  let itemsData = await makeJsonRequest('/item', {}, true);
  console.log('done');

  if (itemsData.error) {
    console.log(itemsData.error);
  } else {
    await save(ITEM_KEY, itemsData);
  }

  let customersData = await makeJsonRequest('/customer', {}, true);
  console.log('done');

  if (customersData.error) {
    console.log(customersData.error);
  } else {
    await save(CUSTOMER_KEY, customersData);
  }

  let myData = await makeJsonRequest(`/${role}/me`, {}, true);
  console.log('done');

  if (myData.error) {
    console.log(myData.error);
  } else {
    await save(ME_KEY, myData);
  }

  setData((prev) => ({
    ...prev,
    packages: packageData,
    items: itemsData,
    customers: customersData,
    me: myData,
  }));
}
const notLoggedScreens = <Stack.Screen name="Home" component={LoginPage} />;
const deliveryScreens = (
  <>
    <Stack.Screen name="Home" component={DeliveryHomescreen} />
    <Stack.Screen name="ReceivePackage" component={ReceivePackage} />
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
      let user = await get(USER_KEY);
      let jsonUser = JSON.parse(user);
      setAccessToken(jsonUser.access_token);
      setUserData((prev) => ({...prev, isLoading: false, user: jsonUser}));
      fetchInitialData(jsonUser.role, setData);
    }

    fetchExistingData();
  }, []);

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
