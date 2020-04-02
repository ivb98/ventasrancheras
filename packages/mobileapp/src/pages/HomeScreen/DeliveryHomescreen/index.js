import React from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';

const DeliveryHomescreen = ({navigation}) => {
  return (
    <Homescreen
      title={'Delivery'}
      buttonArray={[
        <Button key={'1'} text="Mi Ruta" onPress={() => {}} />,
        <Button key={'2'} text="Ver Ordenes" onPress={() => {}} />,
        <Button key={'3'} text="Recibir Paquetes" onPress={() => {}} />,
      ]}
    />
  );
};

export default DeliveryHomescreen;
