import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';

// Import component
import Home from '../Home';
import GetInTouch from '../contact/GetInTouch';
import Services from '../contact/Services';

const routes = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/get_in_touch" component={GetInTouch} />
    <Route exact path="/services" component={Services} />
    <Route component={NotFound} />
  </Switch>;

export default routes;
