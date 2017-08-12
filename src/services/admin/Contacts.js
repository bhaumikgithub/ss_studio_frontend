import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getContacts() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'contacts', apiHeader());
}

export function deleteContact(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + id,
    apiHeader()
  );
}

export function createContact(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'contacts',
    params,
    apiHeader()
  );
}

export function updateContact(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'contacts/' + params['id'],
    params['albumForm'],
    apiHeader()
  );
}
