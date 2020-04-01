import React from 'react';
import {View, StyleSheet} from 'react-native';
import InputField from '../../InputField/index';
import Subtitle from '../../../Subtitle/index';
import LabeledInputField from '../../LabeledInputField/index';

const ProductPickerItem = ({text, value, placeholder, handleChange}) => {
  return (
    <View style={styles.column}>
      <Subtitle>{text}</Subtitle>
      <LabeledInputField
        inputField={
          <InputField
            value={value}
            placeholder={placeholder}
            handleChange={handleChange}
            keyboardType="number-pad"
          />
        }
        labelText="Amount"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
});
export default ProductPickerItem;
