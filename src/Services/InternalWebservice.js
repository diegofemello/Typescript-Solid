import axios from 'axios';

const url = 'http://192.168.4.1/';
// const url = 'http://192.168.0.110:3000/';

const API = axios.create({
  baseURL: url,
  responseType: 'json',
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (typeof err.response === 'undefined') {
      return { status: 500 };
    }
    return err.response;
  }
);

export default API;
