import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class LoginFooter extends Component {
  render() {
    return (
      <div className="login-footer">
        <Grid>
          <Row>
            <Col xs={12} sm={6} className="copyright">
              © Copyright 2017 - Sagar Gadani , All rights reserved
            </Col>
            <Col xs={12} sm={6} className="design-by">
              Developed By{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.afterclix.com/"
                className="developed-by-text"
              >
                AfterClix
              </a>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
