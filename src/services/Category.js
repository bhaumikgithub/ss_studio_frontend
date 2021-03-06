import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getCategories() {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getActiveCategories(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'categories/active',
    { params }
  );
}

export function deleteCategory(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'categories/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createCategory(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'categories',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateCategory(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'categories/' + params['id'],
    params['categoryForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
