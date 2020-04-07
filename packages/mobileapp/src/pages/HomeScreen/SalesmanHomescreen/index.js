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
          onPress={() => {
            navigation.navigate('Map');
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
