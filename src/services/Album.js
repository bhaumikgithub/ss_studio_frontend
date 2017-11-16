import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader, checkStatus } from '../components/Helper';

export function getAlbums(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'albums',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function createAlbum(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'albums',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function showAlbum(id, params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + id,
    { params: params }
  );
  return checkStatus(responsePromise);
}

export function updateAlbum(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + params['id'],
    params['albumForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteAlbum(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getPortfolio(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'albums/portfolio',
    {
      params
    }
  );
}

export function albumPasscodeVerification(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      params['albumSlug'] +
      '/passcode_verification?passcode=' +
      params['passcode']
  );
}

export function submitAlbum(albumSlug) {
  return axiosInstance.put(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumSlug +
      '/mark_as_submitted'
  );
}

export function getSelectedPhotos(albumslug) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumslug +
      '/get_selected_photos',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getCommentedPhotos(albumslug) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumslug +
      '/get_commented_photos',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function markAsDelivered(albumSlug) {
  const responsePromise = axiosInstance.put(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumSlug +
      '/mark_as_deliverd',
    {},
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function markAsStopedSelection(albumSlug) {
  const responsePromise = axiosInstance.put(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumSlug +
      '/mark_as_stoped_selection',
    {},
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function markAsShared(albumSlug) {
  const responsePromise = axiosInstance.put(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      albumSlug +
      '/mark_as_shared',
    {},
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getAlbumStatusWise(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'albums/get_album_status_wise',
    {
      params: params,
      headers: apiCustomHeader()
    }
  );
  return checkStatus(responsePromise);
}
