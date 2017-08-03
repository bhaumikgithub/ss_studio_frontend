import axios from 'axios';

export function LoginService(params) {
  return axios.post(process.env.REACT_APP_API_BASE_URL + 'oauth/token', params);
}

export function LogoutService(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'oauth/revoke',
    params
  );
}
