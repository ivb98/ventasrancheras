import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Title from '../../base/Title/index';
import Button from '../../base/Button/index';
import LaunchNavigator from 'react-native-launch-navigator';

function navigate(lat, long) {
  LaunchNavigator.navigate([lat, long])
    .then(() => console.log('Launched navigator'))
    .catch(err => console.error('Error launching navigator: ' + err));
}
const MapScreen = ({navigation, route}) => {
  const {next, ...info} = route.params;
  return (
    <View style={styles.container}>
      <Title extraStyles={styles.title}>
        Mapa {route.params.lat}, {route.params.long}
      </Title>
      <View style={styles.googleMapsButton}>
        <Button
          text="Abrir en Google Maps"
          onPress={() => {
            navigate(route.params.lat, route.params.long);
          }}
        />
      </View>
      <View style={styles.nextButton}>
        <Button
          text="Continuar"
          onPress={() => {
            navigation.navigate(next, {...info});
          }}
        />
      </View>
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
  googleMapsButton: {
    height: Dimensions.get('screen').height * 0.6,
    justifyContent: 'center',
  },
  nextButton: {
    marginVertical: 15,
  },
});

export default MapScreen;
