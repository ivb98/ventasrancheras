import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const MessageScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <Text>{route.params.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default MessageScreen;
