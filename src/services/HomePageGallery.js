import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function createHomepagePhotos(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getHomepagePhotos() {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos',
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateHomepagePhoto(params, id) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/' + id,
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getActiveHomepagePhotos(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/active',
    {params}
  );
}

export function deleteHomepagePhoto(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}