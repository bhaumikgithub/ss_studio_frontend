import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';
// Import helper
import { isLoggedIn, currentUserRole } from './Helper';
import { Redirect, Link } from 'react-router-dom';
import validationHandler from './common/ValidationHandler';


// Import css
import '../assets/css/admin/login.css';

// Import services
import { UserService } from '../services/Index';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      forgotPasswordForm: {
        email: '',
      },
      forgot_password_error: "",
      redirectToReferrer: false
    };

    return initialState;
  }

  handleChange(e) {
    const forgotPasswordForm = this.state.forgotPasswordForm;
    var key = e.target.name;
    forgotPasswordForm[key] = e.target.value;
    this.setState({
      forgotPasswordForm
    });
  }

  handleSubmit(event){
    var self = this;
    event.preventDefault();
    UserService.userForgotPassword({user: self.state.forgotPasswordForm})
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        const errors = error.response.data.errors;
        console.log(errors)
        if (errors.length > 0) {
          self.setState({ forgot_password_error: validationHandler(errors) });
        } else {
          console.log(error.response);
        }
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      this.props.history.push({pathname: 'admin', state: 'You will receive an email with instructions on how to reset your password in a few minutes.' })
    }
  }

  render() {
    const { forgot_password_error,role } = this.state;
    if (isLoggedIn() || this.state.redirectToReferrer) {
      if(role === "super_admin" || currentUserRole() === "super_admin"){
        return <Redirect push to="/users" />;
      }
      else{
        return <Redirect push to="/dashboard" />;
      }
    }

    return (
      <div className="login-wrap">
        <Grid className="page-inner-wrap">
          <img
            src={require('../assets/images/afterclix.png')}
            alt=""
            className="img-responsive afterclix-logo"
          />
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <form
                className="admin-login-side"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.handleSubmit(e);
                  }
                }}
                onSubmit={event => {
                  this.handleSubmit(event);
                }}
              >
                <Col xs={12} sm={10} md={8} className="login-details-block">
                <h4 className="share-album-align">Forgot Password</h4>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="email"
                      placeholder="Email"
                      label="email"
                      name="email"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                  </FormGroup>
                  {(forgot_password_error !== undefined && forgot_password_error && forgot_password_error.from === undefined) && (
                    <span className="input-error text-red">{forgot_password_error.email}</span>
                  )}
                </Col>
                <Button
                  type="submit"
                  className="btn-orange login-btn text-center"
                >
                  Submit<img
                    src={require('../assets/images/admin/login/next-icon.png')}
                    alt="Logo"
                    className="img-responsive arrow-icon"
                  />
                </Button>
                <div className="login-link">
                  <Link
                    to={
                      'admin'
                    }
                    className="admin-login-btn"
                  >
                    Sign In
                  </Link>
                </div>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
