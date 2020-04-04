import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import InputField from '../../InputField/index';
import Subtitle from '../../../Subtitle/index';
import LabeledInputField from '../../LabeledInputField/index';

const ProductPickerItem = ({text, price, value, placeholder, handleChange}) => {
  return (
    <View style={styles.column}>
      <Subtitle>{text}</Subtitle>
      <Subtitle extraStyles={{alignSelf: 'center'}}>{price} $</Subtitle>
      <View style={styles.row}>
        <View style={{flex: 1}}>
          <LabeledInputField
            inputField={
              <InputField
                value={value}
                placeholder={placeholder}
                handleChange={handleChange}
                keyboardType="number-pad"
              />
            }
            labelText="Unidades"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ProductPickerItem;
