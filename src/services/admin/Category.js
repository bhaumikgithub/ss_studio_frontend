import axios from 'axios';
import { apiHeader, checkStatus } from '../../components/Helper';

export function getCategories() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getActiveCategories() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'categories/active');
}

export function deleteCategory(id) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'categories/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createCategory(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateCategory(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'categories/' + params['id'],
    params['categoryForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
