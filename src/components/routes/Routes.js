import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncComponent from '../AsyncComponent';

// Import component
const Home = asyncComponent(() => import('../Home'));
const Portfolio = asyncComponent(() => import('../Portfolio'));
const Films = asyncComponent(() => import('../Films'));
const Feedback = asyncComponent(() => import('../Feedback'));
const GetInTouch = asyncComponent(() => import('../contact/GetInTouch'));
const AboutUs = asyncComponent(() => import('../contact/AboutUs'));
const Services = asyncComponent(() => import('../contact/Services'));
const NotFound = asyncComponent(() => import('../NotFound'));

const routes = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/portfolio" component={Portfolio} />
    <Route exact path="/films" component={Films} />
    <Route exact path="/feedback" component={Feedback} />
    <Route exact path="/contact/get_in_touch" component={GetInTouch} />
    <Route exact path="/contact/about_us" component={AboutUs} />
    <Route exact path="/contact/services" component={Services} />
    <Route component={NotFound} />
  </Switch>;

export default routes;
