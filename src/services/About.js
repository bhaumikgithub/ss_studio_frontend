import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getAboutUs() {
  return axiosInstance.get(process.env.REACT_APP_API_BASE_URL + 'abouts', apiHeader());
}
export function getAboutUsDetail(params) {
  return axiosInstance.get(process.env.REACT_APP_API_BASE_URL + '/' + params.user + '/about_us',{params});
}

export function updateAboutUs(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'abouts',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createAboutUs(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'abouts',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
