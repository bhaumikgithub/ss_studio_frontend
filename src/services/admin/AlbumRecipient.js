import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function createAlbumRecipient(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + params.album_id + '/album_recipients',
    params,
    apiHeader()
  );
}

export function getAlbumRecipients(albumId) {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients',
    apiHeader()
  );
}

export function deleteAlbumRecipient(albumId, id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/' +
      id,
    apiHeader()
  );
}

export function resendAlbumToRecipient(albumId, id) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/' +
      id +
      '/resend',
    {},
    apiHeader()
  );
}
