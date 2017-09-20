import axios from 'axios';
import { apiHeader, checkStatus } from '../components/Helper';

export function getContactDetails() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'contact_details');
}

export function updateContactDetail(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'contact_details',
    params['EditContactForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
