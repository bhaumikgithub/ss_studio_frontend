import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getAlbums() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'albums', apiHeader());
}

export function deleteAlbum(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + id,
    apiHeader()
  );
}
