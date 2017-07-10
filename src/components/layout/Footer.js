import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="custom-footer">
        <div className="container custom-container">
          <div className="col-sm-6 content">
            © Copyright 2017 - Sagar Gadani , All rights reserved
          </div>
          <div className="col-sm-6 content">
            <div className="text-right">
              Designed By{' '}
              <a href="http://techplussoftware.com/">
                Techplus Software Pvt. Ltd.
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
