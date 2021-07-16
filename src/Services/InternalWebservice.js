import axios from 'axios';
import { INTERNAL_WEBSERVICE_HOST } from "@env";

const API = axios.create({
  baseURL: `${INTERNAL_WEBSERVICE_HOST}`,
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
