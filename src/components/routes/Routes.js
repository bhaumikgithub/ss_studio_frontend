import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';

// Import component
import Home from '../Home';
import Portfolio from '../Portfolio';
import Films from '../Films';
import Feedback from '../Feedback';
import GetInTouch from '../contact/GetInTouch';
import Services from '../contact/Services';
import AboutUs from '../contact/AboutUs';

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
