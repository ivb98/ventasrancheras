import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Title from '../../base/Title/index';
import Form from './form';
import {DataContext} from '../../contexts/dataContext';

const PaymentPage = () => {
  const [data] = useContext(DataContext);
  const customers = data.customers.map(customer => {
    let balance = 0;
    if (customer.balance) {
      balance = customer.balance < 0 ? 0 : customer.balance;
    }
    return {
      label: customer.displayName,
      value: {
        id: customer.id,
        balance,
      },
    };
  });
  return (
    <View style={styles.container}>
      <Title extraStyles={styles.title}>Pagos</Title>
      <Form customers={customers} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    marginVertical: 15,
  },
});

export default PaymentPage;
