import axios from 'axios';
const url='https://mastervault-backend.onrender.com'
const api = axios.create({
  baseURL: url
});

export default api;
