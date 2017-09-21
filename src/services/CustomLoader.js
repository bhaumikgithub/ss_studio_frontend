import axios from 'axios';
import promise from 'promise';
import React from 'react';
import { RProgress, RProgressApi } from 'rprogress/lib/index';

var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // <Loading show={true} color="red" />;
    RProgressApi.start();
    console.log('in request');
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    // Do something with response data
    <Loading show={true} color="red" />;
    console.log('in response');
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosInstance;
