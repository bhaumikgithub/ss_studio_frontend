import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader } from '../components/Helper';

export function getVideoFilms(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    { params: params, headers: apiCustomHeader() }
  );
  return responsePromise;
}

export function createVideoFilm(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    params,
    apiHeader()
  );
  return responsePromise;
}

export function updateVideoFilm(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + params['id'],
    params['videoForm'],
    apiHeader()
  );
  return responsePromise;
}

export function deleteVideoFilm(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + id,
    apiHeader()
  );
  return responsePromise;
}

export function getPublishVideos() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'videos/publish'
  );
}
