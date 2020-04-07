import React, {useContext} from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';
import {DataContext} from '../../../contexts/dataContext';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from '../../../lib/util';

function getLatAndLong(packageId, packages, customers) {
  for (let i = 0; i < packages.length; i++) {
    for (let j = 0; j < customers.length; j++) {
      if (
        packages[i].id === packageId &&
        packages[i].customer.id === customers[j].id
      ) {
        return {
          lat: customers[j].shipAddr.lat,
          long: customers[j].shipAddr.long,
        };
      }
    }
  }

  return {lat: null, long: null};
}
async function getLocation(originalData) {
  const data = JSON.parse(JSON.stringify(originalData));

  return new Promise((resolve, reject) => {
    if (!data.me.packages.length) {
      return resolve({lat: null, long: null});
    }
    data.me.packages = data.me.packages.filter(
      pkg => pkg.status === 'Picked Up',
    );
    if (data.me.packages.length === 0) {
      return resolve({lat: null, long: null});
    }
    Geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      const initialLatLong = getLatAndLong(
        data.me.packages[0].packageId,
        data.packages,
        data.customers,
      );
      let next = {
        visit: data.me.packages[0],
        distance: getDistance({lat: latitude, long: longitude}, initialLatLong),
        ...initialLatLong,
      };
      for (let i = 0; i < data.me.packages.length; i++) {
        const {lat, long} = getLatAndLong(
          data.me.packages[i].packageId,
          data.packages,
          data.customers,
        );
        const distance = getDistance(
          {lat: latitude, long: longitude},
          {lat, long},
        );
        if (distance < next.distance) {
          next = {
            visit: data.me.packages[i],
            distance: distance,
            lat,
            long,
          };
        }
      }
      return resolve({...next.visit, lat: next.lat, long: next.long});
    });
  });
}
const DeliveryHomescreen = ({navigation}) => {
  const [data] = useContext(DataContext);
  const loading = data.loading;
  return (
    <Homescreen
      title={'Delivery'}
      buttonArray={[
        <Button
          disabled={loading.isLoading}
          key={'d-1'}
          text="Mi Ruta"
          onPress={async () => {
            let next = await getLocation(data);
            if (next.lat === null) {
              navigation.navigate('Message', {
                message: 'No has recibido mas paquetes',
              });
            } else {
              navigation.navigate('Map', {
                lat: next.lat,
                long: next.long,
                pkg: {
                  ...next,
                },
              });
            }
          }}
        />,
        <Button
          key={'d-3'}
          disabled={loading.isLoading}
          text="Recibir Paquetes"
          onPress={() => {
            navigation.navigate('ReceivePackage');
          }}
        />,
      ]}
    />
  );
};

export default DeliveryHomescreen;
