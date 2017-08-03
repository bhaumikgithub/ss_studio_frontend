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
