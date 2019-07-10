import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getTheme() {
  return axiosInstance.get(process.env.REACT_APP_API_BASE_URL + 'themes', apiHeader());
}

export function updateTheme(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'themes',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
