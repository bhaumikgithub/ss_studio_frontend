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
import { Redirect } from 'react-router-dom';
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
      changePasswordForm: {
        password_confirmation: '',
        password: '',
        reset_password_token: ""
      },
      change_password_error: "",
      redirectToReferrer: false
    };

    return initialState;
  }

  componentWillMount(){
    const { search } = this.props.location;
    const params = new URLSearchParams(search);
    const token = params.get('reset_password_token');
    const newChangePasswordForm = this.state.changePasswordForm
    newChangePasswordForm.reset_password_token = token
    this.setState({newChangePasswordForm})
  }

  handleChange(e) {
    const changePasswordForm = this.state.changePasswordForm;
    var key = e.target.name;
    changePasswordForm[key] = e.target.value;
    this.setState({
      changePasswordForm
    });
  }

  handleSubmit(event){
    var self = this;
    event.preventDefault();
    UserService.userChangePassword({user: self.state.changePasswordForm})
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        const errors = error.response.data.errors;
        console.log(errors)
        if (errors.length > 0) {
          self.setState({ change_password_error: validationHandler(errors) });
        } else {
          console.log(error.response);
        }
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      this.props.history.push({pathname: 'admin'})
    }
  }

  render() {
    const { change_password_error,role } = this.state;
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
          <Row>
            <Col xs={10} sm={6} className="login-form">
              <img
                src={require('../assets/images/afterclix.png')}
                alt=""
                className="img-responsive login-logo"
              />
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
                <h4 className="share-album-align">Change Password</h4>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control login-textbox"
                      type="password"
                      placeholder="New Password"
                      name="password"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon login-addon">*</span>
                    <span className="input-error text-red">{change_password_error.password}</span>
                  </FormGroup>
                  <FormGroup className="custom-fromgrp">
                    <FormControl
                      className="login-control login-textbox"
                      type="password"
                      placeholder="Confirm Password"
                      name="password_confirmation"
                      onChange={this.handleChange.bind(this)}
                    />
                    <span className="custom-addon login-addon">*</span>
                    <span className="input-error text-red">{change_password_error.password_confirmation}</span>
                  </FormGroup>
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
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
