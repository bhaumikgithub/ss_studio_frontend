import axios from 'axios';
import { apiHeader } from '../../components/Helper';

export function getVideoFilms() {
  return axios.get(process.env.REACT_APP_API_BASE_URL + 'videos', apiHeader());
}

export function deleteVideoFilm(id) {
  return axios.delete(
    process.env.REACT_APP_API_BASE_URL + 'videos/' + id,
    apiHeader()
  );
}
