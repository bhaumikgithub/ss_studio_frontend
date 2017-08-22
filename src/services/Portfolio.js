import axios from 'axios';

export function getPortfolio(params) {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'albums/portfolio', {
    params
  });
}
