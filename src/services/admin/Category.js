import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getCategories() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    apiHeader()
  );
}

export function getActiveCategories() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'categories/active');
}

export function deleteCategory(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'categories/' + id,
    apiHeader()
  );
}

export function createCategory(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    params,
    apiHeader()
  );
}

export function updateCategory(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'categories/' + params['id'],
    params['categoryForm'],
    apiHeader()
  );
}
