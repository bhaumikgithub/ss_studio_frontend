import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../AsyncComponent';
import Loadable from 'react-loadable';
import { isLoggedIn } from '../Helper';
import Loading from '../loader/Loading';

// import layout files
const BeforeLoginLayout = asyncComponent(() =>
  import('../layout/BeforeLoginLayout')
);
const LoginLayout = asyncComponent(() => import('../layout/admin/LoginLayout'));
const AfterLoginLayout = asyncComponent(() =>
  import('../layout/admin/AfterLoginLayout')
);

// Import before login component
const Home = Loadable({
  loader: () => import('../Home'),
  loading: Loading
});
const Portfolio = Loadable({
  loader: () => import('../portfolio/Portfolio'),
  loading: Loading
});
const PortfolioAlbumDetails = Loadable({
  loader: () => import('../portfolio/AlbumDetails'),
  loading: Loading
});
const Films = Loadable({
  loader: () => import('../Films'),
  loading: Loading
});
const Feedback = Loadable({
  loader: () => import('../Feedback'),
  loading: Loading
});
const GetInTouch = Loadable({
  loader: () => import('../contact/GetInTouch'),
  loading: Loading
});
const AboutUs = Loadable({
  loader: () => import('../contact/AboutUs'),
  loading: Loading
});
const Services = Loadable({
  loader: () => import('../contact/Services'),
  loading: Loading
});
const NotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: Loading
});
const ShareAlbumDetails = Loadable({
  loader: () => import('../share-album/AlbumDetails'),
  loading: Loading
});

// Import after login component
const AlbumListing = Loadable({
  loader: () => import('../admin/album/AlbumsListing.jsx'),
  loading: Loading
});
const AlbumDetails = Loadable({
  loader: () => import('../admin/album/AlbumDetails'),
  loading: Loading
});
const VideoGallery = Loadable({
  loader: () => import('../admin/video-films/VideosListing'),
  loading: Loading
});
const Category = Loadable({
  loader: () => import('../admin/category/categories'),
  loading: Loading
});
const Contact = Loadable({
  loader: () => import('../admin/contact/Contacts'),
  loading: Loading
});
const SiteContent = Loadable({
  loader: () => import('../admin/site-content/SiteContent.jsx'),
  loading: Loading
});
const HomePageGalley = Loadable({
  loader: () => import('../admin/homepage-gallery/HomePageGallery'),
  loading: Loading
});
const Testimonial = Loadable({
  loader: () => import('../admin/testimonial/Testimonial'),
  loading: Loading
});
const Login = Loadable({
  loader: () => import('../admin/Login'),
  loading: Loading
});

const PasscodeLogin = Loadable({
  loader: () => import('../share-album/PasscodeLogin'),
  loading: Loading
});

const routes = () => (
  <Switch>
    {/* Before Login routes start */}
    <BeforeLoginLayout exact path="/" component={Home} />
    <BeforeLoginLayout exact path="/portfolio" component={Portfolio} />
    <BeforeLoginLayout
      exact
      path="/portfolio/:slug"
      component={PortfolioAlbumDetails}
    />
    <BeforeLoginLayout
      exact
      path="/shared_album/:slug"
      component={ShareAlbumDetails}
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
    <LoginLayout exact path="/shared_album_login" component={PasscodeLogin} />

    {/* After Login routes start */}
    <AfterLoginLayout>
      <PrivateRoute exact path="/albums" component={AlbumListing} />
      <PrivateRoute exact path="/albums/:slug" component={AlbumDetails} />
      <PrivateRoute exact path="/video_films" component={VideoGallery} />
      <PrivateRoute exact path="/category" component={Category} />
      <PrivateRoute exact path="/contacts" component={Contact} />
      <PrivateRoute exact path="/site_contents" component={SiteContent} />
      <PrivateRoute exact path="/homepage_gallery" component={HomePageGalley} />
      <PrivateRoute exact path="/testimonials" component={Testimonial} />
    </AfterLoginLayout>
    {/* After Login routes end */}

    <Route component={NotFound} />
  </Switch>
);

export default routes;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/admin',
            state: { from: props.location }
          }}
        />
      )}
  />
);
