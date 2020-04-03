import React, {useEffect, useState} from 'react';
import ReceivePackageComponent from './component';
import {View, StyleSheet, Text} from 'react-native';
import {get} from '../../lib/storage/storage';
import {ME_KEY} from '../../lib/storage/storage.keys';

const ReceivePackage = () => {
  let [packages, setPackages] = useState([]);
  useEffect(() => {
    async function getPackages() {
      let pkgs = await get(ME_KEY);
      setPackages(
        JSON.parse(pkgs).packages.map(({status, ...pkg}) => ({
          label: `Package #${pkg.packageId}`,
          value: {...pkg},
        })),
      );
    }

    getPackages();
  }, []);
  if (packages.length === 0) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <ReceivePackageComponent packages={packages} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    height: 500,
  },
});

export default ReceivePackage;
