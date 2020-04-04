import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {get} from '../../lib/storage/storage';
import {PACKAGE_KEY} from '../../lib/storage/storage.keys';

const PackageInfo = ({packageData}) => {
  let [info, setInfo] = useState(null);
  useEffect(() => {
    async function getPackageData() {
      setInfo(null);
      let packages = JSON.parse(await get(PACKAGE_KEY));
      let pkg = packages.find(pk => pk.id == packageData);
      let formatInfo = pkg.items.map((item, i) => (
        <View key={i} style={styles.itemRow}>
          <Text>{`${item.name}:`}</Text>
          <Text>
            {`${item.unitPrice} $ x ${item.qty} units`} {'\n'}
          </Text>
        </View>
      ));
      setInfo(formatInfo);
    }

    getPackageData();
  }, [packageData]);

  if (!info) {
    return <Text>Loading</Text>;
  }
  return <View>{info}</View>;
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PackageInfo;
