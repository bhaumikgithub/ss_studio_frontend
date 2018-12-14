import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, currentUser, checkStatus, apiCustomHeader } from '../components/Helper';

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

export function getCountries() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/get_countries',
  );
}

export function getRoles() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/get_roles',
    apiHeader()
  );
}

export function getPackages() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/get_packages',
    apiHeader()
  );
}

export function getStatuses() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/get_statuses',
    apiHeader()
  );
}

export function createUser(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'users',
    params,
  );
  return checkStatus(responsePromise);
}

export function getUsers(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/',
    { params: params, headers: apiCustomHeader() }
  );
}

export function deleteUser(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'users/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function editUser(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'users/' + params['id'],
    params['userForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function userForgotPassword(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'users/password',
    params,
  );
  return checkStatus(responsePromise);
}

export function userChangePassword(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'users/password',
    params,
  );
  return checkStatus(responsePromise);
}

export function getUserPackages() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/get_user_packages',
    apiHeader()
  );
}

export function getUserType() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/get_user_type',
    apiHeader()
  );
}

export function getFilteredUser(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'users/filter_user',
    { params: params, headers: apiCustomHeader() }
  );
}