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
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateVideoFilm(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + params['id'],
    params['videoForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteVideoFilm(id) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
