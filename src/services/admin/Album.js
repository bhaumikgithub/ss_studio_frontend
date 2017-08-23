import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getAlbums() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'albums', apiHeader());
}

export function createAlbum(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'albums',
    params,
    apiHeader()
  );
}

export function showAlbum(id) {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'albums/' + id);
}

export function updateAlbum(params) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + params['id'],
    params['albumForm'],
    apiHeader()
  );
}

export function deleteAlbum(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + id,
    apiHeader()
  );
}
