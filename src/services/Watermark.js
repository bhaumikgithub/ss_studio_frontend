import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader, checkStatus } from '../components/Helper';

export function getWatermark(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'watermarks',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function updateWatermark(params, id) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'watermarks/' + id,
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createWatermark(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'watermarks',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
