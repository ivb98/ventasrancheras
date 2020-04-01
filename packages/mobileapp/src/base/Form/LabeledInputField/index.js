import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const LabeledInputField = ({inputField, labelText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <View style={styles.input}>{inputField}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 15,
    fontSize: 14,
    alignSelf: 'auto',
  },
  input: {
    flex: 1,
  },
});

export default LabeledInputField;
