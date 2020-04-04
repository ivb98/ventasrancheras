import {
  CUSTOMER_KEY,
  ITEM_KEY,
  ME_KEY,
  PACKAGE_KEY,
} from './storage/storage.keys';
import {save} from './storage/storage';
import {makeJsonRequest} from './request';

export const fetchInitialData = async (role, setData) => {
  const requests = [
    {endpoint: '/package', key: PACKAGE_KEY, name: 'packages'},
    {endpoint: '/item', key: ITEM_KEY, name: 'items'},
    {endpoint: '/customer', key: CUSTOMER_KEY, name: 'customers'},
    {endpoint: `/${role}/me`, key: ME_KEY, name: 'me'},
  ];
  console.log(requests);
  let stateObject = {};
  setData((prev) => ({
    ...prev,
    loading: {isLoading: true, current: 1, total: requests.length},
  }));

  console.log('here');

  for (let i = 0; i < requests.length; i++) {
    const {endpoint, key} = requests[i];
    const data = await makeJsonRequest(endpoint, {}, true);
    await save(key, data);
    setData((prev) => ({
      ...prev,
      loading: {isLoading: true, current: i + 1, total: requests.length},
    }));
    stateObject[requests[i].name] = data;
  }

  console.log(stateObject);

  setData((prev) => ({
    ...prev,
    ...stateObject,
    loading: {isLoading: false, current: 1, total: 1},
  }));
};
