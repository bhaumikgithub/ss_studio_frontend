import asyncComponent from '../AsyncComponent';
import Loadable from 'react-loadable';
import Loading from '../loader/Loading';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../Helper';

// import layout files
const BeforeLoginLayout = asyncComponent(() =>
  import('../layout/BeforeLoginLayout')
);
const LoginLayout = asyncComponent(() => import('../layout/admin/LoginLayout'));
const SignupLayout = asyncComponent(() => import('../layout/admin/SignupLayout'));
const AfterLoginLayout = asyncComponent(() =>
  import('../layout/admin/AfterLoginLayout')
);
const AfterSuperAdminLoginLayout = asyncComponent(() =>
  import('../layout/super-admin/AfterSuperAdminLoginLayout')
);

// Import before login component
const Home = Loadable({
  loader: () => import('../Home'),
  loading: Loading
});
const Landing = Loadable({
  loader: () => import('../Landing'),
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
const ShareAlbumDetails = Loadable({
  loader: () => import('../shared-album/AlbumDetails'),
  loading: Loading
});
const PasscodeLogin = Loadable({
  loader: () => import('../shared-album/PasscodeLogin'),
  loading: Loading
});

// Import login component
const Login = Loadable({
  loader: () => import('../admin/Login'),
  loading: Loading
});
const Signup = Loadable({
  loader: () => import('../Signup'),
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
  loader: () => import('../admin/testimonial/Testimonials'),
  loading: Loading
});
const Setting = Loadable({
  loader: () => import('../admin/setting/Setting'),
  loading: Loading
});

// Import after super admin login component
const UserListing = Loadable({
  loader: () => import('../super-admin/user/UserListing.jsx'),
  loading: Loading
});

// Import not found component
const NotFound = Loadable({
  loader: () => import('../NotFound'),
  loading: Loading
});

// Is request route is private or not
const PrivateRoute = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <AfterLoginLayout title={title}>
          <Component {...props} />
        </AfterLoginLayout>
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

const SuperAdminRoute = ({ component: Component, title, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <AfterSuperAdminLoginLayout title={title}>
          <Component {...props} />
        </AfterSuperAdminLoginLayout>
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

export {
  PrivateRoute,
  SuperAdminRoute,
  BeforeLoginLayout,
  LoginLayout,
  SignupLayout,
  AfterLoginLayout,
  Home,
  Landing,
  Portfolio,
  PortfolioAlbumDetails,
  Films,
  Feedback,
  GetInTouch,
  AboutUs,
  Services,
  NotFound,
  ShareAlbumDetails,
  AlbumListing,
  AlbumDetails,
  VideoGallery,
  Category,
  Contact,
  SiteContent,
  HomePageGalley,
  Testimonial,
  Setting,
  Login,
  PasscodeLogin,
  Signup,
  UserListing
};
