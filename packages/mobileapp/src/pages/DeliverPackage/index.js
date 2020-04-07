import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PackageInfo from '../../components/PackageInfo/container';
import Title from '../../base/Title/index';
import DeliveryForm from './form';
import {makeJsonRequest} from '../../lib/request';
import {formatSignature} from '../../lib/util';
import {updatePackageStatus} from '../../lib/storage/controller';
import {DataContext} from '../../contexts/dataContext';
import Button from '../../base/Button/index';

const DeliverPackage = ({route, navigation}) => {
  const {pkg} = route.params;
  const [data, setData] = useContext(DataContext);
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

    await updatePackageStatus(pkg.packageId, 'Delivered', data, setData);
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Title extraStyles={styles.title}>Entrega de Orden</Title>
        <PackageInfo packageData={pkg.packageId} />
        <DeliveryForm onSubmit={handleSubmit} />
        <View style={styles.buttonContainer}>
          <Button
            text="Volver a pantalla de inicio"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
      </View>
    </ScrollView>
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
  buttonContainer: {
    marginVertical: 15,
  },
});
export default DeliverPackage;
