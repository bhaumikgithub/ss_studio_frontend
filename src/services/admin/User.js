import axios from 'axios';
import { apiHeader, currentUser } from '../../components/Helper';

export function getCurrentUser() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'users/' + currentUser().id,
    apiHeader()
  );
}
