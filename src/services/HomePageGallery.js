import axios from 'axios';
import { apiHeader, checkStatus } from '../components/Helper';

export function getHomepagePhotos() {
  const responsePromise = axios.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateHomepagePhoto(params, id) {
  const responsePromise = axios.patch(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/' + id,
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
