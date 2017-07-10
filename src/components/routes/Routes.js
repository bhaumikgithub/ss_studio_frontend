import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound';

// Import component
import Home from '../Home';

const routes = () =>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>;

export default routes;
