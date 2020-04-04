import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Title from '../../base/Title/index';
import {DataContext} from '../../contexts/dataContext';
import Form from './form';

function formatItems(items) {
  let categories = {};
  for (const item of items) {
    item.qty = '0';
    item.price = item.unitPrice;
    const {category} = item;
    categories[category] = categories[category]
      ? [...categories[category], item]
      : [item];
  }
  let formattedItems = [];
  for (const category in categories) {
    formattedItems.push({
      name: category,
      items: categories[category],
    });
  }
  return formattedItems;
}
const SalesOrder = () => {
  let [data] = useContext(DataContext);
  let visitId = data.me.salesman.visits[0].id;
  let customerId = data.me.salesman.visits[0].customer_id;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Title extraStyles={styles.title}>Orden de Ventas</Title>
        <Form
          items={data.items ? formatItems(data.items) : []}
          ids={{visitId, customerId}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 25,
  },
});
export default SalesOrder;
