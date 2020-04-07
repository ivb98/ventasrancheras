import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Title from '../../base/Title/index';
import {DataContext} from '../../contexts/dataContext';
import Form from './form';
import {formatItems} from '../../lib/util';
import Button from '../../base/Button/index';

const SalesOrder = ({route, navigation}) => {
  console.log(route.params);
  let [data, setData] = useContext(DataContext);
  let visitId = route.params.visit.id;
  let customerId = route.params.visit.customer_id;

  return (
    <ScrollView style={styles.container}>
      <View>
        <Title extraStyles={styles.title}>Orden de Ventas</Title>
        <Form
          items={data.items ? formatItems(data.items) : []}
          ids={{visitId, customerId}}
          data={data}
          setData={setData}
        />
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
  },
  title: {
    marginBottom: 25,
  },
  buttonContainer: {
    marginVertical: 15,
  },
});
export default SalesOrder;
