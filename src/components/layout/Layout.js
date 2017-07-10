import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
  render() {
    return (
      <div>
        <div className="page-wrap">
          <Header />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
