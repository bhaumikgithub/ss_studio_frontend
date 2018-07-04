import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, currentUser, checkStatus } from '../components/Helper';

export function getCurrentUser() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/' + currentUser().id,
    apiHeader()
  );
}

export function createUserLogo(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'users/' + currentUser().id+'/user_logos',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateUserLogo(params,id) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'users/' + currentUser().id+'/user_logos/'+id,
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
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
  return checkStatus(responsePromise);
}

export function getLogo(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'get_logo',
    {params}
  );
}
