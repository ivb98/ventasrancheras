import React from 'react';
import {Button as RNButton} from 'react-native';

const Button = ({text, onPress, color}) => {
  return <RNButton title={text} onPress={onPress} color={color} />;
};

export default Button;
