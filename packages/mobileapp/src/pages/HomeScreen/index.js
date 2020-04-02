import React from 'react';
import {View, StyleSheet} from 'react-native';
import LogOutButton from '../../components/LogOutButton/index';
import Title from '../../base/Title/index';

const HomeScreen = ({buttonArray, title}) => {
  return (
    <View style={styles.container}>
      <Title extraStyles={styles.title}>{title}</Title>
      <View style={styles.buttonsContainer}>
        <View style={styles.actionButtonContainer}>{buttonArray}</View>
        <View style={styles.logOutButtonContainer}>
          <LogOutButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  buttonsContainer: {
    paddingHorizontal: 100,
    justifyContent: 'space-around',
    flex: 1,
  },
  actionButtonContainer: {
    justifyContent: 'space-evenly',
    height: 250,
  },
  logOutButtonContainer: {
    paddingHorizontal: 40,
  },
});

export default HomeScreen;
