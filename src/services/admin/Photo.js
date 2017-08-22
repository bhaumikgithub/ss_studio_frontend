import axios from 'axios';
import { apiCustomHeader, apiHeader } from '../../components/Helper';

export function deleteSelectedPhotos(params) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'photos/multi_delete',
    { data: params, headers: apiCustomHeader() }
  );
}

export function uploadPhoto(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'photos',
    params,
    apiHeader()
  );
}
