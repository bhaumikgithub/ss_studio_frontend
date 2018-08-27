import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class AppFooter extends Component {
  render() {
    return (
      <div className="footer">
        <Grid>
          <Row>
            <Col xs={6} className="copyright">
              © Copyright 2017 - AfterClix , All rights reserved
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
