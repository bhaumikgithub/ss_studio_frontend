import axiosInstance from '../axios/axiosInterceptor';

export function createContactMessage(params) {
  return axiosInstance.post(
    process.env.REACT_APP_API_BASE_URL + 'contact_messages',
    {
      contact_message: params
    }
  );
}
