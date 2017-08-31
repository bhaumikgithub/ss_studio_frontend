import axios from 'axios';
import { apiHeader, checkStatus } from '../../components/Helper';

export function getContacts() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteContact(id) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createContact(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateContact(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + params['id'],
    params['contactForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
