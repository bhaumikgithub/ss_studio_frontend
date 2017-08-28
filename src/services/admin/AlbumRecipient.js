import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getAlbumRecipients(album_id) {
 return axios.get(process.env.REACT_APP_API_BASE_URL + 'albums/' + album_id + '/album_recipients', apiHeader());
}

export function createAlbumRecipient(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'albums/' + params.album_id + '/album_recipients',
    params,
    apiHeader()
  );
}