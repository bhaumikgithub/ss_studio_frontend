import axios from 'axios';
import { apiHeader, checkStatus } from '../../components/Helper';

export function getAlbums() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'albums',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function createAlbum(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'albums',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function showAlbum(id) {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + id
  );
  return checkStatus(responsePromise);
}

export function updateAlbum(params) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + params['id'],
    params['albumForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteAlbum(id) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
