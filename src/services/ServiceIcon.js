import axios from 'axios';
import { apiHeader, checkStatus } from '../components/Helper';

export function getServiceIcons() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'service_icons',
    apiHeader()
  );
  return checkStatus(responsePromise);
}
