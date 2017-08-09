import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getCategories() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    apiHeader()
  );
}
