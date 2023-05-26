import axios from 'axios';
import { isArray } from 'lodash';

class HttpService {
  constructor() {
    this.axios = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 30000
    });

    this.get = this.axios.get;
    this.post = this.axios.post;
    this.put = this.axios.put;
    this.patch = this.axios.patch;
    this.delete = this.axios.delete;
  }

  attachTokenToHeader = token => {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  saveStorage = (key, value) => {
    if (isArray(key) && isArray(value) && key.length === value.length) {
      for (let i = 0; i < key.length; i++) {
        localStorage.setItem(key[i], JSON.stringify(value[i]) || '');
      }
      return;
    }

    localStorage.setItem(key, JSON.stringify(value) || '');
  };

  getStorage = key => {
    if (isArray(key)) {
      const result = [];
      for (let i = 0; i < key.length; i++) {
        const item = localStorage.getItem(key[i]);
        if (item) {
          result.push(JSON.parse(item));
        }
      }
      return result;
    }

    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }

    return null;
  };

  removeStorage = key => {
    if (isArray(key)) {
      for (let i = 0; i < key.length; i++) {
        localStorage.removeItem(key[i]);
      }
      return;
    }

    localStorage.removeItem(key);
  };

  clearStorage = () => {
    localStorage.clear();
  };
}

export default new HttpService();
