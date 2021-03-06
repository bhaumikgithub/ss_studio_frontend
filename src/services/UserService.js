import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getActiveServices() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'services/active_services',
    apiHeader()
  );
}

export function updateService(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'services/' + params['id'],
    params['ServiceForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createService(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'services',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteService(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'services/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getServiceDetails(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + '/' + params.user +'/services',
    {params}
  );
}
