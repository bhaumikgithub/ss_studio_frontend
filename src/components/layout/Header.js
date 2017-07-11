import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    return (
      <Navbar
        inverse
        fixedTop
        collapseOnSelect
        className="header custom-navbar"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={require('../../assets/images/logo.png')}
                alt=""
                className="img-responsive"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight className="menu-links">
            <LinkContainer to="/">
              <NavItem eventKey={1} href="#" className="active">
                Home
              </NavItem>
            </LinkContainer>
            <NavItem eventKey={2} href="#">
              Portfolio
            </NavItem>
            <NavItem eventKey={3} href="#">
              Films
            </NavItem>
            <NavItem eventKey={4} href="#">
              Feedback
            </NavItem>
            <NavDropdown
              eventKey={3}
              title="Contact"
              id="basic-nav-dropdown"
              className="navbar-dropdown"
            >
              <LinkContainer to="/get_in_touch">
                <MenuItem eventKey={5.1}>Get in Touch</MenuItem>
              </LinkContainer>
              <MenuItem eventKey={5.2}>About us</MenuItem>
              <MenuItem eventKey={5.3}>Services</MenuItem>
              <MenuItem eventKey={5.4}>Pricing</MenuItem>
            </NavDropdown>
            <NavItem eventKey={4} href="#">
              <img
                src={require('../../assets/images/lock-icon.png')}
                alt=""
                className="img-responsive"
              />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
