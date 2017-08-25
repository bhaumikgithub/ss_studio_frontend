import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getHomepagePhotos() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos',
    apiHeader()
  );
}

export function updateHomepagePhoto(params, id) {
  return axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/' + id,
    params,
    apiHeader()
  );
}
