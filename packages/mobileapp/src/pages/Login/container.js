import React, {useState, useContext} from 'react';
import {makeJsonRequest, setAccessToken} from '../../lib/request';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import LoginForm from './LoginForm/index';
import Title from '../../base/Title/index';
import {UserContext} from '../../contexts/userContext';
import {save} from '../../lib/storage/storage';
import {USER_KEY} from '../../lib/storage/storage.keys';

function showErrorMessage() {
  ToastAndroid.show('Credenciales erroneos', ToastAndroid.SHORT);
}
const Container = () => {
  const [state, setState] = useState({loading: false, error: null});
  const [, setUserData] = useContext(UserContext);

  async function handleSubmit(values, {setSubmitting, setFieldValue}) {
    let {email, password} = values;
    setState({error: null, loading: true});
    setSubmitting(true);
    let {error, ...data} = await makeJsonRequest(
      '/auth',
      {
        method: 'POST',
        body: JSON.stringify({email, password}),
      },
      false,
      false,
    );
    if (!error) {
      setState({error: null, loading: false});
      setAccessToken(data.access_token);
      setUserData(prev => {
        return {
          ...prev,
          user: {...data},
        };
      });
      await save(USER_KEY, data);
    } else {
      setState({error, loading: false});
      showErrorMessage();
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
