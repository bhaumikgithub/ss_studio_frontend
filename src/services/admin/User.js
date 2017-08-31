import axios from 'axios';
import { apiHeader, currentUser, checkStatus } from '../../components/Helper';

export function getCurrentUser() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'users/' + currentUser().id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
