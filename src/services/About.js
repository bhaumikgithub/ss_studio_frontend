import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getAboutUs() {
  return axiosInstance.get(process.env.REACT_APP_API_BASE_URL + 'abouts');
}

export function updateAboutUs(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'abouts',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
