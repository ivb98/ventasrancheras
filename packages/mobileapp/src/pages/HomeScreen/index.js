import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Dimensions,
} from 'react-native';
import LogOutButton from '../../components/LogOutButton/index';
import Title from '../../base/Title/index';
import {DataContext} from '../../contexts/dataContext';
import {UserContext} from '../../contexts/userContext';
import {fetchInitialData} from '../../lib/util';

const HomeScreen = ({buttonArray, title}) => {
  const [data, setData] = useContext(DataContext);
  const [userData] = useContext(UserContext);
  const loading = data.loading;
  return (
    <ScrollView
      style={styles.scroll}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            fetchInitialData(userData.user.role, setData);
          }}
          refreshing={false}
        />
      }>
      <View style={styles.container}>
        <Title extraStyles={styles.title}>{title}</Title>
        <View style={styles.buttonsContainer}>
          <View style={styles.actionButtonContainer}>{buttonArray}</View>
          {loading && loading.isLoading && (
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator />
              <Text>Loading data {`${loading.current}/${loading.total}`}</Text>
            </View>
          )}
          <View style={styles.logOutButtonContainer}>
            <LogOutButton />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height * 0.85,
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
