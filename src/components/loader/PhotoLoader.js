import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../../assets/css/loader.css';

export default function() {
  return (
    <ReactCSSTransitionGroup
      transitionName="page-animation"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
    >
      <img
        alt="page-loader"
        className="page-loader"
        src={require('../../assets/images/loader.gif')}
      />
    </ReactCSSTransitionGroup>
  );
}
