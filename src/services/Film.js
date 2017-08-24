import axios from 'axios';

export function getPublishVideos() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'videos/publish');
}
