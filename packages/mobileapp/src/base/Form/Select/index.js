import React from 'react';
import {View, Picker} from 'react-native';
import {useField} from 'formik';

function handleChange(value, position, setValue) {
  console.log('VALUE HAS CHANGED');
  setValue(value);
}
const Select = ({values = [], name}) => {
  const [field, meta, helpers] = useField(name);

  const items = values.map((item, i) => {
    return <Picker.Item label={item.label} value={item.value} key={i} />;
  });
  return (
    <View>
      <Picker
        selectedValue={field.value}
        onValueChange={(val, pos) => {
          handleChange(val, pos, helpers.setValue);
        }}
        mode="dropdown">
        {items}
      </Picker>
    </View>
  );
};

export default Select;
