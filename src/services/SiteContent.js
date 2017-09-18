import axios from 'axios';
import { apiHeader, checkStatus } from '../components/Helper';

export function getServiceIcons() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'service_icons',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createService(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'services',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateService(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'services/' + params['id'],
    params['ServiceForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
