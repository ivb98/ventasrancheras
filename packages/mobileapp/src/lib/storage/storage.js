import AsyncStorage from '@react-native-community/async-storage';

export const save = async (key, data) => {
  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }
  await AsyncStorage.setItem(key, data);
};

export const get = async key => {
  let item = await AsyncStorage.getItem(key);
  return item;
};

export const remove = async key => {
  await AsyncStorage.removeItem(key);
};
