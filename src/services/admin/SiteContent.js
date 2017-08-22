import axios from 'axios';
import { apiHeader } from '../../components/Helper';


export function updateAboutUs(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'abouts',
    params,
    apiHeader()
  );
}


export function updateContactDetails(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'contact_details',
    params['editContactForm'],
    apiHeader()
  );
}

