import React, {useContext} from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';
import {DataContext} from '../../../contexts/dataContext';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from '../../../lib/util';

function getMetaData(visit, customers) {
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].id === visit.customer_id) {
      return {
        lat: customers[i].shipAddr.lat,
        long: customers[i].shipAddr.long,
        user: customers[i].displayName,
      };
    }
  }

  return {lat: null, long: null};
}
async function getLocation(originalData) {
  const data = JSON.parse(JSON.stringify(originalData));
  return new Promise((resolve, reject) => {
    if (!data.me.salesman.visits.length) {
      return resolve({lat: null, long: null, user: null});
    }
    data.me.salesman.visits = data.me.salesman.visits.filter(
      visit => visit.visited === false,
    );
    if (data.me.salesman.visits.length === 0) {
      return resolve({lat: null, long: null, user: null});
    }
    Geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      const initialLatLong = getMetaData(
        data.me.salesman.visits[0],
        data.customers,
      );
      let next = {
        visit: data.me.salesman.visits[0],
        distance: getDistance({lat: latitude, long: longitude}, initialLatLong),
        ...initialLatLong,
      };
      for (let i = 0; i < data.me.salesman.visits.length; i++) {
        const {lat, long, user} = getMetaData(
          data.me.salesman.visits[i],
          data.customers,
        );
        const distance = getDistance(
          {lat: latitude, long: longitude},
          {lat, long},
        );
        if (distance < next.distance) {
          next = {
            visit: data.me.salesman.visits[i],
            distance: distance,
            lat,
            long,
            user,
          };
        }
      }
      return resolve({
        ...next.visit,
        lat: next.lat,
        long: next.long,
        user: next.user,
      });
    });
  });
}
const SalesmanHomescreen = ({navigation}) => {
  const [data] = useContext(DataContext);
  const loading = data.loading;
  let subtitle = '';
  if (data.me && data.me.salesman && data.me.salesman.name) {
    subtitle = data.me.salesman.name;
  }
  return (
    <Homescreen
      title={'Salesman'}
      subtitle={subtitle}
      buttonArray={[
        <Button
          disabled={loading.isLoading}
          key={'1'}
          text="Mi Ruta"
          onPress={async () => {
            const pos = await getLocation(data);
            if (pos.lat === null) {
              navigation.navigate('Message', {
                message: 'No hay mas clientes por visitar',
              });
            } else {
              navigation.navigate('Map', {
                lat: pos.lat,
                long: pos.long,
                userName: pos.user,
                visit: {
                  ...pos,
                },
              });
            }
          }}
        />,
        <Button
          disabled={loading.isLoading}
          key={'3'}
          text="Recibir Pago"
          onPress={() => {
            navigation.navigate('Payment');
          }}
        />,
      ]}
    />
  );
};

export default SalesmanHomescreen;
