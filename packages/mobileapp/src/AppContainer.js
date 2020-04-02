/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';

import LoginPage from './pages/Login/container';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {UserContext} from './contexts/userContext';
import SplashScreen from './pages/Splashscreen/index';
import {get} from './lib/storage/storage';
import {USER_KEY} from './lib/storage/storage.keys';
const Stack = createStackNavigator();
import Signature from './base/Form/SignatureField/SignatureField';
import {Formik} from 'formik';
import Button from './base/Button';

const notLoggedScreens = <Stack.Screen name="Home" component={LoginPage} />;
const deliveryScreens = (
  <Stack.Screen name="Home" component={() => <Text>Hello Delivery</Text>} />
);
const salesmanScreens = (
  <Stack.Screen
    name="Home"
    component={() => {
      return (
        <View style={{height: 300}}>
          <Formik
            initialValues={{signature: ''}}
            onSubmit={values => {
              console.log(values);
            }}>
            {({handleChange, handleSubmit}) => (
              <View style={{flex: 1}}>
                <Signature name="signature" />
                <View style={{marginTop: 30}}>
                  <Button text="submit" onPress={handleSubmit} />
                </View>
              </View>
            )}
          </Formik>
        </View>
      );
    }}
  />
);
const AppContainer: () => React$Node = () => {
  let [userData, setUserData] = useContext(UserContext);
  useEffect(() => {
    async function fetchExistingData() {
      let user = await get(USER_KEY);
      let jsonUser = JSON.parse(user);
      setUserData(prev => ({...prev, isLoading: false, user: jsonUser}));
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
