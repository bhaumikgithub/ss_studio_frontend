import axios from 'axios';

export function createComment(params, photo_id) {
  return axios.post(
    process.env.REACT_APP_API_BASE_URL + 'photos/' + photo_id + '/comments',
    params
  );
}
export function showComment(photo_id, id) {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL +
      'photos/' +
      photo_id +
      '/comments/' +
      id
  );
}
