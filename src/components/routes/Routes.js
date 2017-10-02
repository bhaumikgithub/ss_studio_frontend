import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  PrivateRoute,
  BeforeLoginLayout,
  LoginLayout,
  Home,
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
  Login,
  PasscodeLogin,
  SelectedPhotoListing
} from './Index';

const routes = () => (
  <Switch>
    {/* Before Login routes start */}
    <BeforeLoginLayout exact path="/" component={Home} />
    <BeforeLoginLayout exact path="(/*)/portfolio" component={Portfolio} />
    <BeforeLoginLayout
      exact
      path="(/*)/portfolio(/*)/:slug"
      component={PortfolioAlbumDetails}
    />
    <BeforeLoginLayout
      exact
      path="(/*)/shared_album(/*)/:slug"
      component={ShareAlbumDetails}
    />
    <BeforeLoginLayout exact path="(/*)/films" component={Films} />
    <BeforeLoginLayout exact path="(/*)/feedback" component={Feedback} />
    <BeforeLoginLayout exact path="(/*)/contact" component={GetInTouch} />
    <BeforeLoginLayout exact path="(/*)/about_us" component={AboutUs} />
    <BeforeLoginLayout exact path="(/*)/services" component={Services} />
    {/* Before Login routes end */}

    {/* Auth routes start */}
    <LoginLayout exact path="(/*)/admin" component={Login} />
    <LoginLayout
      exact
      path="(/*)/shared_album_login(/*)/:slug"
      component={PasscodeLogin}
    />
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
      path="(/*)/albums(/*)/:slug/(/*)selected_photos"
      title="Selected Photos"
      component={SelectedPhotoListing}
    />
    <PrivateRoute
      exact
      path="(/*)/albums(/*)/:slug/(/*)comments"
      title="comments"
      component={SelectedPhotoListing}
    />
    {/* After Login routes end */}

    <Route component={NotFound} />
  </Switch>
);

export default routes;
