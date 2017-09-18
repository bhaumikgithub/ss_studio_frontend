import axios from 'axios';
import { apiHeader, checkStatus } from '../components/Helper';

export function getAboutUs() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'abouts');
}

export function updateAboutUs(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'abouts',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
