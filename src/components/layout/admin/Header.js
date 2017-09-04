import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import Helmet from 'react-helmet';

// Import helper
import { authToken } from '../../Helper';

// Import services
import { LogoutService } from '../../../services/admin/Auth';

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
    LogoutService({ token: authToken() }).then(function(response) {
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
        <Helmet title={'Sagar Gadani :: ' + this.props.title} />
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
          <Nav pullRight className="menu-links">
            {this.props.isAlbumDetail && (
              <li className="back-to-album">
                <Link to="/albums">
                  <img
                    src={require('../../../assets/images/back-icon.png')}
                    alt=""
                  />Back To Albums
                </Link>
              </li>
            )}
            <NavDropdown
              eventKey={5}
              title={
                <span className="setting-dropdown-wrap">
                  <img
                    src={require('../../../assets/images/admin/album/settings-icon.png')}
                    className="link-icons"
                    alt=""
                  />{' '}
                  <span className="visible-xs setting-label">
                    Settings
                  </span>{' '}
                </span>
              }
              id="basic-nav-dropdown"
              className="admin-setting contact-header-links"
            >
              <MenuItem eventKey={5.1}>Change Password</MenuItem>
              {/* <MenuItem eventKey={5.4}>Pricing</MenuItem> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
