import axios from 'axios';
const url='https://mastervault-backend.onrender.com'
/* const url = 'http://127.0.0.1:8080'; */
const api = axios.create({
  baseURL: url
});

export default api;
