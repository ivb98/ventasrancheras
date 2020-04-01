import React from 'react';
import {TextInput} from 'react-native';
import {PRIMARY_COLOR} from '../../../styles/theme.style';

const InputField = ({handleChange, value, ...rest}) => {
  return (
    <TextInput
      onChangeText={handleChange}
      value={value}
      underlineColorAndroid={PRIMARY_COLOR}
      {...rest}
    />
  );
};

export default InputField;
