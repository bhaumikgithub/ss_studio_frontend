import axiosInstance from '../axios/axiosInterceptor';
import { apiHeader, apiCustomHeader, checkStatus } from '../components/Helper';

export function getHomeWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/home_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getPortfolioWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/portfolio_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getFilmWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/film_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getServiceWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/service_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getTestimonialWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/testimonial_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getAboutUsWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/about_us_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function getContactUsWidget(params) {
  const responsePromise =  axiosInstance.get(
    process.env.REACT_APP_API_BASE_URL + 'widgets/contact_us_widget',
    { params: params, headers: apiCustomHeader() }
  );
  return checkStatus(responsePromise);
}

export function updateWidget(params) {
  var params_form;
  if (params['type'] === "home") {
    params_form = params['editHomeWidgetForm']
  }
  if (params['type'] === "portfolio") {
    params_form = params['editPortfolioWidgetForm']
  }
  if (params['type'] === "film") {
    params_form = params['ediFilmWidgetForm']
  }
  if (params['type'] === "service") {
    params_form = params['editServiceWidgetForm']
  }
  if (params['type'] === "testimonial") {
    params_form = params['editTestimonialWidgetForm']
  }
  if (params['type'] === "about_us") {
    params_form = params['editAboutUsWidgetForm']
  }
  if (params['type'] === "contact_us") {
    params_form = params['editContactUsWidgetForm']
  }
  const responsePromise = axiosInstance.patch(
    process.env.REACT_APP_API_BASE_URL + 'widgets/' + params['id'],
    params_form,
    apiHeader()
  );
  return checkStatus(responsePromise);
}
