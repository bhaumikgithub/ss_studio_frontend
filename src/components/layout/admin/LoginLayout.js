import React from 'react';
import { Route } from 'react-router-dom';
import LoginFooter from './LoginFooter';

const LoginLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        <div className="app-wrap">
          <Component {...matchProps} />
          <LoginFooter />
        </div>}
    />
  );
};
export default LoginLayout;
