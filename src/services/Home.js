import axios from 'axios';

export function getHomepagePhotos() {
  return axios.get(
    process.env.REACT_APP_API_BASE_URL + 'homepage_photos/active'
  );
}
