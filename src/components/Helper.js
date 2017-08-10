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

export function currentUser() {
  return JSON.parse(localStorage.getItem('CURRENT_USER'));
}

export function fullName() {
  const user = currentUser();
  return user.first_name + ' ' + user.last_name;
}

export function apiHeader() {
  return {
    headers: {
      Authorization: 'bearer ' + authToken(),
      'Content-Type': 'application/json'
    }
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
