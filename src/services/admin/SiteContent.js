import axios from 'axios';
import { apiHeader } from '../../components/Helper';


export function updateAboutUs(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'abouts',
    params['EditAboutForm'],
    apiHeader()
  );
}

export function updateContactDetails(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'contact_details',
    params['EditContactForm'],
    apiHeader()
  );
}


export function getServiceIcons() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'service_icons',
    apiHeader()
  );
}


export function createService(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'services',
    params,
    apiHeader()
  );
}


export function updateService(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'services/' + params['id'],
    params['ServiceForm'],
    apiHeader()
  );
}
