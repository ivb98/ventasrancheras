import React, {useState} from 'react';
import {makeJsonRequest} from '../../lib/request';
import {View, StyleSheet} from 'react-native';
import LoginForm from './LoginForm/index';
import Title from '../../base/Title/index';

const Container = () => {
  const [state, setState] = useState({loading: false, error: null});
  async function handleSubmit(values, {setSubmitting, setFieldValue}) {
    let {email, password} = values;
    setState({error: null, loading: true});
    setSubmitting(true);
    let {error, ...data} = await makeJsonRequest('http://10.0.0.23:3000/auth', {
      method: 'POST',
      body: JSON.stringify({email, password}),
    });
    if (!error) {
      setState({error: null, loading: false});
    } else {
      setState({error, loading: false});
      setFieldValue('password', '');
    }
  }
  return (
    <View style={styles.container}>
      <Title>Login Form</Title>
      <LoginForm onSubmit={handleSubmit} loading={state.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
});
export default Container;
