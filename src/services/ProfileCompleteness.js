import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getProfileCompleteness() {
    const responsePromise = axiosInstance.get(
      process.env.REACT_APP_API_BASE_URL + 'profile_completenesses',
      apiHeader()
    );
    return checkStatus(responsePromise);
  }