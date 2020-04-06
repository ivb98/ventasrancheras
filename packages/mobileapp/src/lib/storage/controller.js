import {update, get} from './storage';
import {ME_KEY, CACHE_KEY} from './storage.keys';

export const updatePackageStatus = (id, newStatus, data, setData) => {
  for (let i = 0; i < data.me.packages.length; i++) {
    if (data.me.packages[i].packageId === id) {
      data.me.packages[i].status = newStatus;
    }
    setData(data);
    update(ME_KEY, data.me);
  }
};
