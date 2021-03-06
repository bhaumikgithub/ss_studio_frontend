import React, { Component } from 'react';
import { Row, Col, Grid } from 'react-bootstrap';

export default class AppFooter extends Component {
  render() {
    return (
      <div className="footer">
        <Grid>
          <Row>
            <Col xs={6} className="copyright">
              © Copyright {(new Date().getFullYear())} - AfterClix , All rights reserved
            </Col>
            <Col xs={6} className="design-by">
              {/* Designed By Techplus Software Pvt. Ltd. */}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
