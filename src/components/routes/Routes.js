import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  PrivateRoute,
  SuperAdminRoute,
  BeforeLoginLayout,
  LoginLayout,
  SignupLayout,
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
} from './Index';

const routes = () => (
  <Switch>
    {/* Auth routes start */}
    <LoginLayout exact path="(/*)/admin" component={Login} />
    <LoginLayout
      exact
      path="(/*)/:user/shared_album_login(/*)/:slug"
      component={PasscodeLogin}
    />
    <SignupLayout exact path="(/*)/signup" component={Signup} />
    {/* Auth routes end */}

    {/* After Login routes start */}
    <PrivateRoute
      exact
      path="(/*)/albums"
      title="Albums"
      component={AlbumListing}
    />
    <PrivateRoute
      exact
      path="(/*)/albums(/*)/:slug"
      title="Album detail"
      component={AlbumDetails}
    />
    <PrivateRoute
      exact
      path="(/*)/video_films"
      title="Video Films"
      component={VideoGallery}
    />
    <PrivateRoute
      exact
      path="(/*)/categories"
      title="Categories"
      component={Category}
    />
    <PrivateRoute exact path="/contacts" title="Contacts" component={Contact} />
    <PrivateRoute
      exact
      path="(/*)/site_contents"
      title="Site Contents"
      component={SiteContent}
    />
    <PrivateRoute
      exact
      path="(/*)/homepage_gallery"
      title="Home Page Gallery"
      component={HomePageGalley}
    />
    <PrivateRoute
      exact
      path="(/*)/testimonials"
      title="Testimonials"
      component={Testimonial}
    />
    <PrivateRoute
      exact
      path="(/*)/settings"
      title="Settings"
      component={Setting}
    />
    {/* After Login routes end */}

    {/* After Super Admin Login routes start */}
    <SuperAdminRoute
      exact
      path="/users"
      title="Users"
      component={UserListing}
    />

    {/* After Super Admin Login routes start */}

    {/* Before Login routes start */}

    <BeforeLoginLayout exact path="/:user" component={Home} />
    <BeforeLoginLayout exact path="/photographer" component={Landing} />
    <BeforeLoginLayout exact path="(/*)/:user/portfolio" component={Portfolio} />
    <BeforeLoginLayout
      exact
      path="(/*)/:user/portfolio(/*)/:slug"
      component={PortfolioAlbumDetails}
    />
    <BeforeLoginLayout
      exact
      path="(/*)/:user/shared_album(/*)/:slug"
      component={ShareAlbumDetails}
    />
    <BeforeLoginLayout exact path="(/*)/:user/films" component={Films} />
    <BeforeLoginLayout exact path="(/*)/:user/feedback" component={Feedback} />
    <BeforeLoginLayout exact path="(/*)/:user/contact" component={GetInTouch} />
    <BeforeLoginLayout exact path="(/*)/:user/about_us" component={AboutUs} />
    <BeforeLoginLayout exact path="(/*)/:user/services" component={Services} />
    {/* Before Login routes end */}

    <Route component={NotFound} />
  </Switch>
);

export default routes;
