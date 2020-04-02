import React from 'react';
import Button from '../../../base/Button/index';
import Homescreen from '../index';

const SalesmanHomescreen = ({navigation}) => {
  return (
    <Homescreen
      title={'Salesman'}
      buttonArray={[
        <Button key={'1'} text="Mi Ruta" onPress={() => {}} />,
        <Button key={'2'} text="Ver Visitas" onPress={() => {}} />,
        <Button key={'3'} text="Recibir Pago" onPress={() => {}} />,
      ]}
    />
  );
};

export default SalesmanHomescreen;
