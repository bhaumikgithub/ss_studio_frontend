import React, { Component } from 'react';
import {
  Navbar,
  Button
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
// Import helper
import { authToken } from '../../Helper';

// Import services
import { AuthService } from '../../../services/Index';

// Import css
import '../../../assets/css/admin/header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirectToReferrer: false
    };
  }

  handleLogout(event) {
    var self = this;
    AuthService.LogoutService({ token: authToken() }).then(function(response) {
      self.handleResponse(response);
    });
  }

  handleResponse(response) {
    if (response.status === 200) {
      localStorage.clear();
      this.setState({ redirectToReferrer: true });
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect push to="/admin" />;
    }

    return (
      <Navbar inverse fixedTop className="header">
        <Helmet title={'AfterClix :: ' + this.props.title} />
        <Navbar.Header>
          <Button className="side-toggle-btn" onClick={this.props.handler}>
            <i className="fa fa-bars" />
          </Button>
          <label className="admin-page-title text-capitalize">
            {this.props.title}
          </label>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Button
            className="logout-btn btn btn-orange"
            onClick={event => this.handleLogout(event)}
          >
            <i className="fa fa-logout" /> Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
