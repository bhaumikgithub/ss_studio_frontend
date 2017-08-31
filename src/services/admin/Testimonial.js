import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getTestimonials() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'testimonials',
    apiHeader()
  );
}

export function createTestimonial(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'testimonials',
    params,
    apiHeader()
  );
}

export function updateTestimonial(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/' + params['id'],
    params['testimonialForm'],
    apiHeader()
  );
}

export function deleteTestimonial(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'testimonials/' + id,
    apiHeader()
  );
}
