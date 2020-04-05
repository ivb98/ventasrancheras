import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {get} from '../../lib/storage/storage';
import {PACKAGE_KEY} from '../../lib/storage/storage.keys';
import MyPackage from './component';

const PackageInfo = ({packageData}) => {
  let [info, setInfo] = useState(null);
  useEffect(() => {
    async function getPackageData() {
      setInfo(null);
      let packages = JSON.parse(await get(PACKAGE_KEY));
      let pkg = packages.find(pk => pk.id == packageData).items;
      setInfo(pkg);
    }

    getPackageData();
  }, [packageData]);

  if (!info) {
    return <Text>Loading</Text>;
  }
  return <MyPackage items={info} />;
};

export default PackageInfo;
