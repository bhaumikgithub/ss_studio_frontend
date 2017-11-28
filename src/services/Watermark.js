import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader, checkStatus } from '../components/Helper';

export function getWatermark(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'watermarks',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function updateWatermark(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'watermarks/' + params['id'],
    params['watermarks'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
