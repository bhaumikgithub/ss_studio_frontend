import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, currentUser, checkStatus, apiCustomHeader } from '../components/Helper';

export function getPackages(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'packages/',
    { params: params, headers: apiCustomHeader() }
  );
}

export function deletePackage(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'packages/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createPackage(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'packages',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updatePackage(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'packages/' + params['id'],
    params['packageForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
