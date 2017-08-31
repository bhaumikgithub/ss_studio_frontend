import React from 'react';
import '../../assets/css/loader.css';

const Loading = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="custom-loader page-wrap">
        <img
          alt="page-loader"
          className="page-loader"
          src={require('../../assets/images/loader.gif')}
        />
      </div>
    );
  } else if (error) {
    return (
      <div className="custom-loader page-error-wrap page-wrap">
        <span className="loading-error">
          Sorry, there was a problem loading the page.
        </span>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
