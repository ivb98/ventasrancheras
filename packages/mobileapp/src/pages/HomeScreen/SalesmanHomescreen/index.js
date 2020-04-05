import React, {useContext} from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';
import {DataContext} from '../../../contexts/dataContext';

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
          onPress={() => {}}
        />,
        <Button
          disabled={loading.isLoading}
          key={'2'}
          text="Ver Visitas"
          onPress={() => {
            navigation.navigate('Inventory');
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
        <Button
          disabled={loading.isLoading}
          key={'4'}
          text="Sales Order"
          onPress={() => {
            navigation.navigate('SalesOrder');
          }}
        />,
      ]}
    />
  );
};

export default SalesmanHomescreen;
