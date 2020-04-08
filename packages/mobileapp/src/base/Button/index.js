import React from 'react';
import {Button as RNButton} from 'react-native';
import {PRIMARY_COLOR} from '../../styles/theme.style';

const Button = ({text, onPress, color = PRIMARY_COLOR, ...opts}) => {
  return <RNButton title={text} onPress={onPress} color={color} {...opts} />;
};

export default Button;
