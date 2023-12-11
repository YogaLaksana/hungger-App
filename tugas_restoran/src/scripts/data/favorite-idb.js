/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
import { openDB } from 'idb';
import CONFIG from '../global/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteIdb = {
  async getData(id) {
    if (!id) {
      return;
    }
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllData() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putData(restaurant) {
    if (!restaurant || !restaurant.id) {
      return; // Mengembalikan jika data tidak ditemukan atau tidak memiliki properti id
    }
    return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
  },
  async deleteData(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};
export default FavoriteIdb;
