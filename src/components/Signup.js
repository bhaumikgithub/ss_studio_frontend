import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';
import Select from 'react-select';
import { Redirect, Link } from 'react-router-dom';

// Import helper
import { toCapitalize, isLoggedIn } from './Helper';
import validationHandler from './common/ValidationHandler';

// Import css
import '../assets/css/admin/login.css';
import 'react-select/dist/react-select.min.css';
import '../assets/css/admin/album/create-album/create-album.css';

// Import services
import { UserService } from '../services/Index';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      signupForm: {
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        password_confirmation: '',
        alias: '',
        phone: {},
        country_id: '',
        country_option: ''
      },
      countries: [],
      signup_error: '',
      redirectToReferrer: false
    };

    return initialState;
  }

  componentWillMount() {
    var self = this;

    UserService.getCountries()
      .then(function(response) {
        var data = response.data;
        self.setState({ countries: data.data.countries });
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  countryOptions(countries = this.state.countries) {
    var options = [];
    countries.map(country => {
      return options.push({
        value: country.id,
        label: toCapitalize(country.name)
      });
    });
    return options;
  }

  handleChange(e) {
    const signupForm = this.state.signupForm;
    var key = e.target.name;
    signupForm[key] = e.target.value;
    this.setState({
      signupForm
    });
  }

  handleSelectChange(value) {
    const signupForm = this.state.signupForm;
    signupForm['country_option'] = value;
    signupForm['country_id'] = value.value;
    this.setState({
      signupForm
    });
  }

  handleSignup(event) {
    var self = this;
    event.preventDefault();
    UserService.createUser({user: self.state.signupForm})
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        const errors = error.response.data.errors;
        console.log(errors)
        if (errors.length > 0) {
          self.setState({ signup_error: validationHandler(errors) });
        } else {
          console.log(error.response);
        }
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      console.log('success');
      this.props.history.push({pathname: 'admin', state: 'You have to confirm your email address before continue.' })
    }
  }

  render() {
    const { signup_error } = this.state;
    if (isLoggedIn()) {
      return <Redirect push to="/albums" />;
    }
    return (
      <div className="login-wrap signup-wrap">
        <Grid className="page-inner-wrap">
            <Row>
            <Col xs={10} sm={6} className="login-form">
              <form
                className="admin-login-side signup-form"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    this.handleSignup(e);
                  }
                }}
                onSubmit={event => {
                  this.handleSignup(event);
                }}
              >
                <Col xs={12} sm={10} md={8} className="login-details-block">
                <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="First Name"
                      label="First name"
                      name="first_name"
                      onChange={this.handleChange.bind(this)}
                    />
                    
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="Last Name"
                      label="Last name"
                      name="last_name"
                      onChange={this.handleChange.bind(this)}
                    />
                  </FormGroup>
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
                    {signup_error['email'] && (
                      <span className="input-error text-red">
                        {signup_error['email']}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="password"
                      placeholder="Password"
                      label="password"
                      name="password"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                    {signup_error['password'] && (
                      <span className="input-error text-red">
                        {signup_error['password']}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="password"
                      placeholder="Password Confirmation"
                      label="Password Confirmation"
                      name="password_confirmation"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                    {signup_error['password_confirmation'] && (
                      <span className="input-error text-red">
                        {signup_error['password_confirmation']}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="number"
                      placeholder="Phone"
                      label="Phone"
                      name="phone"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                    {signup_error['phone'] && (
                      <span className="input-error text-red">
                        {signup_error['phone']}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control"
                      type="text"
                      placeholder="Alias"
                      label="Alias"
                      name="alias"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                    {signup_error['alias'] && (
                      <span className="input-error text-red">
                        {signup_error['alias']}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="custom-fromgrp" controlId="formControlsSelect">
                    <Select
                    className="custom-form-control country_select"
                    name="country_option"
                    value={this.state.signupForm.country_option}
                    options={this.countryOptions()}
                    placeholder="Country"
                    onChange={this.handleSelectChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                    {signup_error['country_id'] && (
                      <span className="input-error text-red">
                        {signup_error['country_id']}
                      </span>
                    )}
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                        className="login-control"
                        type="number"
                        label="captcha"
                        placeholder="What is answer of 4x7?"
                        name="captcha"
                        onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon">*</span>
                    {signup_error['captcha'] && (
                      <span className="input-error text-red">
                        {signup_error['captcha']}
                      </span>
                    )}
                  </FormGroup>
                </Col>
                <Button className="btn-orange text-center">
                  <Link
                    to={
                      'admin'
                    }
                    className="admin-login-btn"
                  >
                    Login
                  </Link>
                </Button>
                <Button
                  type="submit"
                  className="btn-orange login-btn text-center"
                >
                  SIGNUP<img
                    src={require('../assets/images/admin/login/next-icon.png')}
                    alt="Logo"
                    className="img-responsive arrow-icon"
                  />
                </Button>
              </form>
            </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}
