import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus, apiCustomHeader } from '../components/Helper';

export function getVideoFilms(params) {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function createVideoFilm(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'videos',
    params,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function updateVideoFilm(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + params['id'],
    params['videoForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function deleteVideoFilm(id) {
  const responsePromise = axiosInstance.delete(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + id,
    apiHeader()
  );
  return checkStatus(responsePromise);
}

export function getPublishVideos(params) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + '/' + params.user +'/films',
    { params: params }
  );
}

export function getUpdatePosition(params) {
  return axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'videos/update_position',
    params,
    apiHeader()
  );
}
