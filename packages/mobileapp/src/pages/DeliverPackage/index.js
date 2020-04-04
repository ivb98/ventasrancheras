import React from 'react';
import {View, StyleSheet} from 'react-native';
import PackageInfo from '../ReceivePackage/packageInfo';
import Title from '../../base/Title/index';
import DeliveryForm from './form';
import {makeJsonRequest} from '../../lib/request';
import {formatSignature} from '../../lib/util';

const DeliverPackage = ({route, navigation}) => {
  const {pkg} = route.params;
  async function handleSubmit(values) {
    await makeJsonRequest(
      '/delivery/deliver',
      {
        method: 'POST',
        body: JSON.stringify({
          signature: formatSignature(values.signature),
          packageId: pkg.packageId,
        }),
      },
      true,
    );

    navigation.navigate('Home');
  }
  return (
    <View style={styles.container}>
      <Title extraStyles={styles.title}>Entrega de Orden</Title>
      <PackageInfo packageData={pkg.packageId} />
      <DeliveryForm onSubmit={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    marginBottom: 25,
  },
});
export default DeliverPackage;
