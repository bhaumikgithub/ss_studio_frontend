import axios from 'axios';
import { apiHeader, checkStatus } from '../../components/Helper';

export function getTestimonials() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'testimonials',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createTestimonial(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'testimonials',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateTestimonial(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/' + params['id'],
    params['testimonialForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteTestimonial(id) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
