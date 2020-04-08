import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Subtitle from '../../base/Subtitle/index';

const SalesOrderInfo = ({items}) => {
  const total = items.reduce(
    (acc, {qty, unitPrice}) => (acc += qty * unitPrice),
    0,
  );
  return (
    <View style={styles.container}>
      {items.map((item, i) => (
        <View style={styles.row} key={i}>
          <Text>{`${item.name}:`}</Text>
          <Text>
            {`${item.unitPrice} $ x ${item.qty} units`} {'\n'}
          </Text>
        </View>
      ))}
      <Subtitle extraStyles={styles.total}>Total {total} $</Subtitle>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontWeight: 'bold',
  },
});
export default SalesOrderInfo;
