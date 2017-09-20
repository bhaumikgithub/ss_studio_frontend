import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  MenuItem,
  Button,
  NavItem
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import { IndexLinkContainer } from 'react-router-bootstrap';
// Import component
import ChangePasswordPopup from '../../admin/ChangePasswordPopup';
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
      redirectToReferrer: false,
      showChangePasswordPopup: false
    };
  }

  handleLogout(event) {
    var self = this;
    LogoutService({ token: authToken() }).then(function(response) {
      self.handleResponse(response);
    });
  }

  hideChangePasswordPopup = () => {
    this.setState({ showChangePasswordPopup: false, editObject: {} });
  };

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
    debugger;

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
        {this.state.showChangePasswordPopup && (
          <ChangePasswordPopup
            showChangePasswordPopup={this.state.showChangePasswordPopup}
            hideChangePasswordPopup={this.hideChangePasswordPopup}
          />
        )}
        <Navbar.Collapse>
          <Button
            className="logout-btn btn btn-orange"
            onClick={event => this.handleLogout(event)}
          >
            <i className="fa fa-logout" /> Logout
          </Button>
          <Nav pullRight className="menu-links">
            {this.props.isAlbumDetail && (
              <IndexLinkContainer to="/albums">
                <NavItem className="back-to-album">
                  <img
                    src={require('../../../assets/images/back-icon.png')}
                    alt=""
                  />Back To Albums
                </NavItem>
              </IndexLinkContainer>
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
              {/* <MenuItem eventKey={5.1}>Change Password</MenuItem> */}
              <Button
                className="edit-album-detail"
                onClick={() =>
                  this.setState({
                    showChangePasswordPopup: true
                  })}
              >
                Change Password
              </Button>
              {/* <MenuItem eventKey={5.4}>Pricing</MenuItem> */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
