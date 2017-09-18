import axios from 'axios';

export function getActiveServices() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'services/active_services'
  );
}
