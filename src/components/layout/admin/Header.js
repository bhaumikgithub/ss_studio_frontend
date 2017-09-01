import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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
        <Navbar.Header>
          <Button className="side-toggle-btn" onClick={this.props.handler}>
            <i className="fa fa-bars" />
          </Button>
          <label className="admin-page-title">Albums</label>
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
            {/* <div className="search-wrap">
              <InputGroup>
                <FormControl
                  type="text"
                  onFocus={() => this.setState({ open: true })}
                  placeholder="Type Album Name"
                  className="form-control search-box"
                />
                <InputGroup.Addon className="search-btn-wrap">
                  <Button className="search-btn">
                    <Glyphicon glyph="search" />
                  </Button>
                </InputGroup.Addon>
              </InputGroup>
              <Collapse in={this.state.open} className="search-options">
                <Col xs={12} className="search-Form">
                  <Well>
                    <Button onClick={() => this.setState({ open: false })}>
                      Close
                    </Button>
                  </Well>
                </Col>
              </Collapse>
            </div> */}
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
