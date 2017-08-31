import axios from 'axios';

export function postSharedAlbum(params) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL +
      'albums/' +
      params['album'] +
      '/passcode_verification',
    {
      params
    }
  );
}
