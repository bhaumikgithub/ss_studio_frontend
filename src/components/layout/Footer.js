import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.match.params.user
    }
  }
  render() {
    return (
      <Col xs={12} className="custom-footer">
        <Grid className="custom-container">
          <Col sm={6} className="content">
            © Copyright 2017 - Sagar Gadani , All rights reserved
          </Col>

          <Col sm={6} className="content">
            <Col className="text-right">
              Designed By{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://techplussoftware.com/"
              >
                Techplus Software Pvt. Ltd.
              </a>
            </Col>
          </Col>
          <div className="fb_btn">
            <a
              href="https://www.facebook.com/sagarphotocam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require('../../assets/images/fb_btn.png')}
                alt=""
                className="facebook-img"
              />
            </a>
          </div>    
        </Grid>
      </Col>
    );
  }
}

export default Footer;
