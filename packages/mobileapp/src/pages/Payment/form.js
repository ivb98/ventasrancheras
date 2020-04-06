import React from 'react';
import {Formik} from 'formik';
import {View, StyleSheet} from 'react-native';
import Select from '../../base/Form/Select/index';
import InputField from '../../base/Form/InputField/index';
import Subtitle from '../../base/Subtitle';
import Button from '../../base/Button/index';
import {makeJsonRequest} from '../../lib/request';

const Payment = ({customers}) => {
  return (
    <Formik
      initialValues={{customer: customers[3].value, amount: '0'}}
      onSubmit={async values => {
        await makeJsonRequest(
          '/payment',
          {
            method: 'POST',
            body: JSON.stringify({
              totalAmt: values.amount,
              customerId: values.customer.id,
            }),
          },
          true,
        );
      }}>
      {({values, handleChange, handleSubmit}) => (
        <View>
          <Subtitle>Cliente</Subtitle>
          <Select name="customer" values={customers} />
          <Subtitle>Cantidad</Subtitle>
          <InputField
            name="amount"
            handleChange={handleChange('amount')}
            value={values.amount}
            keyboardType="number-pad"
          />
          <Subtitle>Deuda de {values.customer.balance} $</Subtitle>
          <View style={styles.buttonContainer}>
            <Button text="Submit" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 25,
  },
});
export default Payment;
