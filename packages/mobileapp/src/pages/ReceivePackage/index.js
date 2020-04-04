import React, {useEffect, useState, useContext} from 'react';
import ReceivePackageComponent from './component';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {DataContext} from '../../contexts/dataContext';

const ReceivePackage = () => {
  let [packages, setPackages] = useState(null);
  const [data] = useContext(DataContext);
  useEffect(() => {
    async function getPackages() {
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
  }, []);
  if (packages === null) {
    return <Text>Loading</Text>;
  }

  if (packages.length === 0) {
    return <Text>No hay mas paquetes asignados para ti</Text>;
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
