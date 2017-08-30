import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';
import '../../assets/css/admin/login.css';

export default class PrivatePasscodeLogin extends Component {
  render() {
    return (
      <div className="login-wrap">
        <Grid className="page-inner-wrap">
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <img
                src={require('../../assets/images/admin/login/login-logo.png')}
                alt="Logo"
                className="img-responsive login-logo"
              />
              <Col xs={12} sm={10} md={8} className="login-details-block">
                <FormGroup className="custom-fromgrp">
                  <FormControl
                    className="login-control"
                    type="passcode"
                    placeholder="Passcode"
                    label="passcode"
                  />
                  <span className="custom-addon">*</span>
                </FormGroup>
              </Col>
              <Button
                type="submit"
                className="btn-orange login-btn text-center"
              >
                LOGIN
                <img
                  src={require('../../assets/images/admin/login/next-icon.png')}
                  alt="Logo"
                  className="img-responsive arrow-icon"
                />
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
