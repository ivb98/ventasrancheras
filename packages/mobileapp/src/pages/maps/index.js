import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Title from '../../base/Title/index';
import Button from '../../base/Button/index';

const MapScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Title extraStyles={styles.title}>Mapa</Title>
      <Text>Aqui va el mapa</Text>
      <Button
        text="Continuar"
        onPress={() => {
          navigation.navigate(route.params.next);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginVertical: 15,
  },
});

export default MapScreen;
