import axiosInstance from '../axios/axiosInterceptor';

export function createComment(params, photo_id) {
  return axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'photos/' + photo_id + '/comments',
    params
  );
}
export function showComment(photo_id, id) {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL +
      'photos/' +
      photo_id +
      '/comments/' +
      id
  );
}
