import React from 'react';
import { Route } from 'react-router-dom';
import SignupFooter from './SignupFooter';

const SignupLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps =>
        <div className="app-wrap">
          <Component {...matchProps} />
          {/* <SignupFooter /> */}
        </div>}
    />
  );
};
export default SignupLayout;
