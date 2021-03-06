import React from 'react';
import {Formik} from 'formik';
import SignatureField from '../../base/Form/SignatureField/SignatureField';
import Button from '../../base/Button/index';
import {View, StyleSheet} from 'react-native';
import Subtitle from '../../base/Subtitle/index';
import * as Yup from 'yup';

const PackageDeliveryForm = ({onSubmit}) => {
  return (
    <Formik
      initialValues={{signature: ''}}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialErrors={{signature: 'Field is required'}}>
      {({handleSubmit, isSubmitting, isValid}) => (
        <View>
          <Subtitle extraStyles={styles.subtitle}>Firma del cliente</Subtitle>
          <View style={styles.signatureContainer}>
            <SignatureField name="signature" />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              text="Entregar"
              onPress={handleSubmit}
              disabled={isSubmitting || !isValid}
            />
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
  signatureContainer: {
    height: 250,
  },
  subtitle: {
    marginVertical: 15,
  },
});

const validationSchema = Yup.object().shape({
  signature: Yup.string().required(),
});
export default PackageDeliveryForm;
