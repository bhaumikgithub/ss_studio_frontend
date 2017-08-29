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
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
};

export default Loading;
