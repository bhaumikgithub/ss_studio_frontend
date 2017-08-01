import axios from 'axios';

export function getFeedbacks() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'testimonials/active');
}
