import React, {useContext} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Title from '../../base/Title/index';
import InventoryForm from './form';
import Button from '../../base/Button/index';
import {DataContext} from '../../contexts/dataContext';
import {formatItems} from '../../lib/util';

const Inventory = ({navigation, route}) => {
  const [data] = useContext(DataContext);
  let orderId = route.params.visit.lastOrderId;
  const foundPkg = data.packages.find(pkg => pkg.id == orderId) || null;
  let packageItems = [];
  if (foundPkg) {
    let items = data.items;
    packageItems = foundPkg.items.map(item => {
      return items.find(it => {
        return it.id === item.id;
      });
    });
  }
  return (
    <ScrollView style={styles.container}>
      <Title extraStyles={styles.title}>Pasar Inventario</Title>
      {foundPkg ? (
        <InventoryForm items={formatItems(packageItems)} />
      ) : (
        <Title extraStyles={styles.title}>No hay inventario previo</Title>
      )}
      <View style={styles.buttonContainer}>
        <Button
          text={'Continuar'}
          onPress={() => {
            navigation.navigate('SalesOrder', {visit: route.params.visit});
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 15,
  },
  buttonContainer: {
    marginVertical: 15,
  },
});
export default Inventory;
