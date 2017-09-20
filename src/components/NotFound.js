import React, { Component } from 'react';
import '../assets/css/loader.css';

class NotFound extends Component {
  render() {
    return (
      <div className="custom-loader page-error-wrap page-wrap">
        <span className="loading-error">404... This page is not found!</span>
      </div>
    );
  }
}

export default NotFound;
