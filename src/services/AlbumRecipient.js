import axios from 'axios';
import { apiHeader, checkStatus } from '../components/Helper';

export function createAlbumRecipient(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      params.album_id +
      '/album_recipients',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getAlbumRecipients(albumId) {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteAlbumRecipient(albumId, id) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/' +
      id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function resendAlbumToRecipient(albumId, id) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/' +
      id +
      '/resend',
    {},
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getNotInvitedContact(albumId) {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/not_invited_contacts',
    apiHeader()
  );
  return checkStatus(responsePromise);
}
