const baseUrl = 'http://10.0.0.10:3000';
let access_token = '';

export const makeJsonRequest = async (url, opts = {}, auth = false) => {
  if (opts.method && opts.method !== 'GET') {
    opts.headers = opts.headers || {};
    opts.headers['Content-type'] = 'application/json';
  }
  if (auth) {
    opts.headers = opts.headers || {};
    opts.headers.Authorization = `bearer ${access_token}`;
  }

  let request = await fetch(`${baseUrl}${url}`, {method: 'GET', ...opts});
  try {
    let data = await request.json();

    return data;
  } catch {
    console.log('data?');
    return null;
  }
};

export const setAccessToken = (token) => {
  access_token = token;
};
