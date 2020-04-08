import React, {useContext} from 'react';
import {Formik} from 'formik';
import Select from '../../base/Form/Select/index';
import Signature from '../../base/Form/SignatureField/SignatureField';
import Button from '../../base/Button/index';
import {View, StyleSheet} from 'react-native';
import Subtitle from '../../base/Subtitle/index';
import {makeJsonRequest} from '../../lib/request';
import PackageInfo from '../../components/PackageInfo/container';
import {updatePackageStatus} from '../../lib/storage/controller';
import {DataContext} from '../../contexts/dataContext';
import {formatSignature} from '../../lib/util';
import * as Yup from 'yup';

const ReceivePackageComponent = ({packages}) => {
  const [data, setData] = useContext(DataContext);
  return (
    <Formik
      initialErrors={{signature: 'Field is required'}}
      initialValues={{order: packages[0].value, signature: ''}}
      validationSchema={validationSchema}
      onSubmit={async values => {
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
      {({
        handleChange,
        values,
        handleSubmit,
        isValid,
        isSubmitting,
        errors,
      }) => (
        <View style={styles.container}>
          <Subtitle extraStyles={styles.subtitle}>Paquete</Subtitle>
          <Select name="order" values={packages} />
          <Subtitle extraStyles={styles.subtitle}>Detalles</Subtitle>
          <PackageInfo packageData={values.order.packageId} />
          <Subtitle extraStyles={styles.subtitle}>Firma</Subtitle>
          <View style={styles.signatureContainer}>
            <Signature name="signature" />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              disabled={!isValid || isSubmitting}
              text="Submit"
              onPress={handleSubmit}
            />
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

const validationSchema = Yup.object().shape({
  signature: Yup.string().required(),
});
export default ReceivePackageComponent;
