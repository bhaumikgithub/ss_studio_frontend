import axios from 'axios';
import {
  apiCustomHeader,
  apiHeader,
  checkStatus
} from '../../components/Helper';

export function deleteSelectedPhotos(params) {
  const responsePromise = axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'photos/multi_delete',
    { data: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function uploadPhoto(params) {
  const responsePromise = axios.post(
    process.env.REACT_APP_API_BASE_URL + 'photos',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function setCoverPhoto(id) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'photos/' + id + '/set_cover_photo',
    {},
    apiHeader()
  );
  return checkStatus(responsePromise);
}
