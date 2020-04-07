import React, {useContext} from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';
import {DataContext} from '../../../contexts/dataContext';
import Geolocation from '@react-native-community/geolocation';

function getDistance(current, destination) {
  return Math.sqrt(
    Math.pow(current.lat - destination.lat, 2) +
      Math.pow(current.long - destination.long, 2),
  );
}
function getLatAndLong(visit, customers) {
  for (let i = 0; i < customers.length; i++) {
    if (customers[i].id === visit.customer_id) {
      return {lat: customers[i].shipAddr.lat, long: customers[i].shipAddr.long};
    }
  }

  return {lat: null, long: null};
}
async function getLocation(data) {
  return new Promise((resolve, reject) => {
    if (!data.me.salesman.visits.length) {
      return resolve({lat: null, long: null});
    }
    data.me.salesman.visits = data.me.salesman.visits.filter(
      visit => visit.visited === false,
    );
    if (data.me.salesman.visits.length === 0) {
      return resolve({lat: null, long: null});
    }
    Geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      const initialLatLong = getLatAndLong(
        data.me.salesman.visits[0],
        data.customers,
      );
      let next = {
        visit: data.me.salesman.visits[0],
        distance: getDistance({lat: latitude, long: longitude}, initialLatLong),
        ...initialLatLong,
      };
      for (let i = 0; i < data.me.salesman.visits.length; i++) {
        const {lat, long} = getLatAndLong(
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
          };
        }
      }
      return resolve({...next.visit, lat: next.lat, long: next.long});
    });
  });
}
const SalesmanHomescreen = ({navigation}) => {
  const [data] = useContext(DataContext);
  const loading = data.loading;
  return (
    <Homescreen
      title={'Salesman'}
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
