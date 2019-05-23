import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class AppFooter extends Component {
  render() {
    return (
      <div className="footer">
        <Grid>
          <Row>
            <Col xs={6} className="copyright">
              © Copyright 2017 - Sagar Gadani , All rights reserved
            </Col>
            <Col xs={6} className="design-by">
              Developed By{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.afterclix.com/"
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
