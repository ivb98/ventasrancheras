import React from 'react';
import {View, StyleSheet} from 'react-native';
import Subtitle from '../../base/Subtitle/index';

const MessageScreen = ({route}) => {
  return (
    <View style={styles.container}>
      <Subtitle>{route.params.message}</Subtitle>
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
