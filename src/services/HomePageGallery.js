import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader } from '../components/Helper';

export function getHomepagePhotos() {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos',
    apiHeader()
  );
  return responsePromise;
}

export function updateHomepagePhoto(params, id) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/' + id,
    params,
    apiHeader()
  );
  return responsePromise;
}

export function getActiveHomepagePhotos() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/active'
  );
}
