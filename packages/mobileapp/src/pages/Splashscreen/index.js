import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {PRIMARY_COLOR} from '../../styles/theme.style';
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Ventas Rancheras</Text>
      <ActivityIndicator size={'large'} color={PRIMARY_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
export default SplashScreen;
