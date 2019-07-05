import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

// Import helper
import { isLoggedIn, currentUserRole } from '../Helper';

// Import css
import '../../assets/css/admin/login.css';

// Import services
import { AuthService } from '../../services/Index';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      loginForm: {
        email: '',
        password: '',
        grant_type: 'password'
      },
      login_error: this.props.location.state,
      role: '',
      redirectToReferrer: false
    };

    return initialState;
  }

  handleChange(e) {
    const loginForm = this.state.loginForm;
    var key = e.target.name;
    loginForm[key] = e.target.value;
    this.setState({
      loginForm
    });
  }

  handleLogin(event) {
    var self = this;
    event.preventDefault();
    AuthService.LoginService(self.state.loginForm)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        self.setState({ login_error: error.response.data.error });
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      localStorage.setItem('AUTH_TOKEN', response.data.data.token.access_token);
      localStorage.setItem(
        'CURRENT_USER',
        JSON.stringify(response.data.data.user)
      );
      localStorage.setItem(
        'ROLE',
        JSON.stringify(response.data.data.role)
      );
      this.setState({ redirectToReferrer: true, role: response.data.data.role });
    } else {
      console.log('Invalid email and password');
      alert('Invalid email and password');
    }
  }

  render() {
    const { login_error,role } = this.state;
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
        <header id="home">
          <div className="container position-relative h-100">
            <nav>
              <a href="#" className="navbar-brand">
              <img src={"https://afterclix.s3.ap-south-1.amazonaws.com/shared_photos/logo-white.svg"} alt="Logo" /></a>
              <div>
                <a href="http://www.afterclix.com" className="navbar-brand back-link"><span className="back-arrow">&#8592;</span> Back to Afterclix</a>
              </div>
            </nav>
          </div>
        </header>
        <Grid className="page-inner-wrap">
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <img
                src={require('../../assets/images/logo.svg')}
                alt=""
                className="img-responsive login-logo"
              />
              {/* <img
                src={require('../../assets/images/admin/login/login-logo.png')}
                alt="Logo"
                className="img-responsive login-logo"
              /> */}
              <form
                className="admin-login-side"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.handleLogin(e);
                  }
                }}
                onSubmit={event => {
                  this.handleLogin(event);
                }}
              >
                <Col xs={12} sm={10} md={8} className="login-details-block">
                <h4 className="share-album-align">Sign In</h4>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control login-textbox"
                      type="email"
                      placeholder="Email"
                      label="email"
                      name="email"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon login-addon">*</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control login-textbox"
                      type="password"
                      placeholder="Password"
                      label="password"
                      name="password"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon login-addon">*</span>
                  </FormGroup>
                <Link
                    to={
                      'forgot_password'
                    }
                    className=""
                  >
                    Forgot Password?
                  </Link>
                  {(login_error !== undefined && login_error && login_error.from === undefined) && (
                    <span className="input-error text-red"><br/><br/>{login_error}</span>
                  )}
                </Col>
                <Button
                  type="submit"
                  className="btn-orange login-btn text-center"
                >
                  LOGIN<img
                    src={require('../../assets/images/admin/login/next-icon.png')}
                    alt="Logo"
                    className="img-responsive arrow-icon"
                  />
                </Button>
                <div className="login-link">
                  <Link
                    to={
                      'signup'
                    }
                    className="admin-login-btn"
                  >
                    Signup
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
