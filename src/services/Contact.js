import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader } from '../components/Helper';

export function getContacts(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    {
      params: params,
      headers: apiCustomHeader()
    }
  );
  return responsePromise;
}

export function importContacts(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'contacts/import',
    {
      params: params,
      headers: apiCustomHeader()
    }
  );
  return responsePromise;
}

export function deleteContact(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + id,
    apiHeader()
  );
  return responsePromise;
}

export function createContact(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    params,
    apiHeader()
  );
  return responsePromise;
}

export function updateContact(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + params['id'],
    params['contactForm'],
    apiHeader()
  );
  return responsePromise;
}
