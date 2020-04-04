import React, {useContext} from 'react';
import {Formik} from 'formik';
import Select from '../../base/Form/Select/index';
import Signature from '../../base/Form/SignatureField/SignatureField';
import Button from '../../base/Button/index';
import {View, StyleSheet} from 'react-native';
import Subtitle from '../../base/Subtitle/index';
import {makeJsonRequest} from '../../lib/request';
import PackageInfo from './packageInfo';
import {updatePackageStatus} from '../../lib/storage/controller';
import {DataContext} from '../../contexts/dataContext';
import {formatSignature} from '../../lib/util';

const ReceivePackageComponent = ({packages}) => {
  const [data, setData] = useContext(DataContext);
  return (
    <Formik
      initialValues={{order: packages[0].value, signature: ''}}
      onSubmit={async (values) => {
        await makeJsonRequest(
          '/delivery/receive',
          {
            method: 'POST',
            body: JSON.stringify({
              packageId: values.order.packageId,
              signature: formatSignature(values.signature),
            }),
          },
          true,
        );
        updatePackageStatus(values.order.packageId, 'Picked Up', data, setData);
      }}>
      {({handleChange, values, handleSubmit}) => (
        <View style={styles.container}>
          <Subtitle extraStyles={styles.subtitle}>Paquete</Subtitle>
          <Select
            name="order"
            handleChange={handleChange('order')}
            value={values.order}
            values={packages}
          />
          <Subtitle extraStyles={styles.subtitle}>Detalles</Subtitle>
          <PackageInfo packageData={values.order.packageId} />
          <Subtitle extraStyles={styles.subtitle}>Firma</Subtitle>
          <View style={styles.signatureContainer}>
            <Signature name="signature" />
          </View>
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
  signatureContainer: {
    height: 250,
  },
});
export default ReceivePackageComponent;
