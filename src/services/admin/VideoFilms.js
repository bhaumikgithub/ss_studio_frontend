import axios from 'axios';
import { apiHeader, checkStatus } from '../../components/Helper';

export function getVideoFilms() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createVideoFilm(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    params,
    apiHeader()
  );
}

export function updateVideoFilm(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + params['id'],
    params['videoForm'],
    apiHeader()
  );
}

export function deleteVideoFilm(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + id,
    apiHeader()
  );
}
