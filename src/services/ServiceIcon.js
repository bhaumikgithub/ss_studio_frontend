import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader } from '../components/Helper';

export function getServiceIcons() {
  const responsePromise = axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'service_icons',
    apiHeader()
  );
  return responsePromise;
}
