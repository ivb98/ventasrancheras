/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {PRIMARY_COLOR} from './styles/theme.style';

import {Formik, FieldArray} from 'formik';
import Button from './base/Button/index';
import Select from './base/Form/Select/index';
import InputField from './base/Form/InputField/index';
import ProductPicker from './base/Form/ProductPicker/index';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Hello World </Text>
          <Select />
          <Formik
            initialValues={{
              email: '',
              password: '',
              prof: 'phd',
              items: [
                {
                  name: 'home',
                  items: [
                    {
                      name: 'sofa',
                      price: 30,
                      qty: '0',
                    },
                    {
                      name: 'refrigerator',
                      price: 3000,
                      qty: '0',
                    },
                    {
                      name: 'oven',
                      price: 200,
                      qty: '0',
                    },
                  ],
                },
                {
                  name: 'phones',
                  items: [
                    {
                      name: 'samsung',
                      price: 148,
                      qty: '0',
                    },
                    {
                      name: 'iphone',
                      price: 57,
                      qty: '0',
                    },
                    {
                      name: 'google',
                      price: 57,
                      qty: '0',
                    },
                  ],
                },
              ],
            }}
            onSubmit={values => {
              console.log(values);
            }}>
            {({handleChange, handleSubmit, values}) => (
              <View>
                <InputField
                  handleChange={handleChange('email')}
                  value={values.email}
                />
                <InputField
                  handleChange={handleChange('password')}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <Select
                  handleChange={handleChange('prof')}
                  value={values.prof}
                  values={['astronaut', 'doctor', 'phd']}
                  placeholder="Prof"
                />
                <ProductPicker
                  handleChange={handleChange}
                  values={values}
                  placeholder="Amount"
                />
                <Button
                  color={'#FF0000'}
                  text="Submit"
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
