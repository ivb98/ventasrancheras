import {useEffect, useState} from 'react';

const useRequest = (url, opts) => {
  const [state, setState] = useState({data: null, loading: false, error: null});
  useEffect(() => {
    async function fetchData() {
      setState(prev => {
        return {...prev, loading: true};
      });
      let request = await fetch(url, {method: 'GET', ...opts});
      let data = await request.json();
      if (request.status === 200) {
        setState(prev => {
          return {...prev, data, loading: false};
        });
      } else {
        setState(prev => {
          return {...prev, error: data, loading: false};
        });
      }
    }

    fetchData();
  }, [url, opts]);

  return state;
};

export default useRequest;
