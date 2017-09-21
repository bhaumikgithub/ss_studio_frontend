import axiosInstance from '../axios/axiosInterceptor';

import { apiHeader, checkStatus } from '../components/Helper';

export function getContactDetails() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'contact_details'
  );
}

export function updateContactDetail(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'contact_details',
    params['EditContactForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
