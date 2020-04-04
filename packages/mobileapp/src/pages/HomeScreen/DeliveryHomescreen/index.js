import React, {useContext} from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';
import {DataContext} from '../../../contexts/dataContext';

const DeliveryHomescreen = ({navigation}) => {
  const [data] = useContext(DataContext);
  const loading = data.loading;
  return (
    <Homescreen
      title={'Delivery'}
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
          text="Ver Ordenes"
          onPress={() => {}}
        />,
        <Button
          key={'3'}
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
