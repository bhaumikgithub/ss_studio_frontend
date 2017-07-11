import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';

// Import component
import Home from '../Home';
import GetInTouch from '../contact/GetInTouch';

const routes = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/get_in_touch" component={GetInTouch} />
    <Route component={NotFound} />
  </Switch>;

export default routes;
