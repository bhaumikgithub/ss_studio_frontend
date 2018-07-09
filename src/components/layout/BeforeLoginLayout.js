import React from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const BeforeLoginLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div className="app-wrap">
          <Header {...matchProps} />
          <Component {...matchProps} />
          <Footer {...matchProps} />
        </div>
      )}
    />
  );
};
export default BeforeLoginLayout;
