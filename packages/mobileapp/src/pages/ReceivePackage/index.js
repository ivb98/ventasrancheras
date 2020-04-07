import React, {useEffect, useState, useContext} from 'react';
import ReceivePackageComponent from './component';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {DataContext} from '../../contexts/dataContext';
import MessageScreen from '../MessageScreen/index';

const ReceivePackage = ({navigation, route}) => {
  let [packages, setPackages] = useState(null);
  const [data] = useContext(DataContext);
  useEffect(() => {
    function getPackages() {
      setPackages(
        data.me.packages
          .filter(({status}) => status === 'Not Picked Up')
          .map(({status, ...pkg}) => ({
            label: `Package #${pkg.packageId}`,
            value: {...pkg},
          })),
      );
    }

    getPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (packages === null) {
    return <Text>Loading</Text>;
  }

  if (packages.length === 0) {
    route.params = {};
    route.params.message = 'No hay mas paquetes por recibir.';
    return <MessageScreen route={route} navigation={navigation} />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ReceivePackageComponent packages={packages} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default ReceivePackage;
