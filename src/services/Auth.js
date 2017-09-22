import axiosInstance from '../axios/axiosInterceptor';

export function LoginService(params) {
  return axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'oauth/token',
    params
  );
}

export function LogoutService(params) {
  return axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'oauth/revoke',
    params
  );
}
