import React, { Component } from 'react';
import {
  Button,
  FormControl,
  Grid,
  Col,
  Row,
  FormGroup
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// Import services
import { AlbumService } from '../../services/Index';

// Import css
import '../../assets/css/admin/login.css';

export default class PasscodeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const initialState = {
      passcodeLoginForm: {
        passcode: '',
        albumSlug: ''
      },
      token: '',
      errors: '',
      redirectToReferrer: false
    };
    return initialState;
  }
  componentWillMount() {
    const urlProps = this.props;
    const passcodeLoginForm = Object.assign({}, this.state.passcodeLoginForm);
    const params = new URLSearchParams(urlProps.location.search);

    passcodeLoginForm.albumSlug = urlProps.match.params.slug;
    if (params.get('token') !== this.state.token) {
      this.setState({
        token: params.get('token'),
        passcodeLoginForm: passcodeLoginForm
      });
    }
  }

  handleChange(e) {
    const passcodeLoginForm = this.state.passcodeLoginForm;
    var key = e.target.name;
    passcodeLoginForm[key] = e.target.value;
    this.setState({
      passcodeLoginForm
    });
  }

  handleLogin(event) {
    var self = this;
    AlbumService.albumPasscodeVerification(self.state.passcodeLoginForm)
      .then(function(response) {
        self.handelResponse(response);
      })
      .catch(function(error) {
        alert(error.response.data.errors);
        self.setState({ errors: error.response.data.errors });
      });
  }

  handelResponse(response) {
    if (response.status === 200) {
      this.setState({ redirectToReferrer: true });
    } else {
      console.log('Invalid passcode');
    }
  }

  render() {
    const { token, passcodeLoginForm } = this.state;
    if (this.state.redirectToReferrer) {
      return (
        <Redirect
          push
          to={{
            pathname: '/'+this.props.match.params.user+`/shared_album/${passcodeLoginForm.albumSlug}`,
            search: `?token=${token}`,
            state: true
          }}
        />
      );
    }
    return (
      <div className="login-wrap">
        <Grid className="page-inner-wrap">
          <Row>
            <Col xs={10} sm={6} className="login-form">
              {/* <img
                src={require('../../assets/images/admin/login/login-logo.png')}
                alt="Logo"
                className="img-responsive login-logo"
              /> */}
              <Col xs={12} sm={10} md={8} className="login-details-block">
                <FormGroup className="custom-fromgrp">
                  <FormControl
                    className="login-control"
                    type="password"
                    placeholder="Passcode"
                    label="passcode"
                    name="passcode"
                    onChange={this.handleChange.bind(this)}
                  />
                  <span className="custom-addon">*</span>
                </FormGroup>
              </Col>
              <Button
                className="btn-orange login-btn text-center"
                onClick={event => this.handleLogin(event)}
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
