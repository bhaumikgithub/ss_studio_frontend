import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader, checkStatus } from '../components/Helper';

export function getHomePage(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/home_page',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getFilmPage(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/film_page',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getServicePage(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/service_page',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getTestimonialPage(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/testimonial_page',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getAboutUsPage(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/about_us_page',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getContactUsPage(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/contact_us_page',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function updatePageSetting(params) {
  var params_form;
  if (params['type'] === "home") {
    params_form = params['editHomePageForm']
  }
  if (params['type'] === "film") {
    params_form = params['ediFilmPageForm']
  }
  if (params['type'] === "service") {
    params_form = params['editServicePageForm']
  }
  if (params['type'] === "testimonial") {
    params_form = params['editTestimonialPageForm']
  }
  if (params['type'] === "about_us") {
    params_form = params['editAboutUsPageForm']
  }
  if (params['type'] === "contact_us") {
    params_form = params['editContactUsPageForm']
  }
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'page_settings/' + params['id'],
    params_form,
    apiHeader()
  );
  return checkStatus(responsePromise);
}