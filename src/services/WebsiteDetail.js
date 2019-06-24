import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getWebsiteDetail() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'website_detail',
    apiHeader()
  );
}
export function createWebsiteDetail(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'website_details',
    params['EditWebsiteForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
export function updateWebsiteDetail(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'website_details',
    params['EditWebsiteForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
export function getWebsiteDetails(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'website_details',
    {params}
  );
}
export function updateFaviconImage(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'website_details/update_user_logo',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}