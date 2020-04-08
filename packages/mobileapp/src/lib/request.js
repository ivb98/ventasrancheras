import {save, get} from './storage/storage';
import {CACHE_KEY} from './storage/storage.keys';

const baseUrl = 'https://vrancheras.herokuapp.com';
let access_token = '';
let isInternetReachable = true;

export const makeJsonRequest = async (
  url,
  opts = {},
  auth = false,
  cache = true,
) => {
  if (opts.method && opts.method !== 'GET') {
    opts.headers = opts.headers || {};
    opts.headers['Content-type'] = 'application/json';
  }
  if (auth) {
    opts.headers = opts.headers || {};
    opts.headers.Authorization = `bearer ${access_token}`;
  }

  console.log(isInternetReachable);
  if (isInternetReachable) {
    let request = await fetch(`${baseUrl}${url}`, {method: 'GET', ...opts});
    try {
      let data = await request.json();

      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else {
    if (cache) {
      await cacheRequest(url, {method: 'GET', ...opts}, auth);
      return {forwarded: true};
    } else {
      console.log();
      throw new Error('No internet');
    }
  }
};

export const setAccessToken = token => {
  access_token = token;
};

export const setConnectivity = hasInternetAccess => {
  isInternetReachable = hasInternetAccess;
};

async function cacheRequest(endpoint, options, auth) {
  delete options.headers.Authorization;
  const cached = JSON.parse(await get(CACHE_KEY)) || [];
  await save(CACHE_KEY, [
    ...cached,
    {endpoint, options, date: new Date().getTime(), auth},
  ]);
}
