import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
import { isLoggedIn } from '../Helper';

// import layout files
const BeforeLoginLayout = asyncComponent(() =>
  import('../layout/BeforeLoginLayout')
);
const LoginLayout = asyncComponent(() => import('../layout/admin/LoginLayout'));
const AfterLoginLayout = asyncComponent(() =>
  import('../layout/admin/AfterLoginLayout')
);

// Import before login component
const Home = asyncComponent(() => import('../Home'));
const Portfolio = asyncComponent(() => import('../portfolio/Portfolio'));
const PortfolioAlbumDetails = asyncComponent(() =>
  import('../portfolio/AlbumDetails')
);
const Films = asyncComponent(() => import('../Films'));
const Feedback = asyncComponent(() => import('../Feedback'));
const GetInTouch = asyncComponent(() => import('../contact/GetInTouch'));
const AboutUs = asyncComponent(() => import('../contact/AboutUs'));
const Services = asyncComponent(() => import('../contact/Services'));
const NotFound = asyncComponent(() => import('../NotFound'));

// Import after login component
const AlbumListing = asyncComponent(() =>
  import('../admin/album/AlbumsListing.jsx')
);
const AlbumDetails = asyncComponent(() =>
  import('../admin/album/AlbumDetails')
);
const VideoGallery = asyncComponent(() =>
  import('../admin/video-films/VideosListing')
);
const Category = asyncComponent(() => import('../admin/category/categories'));
const Contact = asyncComponent(() => import('../admin/contact/Contacts'));
const SiteContent = asyncComponent(() =>
  import('../admin/site-content/SiteContent.jsx')
);

const Login = asyncComponent(() => import('../admin/Login'));

const routes = () =>
  <Switch>
    {/* Before Login routes start */}
    <BeforeLoginLayout exact path="/" component={Home} />
    <BeforeLoginLayout exact path="/portfolio" component={Portfolio} />
    <BeforeLoginLayout
      exact
      path="/portfolio/:slug"
      component={PortfolioAlbumDetails}
    />
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
    <AfterLoginLayout>
      <PrivateRoute exact path="/albums" component={AlbumListing} />
      <PrivateRoute exact path="/albums/:slug" component={AlbumDetails} />
      <PrivateRoute exact path="/video_films" component={VideoGallery} />
      <PrivateRoute exact path="/category" component={Category} />
      <PrivateRoute exact path="/contacts" component={Contact} />
      <PrivateRoute exact path="/site_contents" component={SiteContent} />
    </AfterLoginLayout>
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
