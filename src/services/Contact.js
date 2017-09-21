import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus, apiCustomHeader } from '../components/Helper';

export function getContacts(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    {
      params: params,
      headers: apiCustomHeader()
    }
  );
  return checkStatus(responsePromise);
}

export function deleteContact(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createContact(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateContact(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + params['id'],
    params['contactForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
