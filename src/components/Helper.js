var _ = require('lodash');

export function authToken() {
  return localStorage.getItem('AUTH_TOKEN');
}

export function isLoggedIn() {
  if (authToken()) {
    return true;
  } else {
    return false;
  }
}

export function checkStatus(responsePromise) {
  responsePromise.catch(function(error) {
    if (error.response.status === 401) {
      localStorage.clear();
    }
  });
  return responsePromise;
}

export function currentUser() {
  return JSON.parse(localStorage.getItem('CURRENT_USER'));
}

export function currentUserRole(){
  return JSON.parse(localStorage.getItem('ROLE'));
}

export function fullName(user) {
  // const user = currentUser();
  return user.first_name + ' ' + user.last_name;
}

export function apiHeader() {
  return {
    headers: apiCustomHeader()
  };
}

export function apiCustomHeader() {
  return {
    Authorization: 'bearer ' + authToken(),
    'Content-Type': 'application/json'
  };
}

export function toCapitalize(str) {
  str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  return str;
}

export function str2bool(value) {
  if (value && typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return value;
}

export function isObjectEmpty(object) {
  return Object.getOwnPropertyNames(object).length === 0;
}

export function getIndex(value, arr, prop) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
}

export function getIndexUsingLodash(array, id) {
  return _.findIndex(array, function(o) {
    return o.id === id;
  });
}

export function setLoader(options) {
  return (document.getElementById(options['elementId']).style.display =
    options['styleProperty']);
}

export function getStatusClass(status) {
  if (status === 'New') {
    return 'text-red';
  } else if (status === 'Shared') {
    return 'text-yellow';
  } else if (status === 'Delivered') {
    return 'text-green';
  } else if (status === 'Submitted') {
    return 'text-brown';
  } else {
    return 'text-green';
  }
}

export function getAlbumStatusClass(status) {
  if (status === 'inactive') {
    return 'text-red';
  } else if (status === 'active') {
    return 'text-green';
  }
}
