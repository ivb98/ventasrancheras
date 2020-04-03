import React from 'react';
import {Formik} from 'formik';
import Select from '../../base/Form/Select/index';
import Signature from '../../base/Form/SignatureField/SignatureField';
import Button from '../../base/Button/index';
import {View, StyleSheet} from 'react-native';
import Subtitle from '../../base/Subtitle/index';
import {makeJsonRequest} from '../../lib/request';

const ReceivePackageComponent = ({packages}) => {
  return (
    <Formik
      initialValues={{order: packages[0].value, signature: ''}}
      onSubmit={async values => {
        await makeJsonRequest(
          '/delivery/receive',
          {
            method: 'POST',
            body: JSON.stringify({
              packageId: values.order.packageId,
              signature: `data:image/png;base64,${values.signature}`,
            }),
          },
          true,
        );
      }}>
      {({handleChange, values, handleSubmit}) => (
        <View style={styles.container}>
          {console.log(values)}
          <Subtitle extraStyles={styles.subtitle}>Paquete</Subtitle>
          <Select
            name="order"
            handleChange={handleChange('order')}
            value={values.order}
            values={packages}
          />
          <Subtitle extraStyles={styles.subtitle}>Firma</Subtitle>
          <Signature name="signature" />
          <View style={styles.buttonContainer}>
            <Button text="Submit" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginVertical: 30,
  },
  subtitle: {
    marginVertical: 15,
  },
});
export default ReceivePackageComponent;
