export const makeJsonRequest = async (url, opts) => {
  if (opts.method && opts.method !== 'GET') {
    opts.headers = opts.headers || {};
    opts.headers['Content-type'] = 'application/json';
  }
  let request = await fetch(url, {method: 'GET', ...opts});
  let data = await request.json();

  return data;
};
