import axios from 'axios';
const url='http://0.0.0.0:10000'
const api = axios.create({
  baseURL: url
});

export default api;
