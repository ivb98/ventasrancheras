import React from 'react';
import {View, Picker} from 'react-native';

const Select = ({handleChange, value, values = [], placeholder}) => {
  const items = values.map((item, i) => (
    <Picker.Item label={item} value={item} key={i} />
  ));
  return (
    <View>
      <Picker
        selectedValue={value}
        onValueChange={handleChange}
        mode="dropdown">
        {items}
      </Picker>
    </View>
  );
};

export default Select;
