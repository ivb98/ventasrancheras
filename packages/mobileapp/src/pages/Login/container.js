import React, {useState, useContext} from 'react';
import {makeJsonRequest} from '../../lib/request';
import {View, StyleSheet} from 'react-native';
import LoginForm from './LoginForm/index';
import Title from '../../base/Title/index';
import {UserContext} from '../../contexts/userContext';
import {save, get} from '../../lib/storage/storage';
import {USER_KEY} from '../../lib/storage/storage.keys';

const Container = () => {
  const [state, setState] = useState({loading: false, error: null});
  const [, setUserData] = useContext(UserContext);

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
      setUserData(prev => {
        return {
          ...prev,
          user: {role: data.role, email: data.email, name: data.name},
        };
      });
      await save(USER_KEY, data);
    } else {
      setState({error, loading: false});
      setFieldValue('password', '');
    }
  }
  return (
    <View style={styles.container}>
      <Title>Login</Title>
      <LoginForm onSubmit={handleSubmit} loading={state.loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    flex: 1,
    marginTop: 90,
  },
});
export default Container;
