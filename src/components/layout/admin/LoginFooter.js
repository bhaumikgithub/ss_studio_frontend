import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class LoginFooter extends Component {
  render() {
    return (
      <div className="login-footer">
        <Grid>
          <Row>
            <Col xs={12} sm={6} className="copyright">
              © Copyright 2018 - AfterClix , All rights reserved
            </Col>
            <Col xs={12} sm={6} className="design-by">
              {/* Designed By Techplus Software Pvt. Ltd. */}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
