import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader, checkStatus } from '../components/Helper';

export function getTestimonials(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'testimonials',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function createTestimonial(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'testimonials',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateTestimonial(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/' + params['id'],
    params['testimonialForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteTestimonial(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getFeedbacks() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/active'
  );
}
