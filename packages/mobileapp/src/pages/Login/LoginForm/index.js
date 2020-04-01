import React from 'react';
import {Formik} from 'formik';
import {View, StyleSheet} from 'react-native';
import InputField from '../../../base/Form/InputField/index';
import Button from '../../../base/Button/index';

const LoginForm = ({onSubmit}) => {
  return (
    <Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit}>
      {({values, handleSubmit, handleChange, isSubmitting}) => (
        <View style={styles.form}>
          <InputField
            handleChange={handleChange('email')}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <InputField
            handleChange={handleChange('password')}
            value={values.password}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.button}>
            <Button
              onPress={handleSubmit}
              text="LOGIN"
              disabled={isSubmitting}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
});
export default LoginForm;
