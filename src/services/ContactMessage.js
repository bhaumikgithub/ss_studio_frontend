import axios from 'axios';

export function createContactMessage(params) {
  return axios.post(process.env.REACT_APP_API_BASE_URL + 'contact_messages', {
    contact_message: params
  });
}
