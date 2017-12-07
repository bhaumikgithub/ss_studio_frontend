import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, currentUser } from '../components/Helper';

export function getCurrentUser() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/' + currentUser().id,
    apiHeader()
  );
}

export function changePassword(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL +
      'users/' +
      currentUser().id +
      '/update_password',
    params['changePasswordForm'],
    apiHeader()
  );
  return responsePromise;
}
