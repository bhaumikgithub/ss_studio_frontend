import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
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
          <Navbar.Brand className="navbar-logo">
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
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/portfolio">
              <NavItem eventKey={2}>Portfolio</NavItem>
            </LinkContainer>
            <LinkContainer to="/films">
              <NavItem eventKey={3}>Films</NavItem>
            </LinkContainer>
            <LinkContainer to="/feedback">
              <NavItem eventKey={4}>Feedback</NavItem>
            </LinkContainer>
            <LinkContainer
              to="/contact"
              className="navbar-dropdown"
              onClick={event => event.preventDefault()}
            >
              <NavDropdown
                eventKey={3}
                href="/contact"
                title="Contact"
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/contact/get_in_touch">
                  <MenuItem eventKey={5.1}>Get in Touch</MenuItem>
                </LinkContainer>
                <LinkContainer to="/contact/about_us">
                  <MenuItem eventKey={5.2}>About us</MenuItem>
                </LinkContainer>
                <LinkContainer to="/contact/services">
                  <MenuItem eventKey={5.3}>Services</MenuItem>
                </LinkContainer>
                <MenuItem eventKey={5.4}>Pricing</MenuItem>
              </NavDropdown>
            </LinkContainer>
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
