import axios from 'axios';

var axiosInstance = axios.create();
var reactNprogress = require('nprogress');

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function(config) {
    reactNprogress.start();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    reactNprogress.done();
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default axiosInstance;
