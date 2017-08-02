import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
import { isLoggedIn } from '../Helper';

// import layout files
import BeforeLoginLayout from '../layout/BeforeLoginLayout';
import LoginLayout from '../layout/admin/LoginLayout';

// Import before login component
const Home = asyncComponent(() => import('../Home'));
const Portfolio = asyncComponent(() => import('../Portfolio'));
const Films = asyncComponent(() => import('../Films'));
const Feedback = asyncComponent(() => import('../Feedback'));
const GetInTouch = asyncComponent(() => import('../contact/GetInTouch'));
const AboutUs = asyncComponent(() => import('../contact/AboutUs'));
const Services = asyncComponent(() => import('../contact/Services'));
const NotFound = asyncComponent(() => import('../NotFound'));

// Import after login component
const AlbumListing = asyncComponent(() =>
  import('../admin/album/AlbumsListing')
);

const Login = asyncComponent(() => import('../admin/Login'));

const routes = () =>
  <Switch>
    {/* Before Login routes start */}
    <BeforeLoginLayout exact path="/" component={Home} />
    <BeforeLoginLayout exact path="/portfolio" component={Portfolio} />
    <BeforeLoginLayout exact path="/films" component={Films} />
    <BeforeLoginLayout exact path="/feedback" component={Feedback} />
    <BeforeLoginLayout
      exact
      path="/contact/get_in_touch"
      component={GetInTouch}
    />
    <BeforeLoginLayout exact path="/contact/about_us" component={AboutUs} />
    <BeforeLoginLayout exact path="/contact/services" component={Services} />
    {/* Before Login routes end */}

    <LoginLayout exact path="/admin" component={Login} />

    {/* After Login routes start */}
    <PrivateRoute exact path="/albums" component={AlbumListing} />
    {/* After Login routes end */}

    <Route component={NotFound} />
  </Switch>;

export default routes;

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      isLoggedIn()
        ? <Component {...props} />
        : <Redirect
            to={{
              pathname: '/admin',
              state: { from: props.location }
            }}
          />}
  />;
