import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class SignupFooter extends Component {
  render() {
    return (
      <div className="login-footer signup-footer">
        <Grid>
          <Row>
            <Col xs={12} sm={6} className="copyright">
              © Copyright 2017 - SS Studio , All rights reserved
            </Col>
            <Col xs={12} sm={6} className="design-by">
              Designed By Techplus Software Pvt. Ltd.
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
