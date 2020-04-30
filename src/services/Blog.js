import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, checkStatus } from '../components/Helper';

export function getBlog() {
  return axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'blog',
    apiHeader()
  );
}
export function createBlog(params) {
  const responsePromise = axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'blogs',
    params['editBlogForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}
export function updateBlog(params) {
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'blogs',
    params['editBlogForm'],
    apiHeader()
  );
  return checkStatus(responsePromise);
}