import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:2000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';