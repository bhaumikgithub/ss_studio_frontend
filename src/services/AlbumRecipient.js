import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader } from '../components/Helper';

export function createAlbumRecipient(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      params.album_id +
      '/album_recipients',
    params,
    apiHeader()
  );
  return responsePromise;
}

export function getAlbumRecipients(albumId) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients',
    apiHeader()
  );
  return responsePromise;
}

export function deleteAlbumRecipient(albumId, id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/' +
      id,
    apiHeader()
  );
  return responsePromise;
}

export function resendAlbumToRecipient(albumId, id) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/' +
      id +
      '/resend',
    {},
    apiHeader()
  );
  return responsePromise;
}

export function getNotInvitedContact(albumId) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/not_invited_contacts',
    apiHeader()
  );
  return responsePromise;
}

export function getAdminAlbumRecipients(albumId) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/get_admin_album_recipients?type=1',
    apiHeader()
  );
  return responsePromise;
}

export function resetAdminRecipients(albumId) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumId +
      '/album_recipients/reset_admin_recipients',
    apiHeader()
  );
  return responsePromise;
}
