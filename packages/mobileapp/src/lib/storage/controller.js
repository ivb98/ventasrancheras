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

export const updateVisitStatus = (id, data, setData) => {
  for (let i = 0; i < data.me.salesman.visits.length; i++) {
    if (data.me.salesman.visits[i].id === id) {
      data.me.salesman.visits[i].visited = true;
      data.me.salesman.visits[i].date = new Date();
    }
    setData(data);
    update(ME_KEY, data.me);
  }
};
