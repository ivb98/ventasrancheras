import {
  CUSTOMER_KEY,
  ITEM_KEY,
  ME_KEY,
  PACKAGE_KEY,
} from './storage/storage.keys';
import {save, get} from './storage/storage';
import {makeJsonRequest} from './request';
import {ToastAndroid} from 'react-native';

export const fetchInitialData = async (role, setData, data) => {
  if (data.internetConnection === null) return;
  const requests = [
    {endpoint: '/package', key: PACKAGE_KEY, name: 'packages'},
    {endpoint: '/item', key: ITEM_KEY, name: 'items'},
    {endpoint: '/customer', key: CUSTOMER_KEY, name: 'customers'},
    {endpoint: `/${role.toLowerCase()}/me`, key: ME_KEY, name: 'me'},
  ];
  console.log('JIUG JEFNER', data.internetConnection);
  setData(prev => ({
    ...prev,
    loading: {isLoading: true, current: 1, total: requests.length},
  }));
  if (data.internetConnection) {
    const stateObject = {};

    for (let i = 0; i < requests.length; i++) {
      setData(prev => ({
        ...prev,
        loading: {isLoading: true, current: i + 1, total: requests.length},
      }));
      const {endpoint, key} = requests[i];
      try {
        const fetchedData = await makeJsonRequest(endpoint, {}, true, false);
        await save(key, fetchedData);
        stateObject[requests[i].name] = fetchedData;
      } catch {
        let cachedData = await get(key);
        if (cachedData) {
          cachedData = JSON.parse(cachedData);
          stateObject[requests[i].name] = cachedData;
        }
      }
    }

    console.log(stateObject);

    setData(prev => ({
      ...prev,
      ...stateObject,
      loading: {isLoading: false, current: 1, total: 1},
    }));
  } else {
    ToastAndroid.show(
      'No se pudo actualizar la informacion. Cargando data almacenada...',
      ToastAndroid.SHORT,
    );
    const cachedData = {};
    for (let i = 0; i < requests.length; i++) {
      const fetchedData = JSON.parse(await get(requests[i].key));
      cachedData[requests[i].name] = fetchedData;
      setData(prev => ({
        ...prev,
        loading: {isLoading: true, current: i + 1, total: 4},
      }));
    }
    setData(prev => ({
      ...prev,
      ...cachedData,
      loading: {isLoading: false, current: 1, total: 1},
    }));
  }
};

export const formatSignature = signature => {
  const formatted = `data:image/png;base64,${signature}`;
  return formatted;
};

export const formatItems = items => {
  let categories = {};
  for (const item of items) {
    item.qty = '0';
    item.price = item.unitPrice;
    const {category} = item;
    categories[category] = categories[category]
      ? [...categories[category], item]
      : [item];
  }
  let formattedItems = [];
  for (const category in categories) {
    formattedItems.push({
      name: category,
      items: categories[category],
    });
  }
  return formattedItems;
};
